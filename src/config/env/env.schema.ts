import Joi from 'joi'

const ConfigurationsSchema = Joi.object({
  NODE_ENV: Joi.string().default('production'),

  LOG_LEVEL: Joi.string().default('info'),
  LOG_PRETTY: Joi.boolean().default('false'),

  PORT: Joi.number().default(3000),
  SERVER_HOST: Joi.string().default('::'),
  SERVER_LOG_ENABLED: Joi.boolean().default(false),

  CONGRESS_API_URL: Joi.string().default('https://dadosabertos.camara.leg.br/api/v2'),
  CONGRESS_API_LOG_ENABLED: Joi.boolean().default(false),

  GQL_PLAYGROUND: Joi.string().default('playground'),

  REDIS_CONNECTION_STRING: Joi.string().default('redis://0.0.0.0:6379')
}).unknown()

export const parseConfigurations = (source: unknown): any => Joi.attempt(source, ConfigurationsSchema)
