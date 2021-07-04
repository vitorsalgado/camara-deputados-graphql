/* eslint-disable @typescript-eslint/no-explicit-any */

import { AppServer } from '@app/srv/server'
import { provideConfig } from '@app/config'
import { contains, nockIsDone, stub, stubPath } from '@app/utils/testing/http/test-http-utils'
import {
  PartyStubs,
  queryPartyByAcronym,
  queryPartyById,
  queryPartyWithLeader,
  querySearchParties
} from '@app/features/parties/__fixtures__'
import Supertest from 'supertest'
import Nock from 'nock'
import TestConsts from '@app/utils/testing/http/test-constants'
import { allOf } from '@app/utils/func/allOf'
import { modifyConfigForTest } from '@app/utils/testing/config'

const StubParty = stubPath(__dirname, PartyStubs.Party)
const StubWithOneParty = stubPath(__dirname, PartyStubs.OneParty)
const StubDeputies = stubPath(__dirname, PartyStubs.Deputies)

describe('Party', function () {
  const application = new AppServer(modifyConfigForTest(provideConfig()))

  beforeAll(() => application.buildAndStart())
  beforeEach(() => Nock.cleanAll())
  afterAll(async () => {
    await application.close()
    expect(Nock.pendingMocks()).toHaveLength(0)
    Nock.cleanAll()
  })
  afterEach(() => nockIsDone(Nock))

  describe('Queries', function () {
    it('should return party by id', function () {
      const id = '36844'
      const query = queryPartyById(id)

      Nock(TestConsts.deputiesApiURL).get(`/partidos/${id}`).reply(200, stub(StubParty))

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

      Nock(TestConsts.deputiesApiURL)
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

      Nock(TestConsts.deputiesApiURL)
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

      Nock(TestConsts.deputiesApiURL)
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
