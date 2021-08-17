import { ConfigurationsFactory } from './ConfigurationsFactory'
import { Configurations } from './Configurations'
import { EnvConfigurationsFactory } from './env/EnvConfigurationsFactory'

export const provideConfig = (factory: ConfigurationsFactory = new EnvConfigurationsFactory()): Configurations =>
  factory.parseAndBuild()
