import Joi from 'joi'
import { EnvSchema } from './EnvSchema'

export const parseConfigurations = (source: unknown): Record<string, any> => Joi.attempt(source, EnvSchema)
