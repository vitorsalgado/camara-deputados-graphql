import '@app/utils/log'

import Supertest from 'supertest'
import { AppServer } from '@app/srv'
import { provideConfig } from '@app/config'
import { modifyConfigForTest } from '@app/utils/testing/config'

describe('Sys', function () {
  const application = new AppServer(modifyConfigForTest(provideConfig()))

  beforeAll(async () => application.buildAndStart())
  afterAll(() => application.close())

  it('should return status 204 (No Content) when server is online', async function () {
    await Supertest(application.server()).get('/system/health').expect(204)
  })
})
