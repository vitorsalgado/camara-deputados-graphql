import { parseConfigurations } from '@app/config'
import { Configurations } from '@app/config/configurations'
import { ConfigurationsFactory } from '@app/config/configurations.factory'

export class EnvConfigurationsFactory implements ConfigurationsFactory {
  parseAndBuild(): Configurations {
    const env = parseConfigurations(process.env)

    return {
      runtime: { isTest: env.NODE_ENV === 'test' },
      log: { level: env.LOG_LEVEL, pretty: env.LOG_PRETTY },
      server: { port: env.PORT, host: env.SERVER_HOST, loggerEnabled: env.SERVER_LOG_ENABLED },
      api: {
        congress: { url: env.CONGRESS_API_URL, loggerEnabled: env.CONGRESS_API_LOG_ENABLED }
      },
      graphql: { graphiql: env.GQL_GRAPHIQL },
      cache: { strategy: env.CACHE_STRATEGY },
      redis: { connectionString: env.REDIS_CONNECTION_STRING }
    }
  }
}
