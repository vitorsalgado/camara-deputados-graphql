import { provideConfig } from './'
import { EnvConfigurationsFactory } from './env'

describe('Configurations', function () {
  it('should setup with environment variables', function () {
    provideConfig(new EnvConfigurationsFactory())
  })
})
