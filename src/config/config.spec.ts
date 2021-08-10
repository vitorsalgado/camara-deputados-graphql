import { EnvConfigurationsFactory } from './env'
import { provideConfig } from '.'

describe('Configurations', function () {
  it('should setup with environment variables', function () {
    provideConfig(new EnvConfigurationsFactory())
  })
})
