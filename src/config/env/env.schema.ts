import Joi from 'joi'

const ConfigurationsSchema = Joi.object({
  // Runtime
  NODE_ENV: Joi.string().default('production'),

  // Log
  LOG_LEVEL: Joi.string().default('info'),
  LOG_PRETTY: Joi.boolean().default('false'),

  // Server
  PORT: Joi.number().default(4000),
  SERVER_HOST: Joi.string().default('::'),
  SERVER_LOG_ENABLED: Joi.boolean().default(false),

  // Deputies API
  CONGRESS_API_URL: Joi.string().default('https://dadosabertos.camara.leg.br/api/v2'),
  CONGRESS_API_LOG_ENABLED: Joi.boolean().default(false),

  // GraphQL
  GQL_GRAPHIQL: Joi.alternatives().try(Joi.boolean().default(true), Joi.string().default('graphiql')).default(true),

  // Cache
  CACHE_STRATEGY: Joi.string().allow('in-memory', 'redis').default('in-memory'),

  // Redis
  REDIS_CONNECTION_STRING: Joi.string().default('redis://0.0.0.0:6379'),

  // APM
  NEW_RELIC_NO_CONFIG_FILE: Joi.boolean().default(true),
  NEW_RELIC_LICENSE_KEY: Joi.string(),
  NEW_RELIC_APP_NAME: Joi.string()
}).unknown()

export const parseConfigurations = (source: unknown): any => Joi.attempt(source, ConfigurationsSchema)
