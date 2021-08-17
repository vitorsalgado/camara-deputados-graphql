import { provideConfig } from '../provideConfig'
import { EnvConfigurationsFactory } from '../env/EnvConfigurationsFactory'

describe('Configurations', function () {
  it('should setup with environment variables', function () {
    provideConfig(new EnvConfigurationsFactory())
  })
})
