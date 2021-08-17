import { Configurations } from './Configurations'

export interface ConfigurationsFactory {
  parseAndBuild(): Configurations
}
