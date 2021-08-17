import { Configurations } from '../../config/Configurations'
import { createAndConnect } from '../redis/createAndConnect'
import { CacheInMemoryService } from './CacheInMemoryService'
import { CacheRedisService } from './CacheRedisService'
import { CacheStrategy } from './CacheStrategy'
import { CacheService } from './CacheService'

export function provideCacheService(configurations: Configurations): CacheService {
  switch (configurations.cache.strategy) {
    case CacheStrategy.REDIS:
      return new CacheRedisService(createAndConnect(configurations))
    case CacheStrategy.IN_MEMORY:
    default:
      return new CacheInMemoryService()
  }
}
