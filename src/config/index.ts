import { EnvConfigurationsFactory } from '@app/config/env'
import { Configurations } from '@app/config/configurations'
import { ConfigurationsFactory } from '@app/config/configurations.factory'

export * from '@app/config/env'
export * from '@app/config/configurations'
export * from '@app/config/configurations.factory'

export const provideConfig = (factory: ConfigurationsFactory = new EnvConfigurationsFactory()): Configurations =>
  factory.parseAndBuild()
