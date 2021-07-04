import Redis from 'ioredis'
import { CacheService } from '@app/utils/cache/cache.service'

export class CacheRedisService implements CacheService {
  constructor(private readonly redis: Redis.Redis) {}

  add<T>(key: string, value: T, ttl: number): Promise<T> {
    return this.redis.setex(key, ttl, JSON.stringify(value)).then(() => value)
  }

  get<T>(key: string): Promise<T | null> {
    return this.redis.get(key).then(cached => {
      if (cached) {
        return JSON.parse(cached)
      }

      return null
    })
  }

  async getAdding<T>(key: string, ttl: number, adder: () => Promise<T>): Promise<T> {
    const data = await this.get<T>(key)

    if (!data) {
      const newData = await adder()
      await this.add(key, newData, ttl)

      return newData
    }

    return data
  }

  getOr<T>(key: string, defaultValue: T): Promise<T> {
    return this.get<T>(key).then(cached => cached || defaultValue)
  }

  has(key: string): Promise<boolean> {
    return this.redis.exists(key).then(result => Boolean(result))
  }

  async remove(key: string): Promise<void> {
    await this.redis.del(key)
  }

  async clear(): Promise<void> {
    await this.redis.flushall()
  }
}
