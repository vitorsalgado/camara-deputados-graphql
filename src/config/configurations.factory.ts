import { Configurations } from '@app/config/configurations'

export interface ConfigurationsFactory {
  parseAndBuild(): Configurations
}
