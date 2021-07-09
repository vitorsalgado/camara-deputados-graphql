import Redis from 'ioredis'
import { CacheService } from '@app/utils/cache/cache.service'
import { Optional } from '@app/utils/func'

export class CacheRedisService implements CacheService {
  constructor(private readonly redis: Redis.Redis) {}

  async add<T>(key: string, value: T, ttl: number): Promise<T> {
    return this.redis.setex(key, ttl, JSON.stringify(value)).then(() => value)
  }

  async get<T>(key: string): Promise<Optional<T>> {
    const cached = await this.redis.get(key)

    if (cached) {
      return Optional.of(JSON.parse(cached))
    }

    return Optional.empty()
  }

  async getAndUpdate<T>(key: string, ttl: number, adder: () => Promise<T>): Promise<T> {
    const data = await this.get<T>(key)

    if (data.isEmpty()) {
      const newData = await adder()
      await this.add(key, newData, ttl)

      return newData
    }

    return data.get()
  }

  getOr<T>(key: string, defaultValue: T): Promise<T> {
    return this.get<T>(key).then(cached => cached.getOrDefault(defaultValue))
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

  async quit(): Promise<void> {
    await this.redis.quit()
  }
}
