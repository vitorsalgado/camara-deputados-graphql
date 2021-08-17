import { provideConfig } from '../../../config/provideConfig'
import { provideCacheService } from '../provideCacheService'
import { CacheInMemoryService } from '../CacheInMemoryService'
import { CacheRedisService } from '../CacheRedisService'
import { CacheStrategy } from '../CacheStrategy'

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
