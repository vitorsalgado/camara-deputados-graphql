import { CacheService } from '@app/utils/cache/cache.service'
import { CacheInMemoryService } from '@app/utils/cache/in-memory'
import { CacheRedisService } from '@app/utils/cache/redis'
import { createAndConnect } from '@app/utils/redis'
import { Configurations } from '@app/config'

export enum CacheStrategy {
  IN_MEMORY = 'in-memory',
  REDIS = 'redis'
}

export function provideCacheService(configurations: Configurations): CacheService {
  switch (configurations.cache.strategy) {
    case CacheStrategy.REDIS:
      return new CacheRedisService(createAndConnect(configurations))
    case CacheStrategy.IN_MEMORY:
    default:
      return new CacheInMemoryService()
  }
}
