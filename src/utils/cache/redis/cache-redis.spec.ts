import { CacheRedisService } from '@app/utils/cache'
import { createAndConnect } from '@app/utils/redis'
import { provideConfig } from '@app/config'

describe('Cache Redis', function () {
  const configurations = provideConfig()
  const redis = createAndConnect(configurations)
  const cacheService = new CacheRedisService(redis)

  afterAll(async () => {
    await redis.quit()
    await cacheService.quit()
  })

  it('should add data', async function () {
    const key = 'test'
    const value = { message: 'hello' }
    const ttl = 10

    redis.setex = jest.fn().mockReturnValueOnce(Promise.resolve())

    const result = await cacheService.add(key, value, ttl)

    expect(result).toEqual(value)
    expect(redis.setex).toHaveBeenCalledWith(key, ttl, JSON.stringify(value))
  })

  it('should return empty when there is no data on the cache', async function () {
    const key = 'test'
    redis.get = jest.fn().mockReturnValueOnce(Promise.resolve(null))

    const result = await cacheService.get(key)

    expect(result.isEmpty()).toBeTruthy()
  })

  it('should return cached data', async function () {
    const key = 'test'
    const value = { message: 'super test' }
    redis.get = jest.fn().mockReturnValueOnce(Promise.resolve(JSON.stringify(value)))

    const result = await cacheService.get(key)

    expect(result.isEmpty()).toBeFalsy()
    expect(result.get()).toEqual(value)
  })

  it('should fetch data first and put it in cache when it is unavailable when calling .getAndUpdate()', async function () {
    const key = 'test'
    const value = { message: 'super test' }
    const ttl = 50

    const fetcher = jest.fn().mockReturnValueOnce(Promise.resolve(value))

    redis.setex = jest.fn().mockReturnValueOnce(Promise.resolve())
    redis.get = jest.fn().mockReturnValueOnce(Promise.resolve(null))

    const result = await cacheService.getAndUpdate(key, ttl, fetcher)

    expect(result).toEqual(value)
    expect(fetcher).toHaveBeenCalled()
    expect(redis.get).toHaveBeenCalledWith(key)
  })

  it('should fetch data first and put it in cache when it is unavailable when calling .getAndUpdate()', async function () {
    const key = 'test'
    const value = { message: 'super test' }
    const ttl = 50

    const fetcher = jest.fn()

    redis.setex = jest.fn().mockReturnValueOnce(Promise.resolve())
    redis.get = jest.fn().mockReturnValueOnce(Promise.resolve(JSON.stringify(value)))

    const result = await cacheService.getAndUpdate(key, ttl, fetcher)

    expect(result).toEqual(value)
    expect(fetcher).not.toHaveBeenCalled()
    expect(redis.get).toHaveBeenCalledWith(key)
  })

  it('should return the default value when there is no data in the cache', async function () {
    const key = 'test'
    const def = { message: 'hey' }

    redis.get = jest.fn().mockReturnValueOnce(Promise.resolve(null))

    const result = await cacheService.getOr(key, def)

    expect(result).toEqual(def)
    expect(redis.get).toHaveBeenCalledWith(key)
  })

  it('should return the default value when there is no data in the cache', async function () {
    const key = 'test'
    const value = { message: 'the valid value' }
    const def = { message: 'hey' }

    redis.get = jest.fn().mockReturnValueOnce(Promise.resolve(JSON.stringify(value)))

    const result = await cacheService.getOr(key, def)

    expect(result).toEqual(value)
    expect(redis.get).toHaveBeenCalledWith(key)
  })

  it('should return TRUE when data is present', async function () {
    const key = 'test'
    redis.exists = jest.fn().mockReturnValueOnce(Promise.resolve(1))

    const result = await cacheService.has(key)

    expect(result).toBeTruthy()
    expect(redis.exists).toHaveBeenCalledWith(key)
  })

  it('should return FALSE when data is not present', async function () {
    const key = 'test'
    redis.exists = jest.fn().mockReturnValueOnce(Promise.resolve(0))

    const result = await cacheService.has(key)

    expect(result).toBeFalsy()
    expect(redis.exists).toHaveBeenCalledWith(key)
  })

  it('should remove data from cache', async function () {
    const key = 'test'
    redis.del = jest.fn().mockReturnValueOnce(Promise.resolve())

    await cacheService.remove(key)

    expect(redis.del).toHaveBeenCalledWith(key)
  })

  it('should remove all items from cache', async function () {
    redis.flushall = jest.fn().mockReturnValueOnce(Promise.resolve())
    await cacheService.clear()

    expect(redis.flushall).toHaveBeenCalled()
  })
})
