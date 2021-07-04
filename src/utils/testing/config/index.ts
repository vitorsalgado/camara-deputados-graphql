import { Configurations } from '@app/config'

export function modifyConfigForTest(configurations: Configurations): Configurations {
  configurations.api.congress.loggerEnabled = true
  return configurations
}
