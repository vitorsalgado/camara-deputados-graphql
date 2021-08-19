import Supertest from 'supertest'
import { provideConfig } from '../../config/provideConfig'
import { modifyConfigForTest } from '../../utils/testing/modifyConfigForTest'
import { GraphQLServer } from '../../GraphQLServer'

describe('Server Metrics', function () {
  const application = new GraphQLServer(modifyConfigForTest(provideConfig()))

  beforeAll(async () => application.buildAndStart())
  afterAll(() => application.close())

  it('should return status 204 (No Content) when server is online', async function () {
    await Supertest(application.server()).get('/live').expect(204)
  })
})
