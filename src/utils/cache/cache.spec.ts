import { CacheStrategy, provideCacheService } from '@app/utils/cache/cache-service.provider'
import { provideConfig } from '@app/config'
import { CacheInMemoryService } from '@app/utils/cache/in-memory'
import { CacheRedisService } from '@app/utils/cache/redis'

describe('Cache', function () {
  it('should return Redis CacheService based on provided CacheStrategy', function () {
    const someConfig = provideConfig()
    someConfig.cache.strategy = CacheStrategy.REDIS

    const cacheService = provideCacheService(someConfig)

    expect(cacheService).toBeInstanceOf(CacheRedisService)
    expect(async () => await cacheService.quit()).not.toThrowError()
  })

  it('should return In Memory CacheService based on provided CacheStrategy', function () {
    const someConfig = provideConfig()
    someConfig.cache.strategy = CacheStrategy.IN_MEMORY

    const cacheService = provideCacheService(someConfig)

    expect(cacheService).toBeInstanceOf(CacheInMemoryService)
    expect(async () => await cacheService.quit()).not.toThrowError()
  })
})
