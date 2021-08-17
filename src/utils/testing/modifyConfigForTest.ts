import { Configurations } from '../../config/Configurations'

export function modifyConfigForTest(configurations: Configurations): Configurations {
  configurations.api.congress.loggerEnabled = true
  return configurations
}
