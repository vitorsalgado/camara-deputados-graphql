import Redis from 'ioredis'
import { Configurations } from '@app/config'

export function createAndConnect(configurations: Configurations): Redis.Redis {
  return new Redis(configurations.redis.connectionString)
}
