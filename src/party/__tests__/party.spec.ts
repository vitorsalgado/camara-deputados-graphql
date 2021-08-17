/* eslint-disable @typescript-eslint/no-explicit-any */

import Supertest from 'supertest'
import Nock from 'nock'
import TestConstants from '../../utils/testing/TestConstants'
import { nockIsDone } from '../../utils/testing/nockIsDone'
import { provideConfig } from '../../config/provideConfig'
import { allOf } from '../../utils/allOf'
import { contains } from '../../utils/testing/contains'
import { modifyConfigForTest } from '../../utils/testing/modifyConfigForTest'
import { GraphQLServer } from '../../GraphQLServer'
import { stubPath } from '../../utils/testing/stubPath'
import { stub } from '../../utils/testing/stub'
import { queryPartyById } from './__fixtures__'
import { queryPartyWithLeader } from './__fixtures__'
import { PartyFixtures } from './__fixtures__'
import { queryPartyByAcronym } from './__fixtures__'
import { querySearchParties } from './__fixtures__'

const StubParty = stubPath(__dirname, PartyFixtures.Party)
const StubWithOneParty = stubPath(__dirname, PartyFixtures.OneParty)
const StubDeputies = stubPath(__dirname, PartyFixtures.Deputies)

describe('Party', function () {
  const application = new GraphQLServer(modifyConfigForTest(provideConfig()))

  beforeAll(() => application.buildAndStart())
  beforeEach(() => Nock.cleanAll())
  afterAll(async () => {
    await application.close()
    expect(Nock.pendingMocks()).toHaveLength(0)
    Nock.cleanAll()
  })
  afterEach(() => nockIsDone(Nock))

  describe('Query', function () {
    it('should return party by id', function () {
      const id = '36844'
      const query = queryPartyById(id)

      Nock(TestConstants.deputiesApiURL).get(`/partidos/${id}`).reply(200, stub(StubParty))

      return Supertest(application.server())
        .post('/graphql')
        .send({ query })
        .expect(({ body }) => {
          expect(body.errors).toBeUndefined()
          expect(body.data.party.id).toEqual(id)
          expect(body.data.party.name).toEqual('Partido dos Trabalhadores')
        })
        .expect(200)
    })

    it('should return the leader when it is requested on query', function () {
      const id = '36844'
      const leader = '73433'
      const query = queryPartyWithLeader(id)

      Nock(TestConstants.deputiesApiURL)
        .get(`/partidos/${id}`)
        .reply(200, stub(StubParty))
        .get('/deputados')
        .query(contains('id', leader))
        .reply(200, stub(StubDeputies))

      return Supertest(application.server())
        .post('/graphql')
        .send({ query })
        .expect(({ body }) => {
          expect(body.errors).toBeUndefined()
          expect(body.data.party.id).toEqual(id)
          expect(body.data.party.leader.id).toEqual(leader)
        })
        .expect(200)
    })

    it('should return party based on acronym', function () {
      const acronym = 'PT'
      const id = '36844'
      const query = queryPartyByAcronym(acronym)

      Nock(TestConstants.deputiesApiURL)
        .get('/partidos')
        .query(contains('sigla', acronym))
        .reply(200, stub(StubWithOneParty))
        .get(`/partidos/${id}`)
        .reply(200, stub(StubParty))

      return Supertest(application.server())
        .post('/graphql')
        .send({ query })
        .expect(({ body }) => {
          expect(body.errors).toBeUndefined()
          expect(body.data.partyByAcronym.id).toEqual(id)
          expect(body.data.partyByAcronym.acronym).toEqual(acronym)
        })
        .expect(200)
    })

    it('should return parties based on search criteria', function () {
      const query = querySearchParties('PT')
      const expectedId = '36844'

      Nock(TestConstants.deputiesApiURL)
        .get('/partidos')
        .query(allOf(contains('sigla', 'PT'), contains('ordem', 'DESC')))
        .reply(200, stub(StubWithOneParty))

      return Supertest(application.server())
        .post('/graphql')
        .send({ query })
        .expect(({ body }) => {
          expect(body.errors).toBeUndefined()
          expect(body.data.parties.edges).toHaveLength(1)
          expect(body.data.parties.edges[0].node.id).toEqual(expectedId)
        })
        .expect(200)
    })
  })
})
