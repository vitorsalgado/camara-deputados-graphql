import { CacheInMemoryService } from '../CacheInMemoryService'

describe('Cache In Memory', function () {
  const cacheService = new CacheInMemoryService()

  afterEach(() => cacheService.clear())
  afterAll(() => cacheService.quit())

  it('should add data and it must be present on cache', async function () {
    const key = 'test'
    const value = { message: 'hello' }
    const ttl = 10

    const added = await cacheService.add(key, value, ttl)
    const data = await cacheService.get(key)

    expect(added).toEqual(value)
    expect(data.get()).toEqual(value)
    expect(cacheService.has(key)).toBeTruthy()
  })

  describe('when key is not present', function () {
    it('should return empty', async function () {
      const key = 'test'
      const result = await cacheService.get(key)

      expect(result.isEmpty()).toBeTruthy()
      expect(await cacheService.has(key)).toBeFalsy()
    })

    it('should return the provided default value when calling .getOr()', async function () {
      const key = 'test'
      const def = { message: 'hey' }

      const result = await cacheService.getOr(key, def)

      expect(result).toEqual(def)
    })

    it('should fetch data with fetcher function and put it in cache before returning the data', async function () {
      const key = 'test'
      const value = { message: 'super test' }
      const ttl = 50

      const fetcher = jest.fn().mockReturnValueOnce(Promise.resolve(value))
      const result = await cacheService.getAndUpdate(key, ttl, fetcher)

      expect(result).toEqual(value)
      expect(fetcher).toHaveBeenCalled()
    })
  })

  describe('when key is present', function () {
    it('should not return the provided default value when calling .getOr()', async function () {
      const key = 'test'
      const value = { message: 'hello world' }
      const def = { message: 'hey' }

      await cacheService.add(key, value, 100)

      const result = await cacheService.getOr(key, def)

      expect(result).toEqual(value)
      expect(result).not.toEqual(def)
    })

    it('should just return cached data without calling the fetcher function', async function () {
      const key = 'test'
      const value = { message: 'super test' }
      const ttl = 50

      await cacheService.add(key, value, ttl)

      const fetcher = jest.fn().mockReturnValueOnce(Promise.resolve({ message: 'fail' }))
      const result = await cacheService.getAndUpdate(key, ttl, fetcher)

      expect(result).toEqual(value)
      expect(fetcher).not.toHaveBeenCalled()
    })
  })

  it('should remove data from cache', async function () {
    const key = 'test'

    await cacheService.remove(key)

    expect(await cacheService.has(key)).toBeFalsy()
  })

  it('should remove all items from cache', async function () {
    await cacheService.clear()
  })
})
