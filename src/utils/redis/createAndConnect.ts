import Redis from 'ioredis'
import { Configurations } from '../../config/Configurations'
import { Logger } from '../log/Logger'

export function createAndConnect(configurations: Configurations): Redis.Redis {
  return new Redis(configurations.redis.connectionString)
    .on('connect', () => Logger.info('redis connected'))
    .on('ready', () => Logger.debug('redis ready to receive commands'))
    .on('error', error => Logger.error(error, error.message))
    .on('close', () => Logger.debug('Redis connection closed'))
    .on('end', () => Logger.debug('Redis connection ended'))
}
