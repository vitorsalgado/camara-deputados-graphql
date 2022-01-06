import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import Nock from 'nock'
import Supertest from 'supertest'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import TestConstants from '../../utils/testing/TestConstants'
import { stub } from '../../utils/testing/stub'
import { stubPath } from '../../utils/testing/stubPath'
import { AppModule } from '../../AppModule'
import { PartyFixtures } from './__fixtures__'

const StubParty = stubPath(__dirname, PartyFixtures.Party)

describe('Party', function () {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile()
    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter())

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should ', function () {
    const id = '36844'
    // const query = queryPartyById(id)

    Nock(TestConstants.deputiesApiURL).get(`/partidos/${id}`).reply(200, stub(StubParty))

    return Supertest(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query {
    party {
      id
    }
  }`
      })
      .expect(({ body }) => {
        expect(body.errors).toBeUndefined()
        expect(body.data.party.id).toEqual(id)
        expect(body.data.party.name).toEqual('Partido dos Trabalhadores')
      })
      .expect(200)
  })
})
