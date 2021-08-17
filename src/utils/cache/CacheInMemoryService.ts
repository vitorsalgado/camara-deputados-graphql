import { Optional } from '../Optional'
import { CacheService } from './CacheService'

export class CacheInMemoryService implements CacheService {
  private readonly cache: Map<string, any>

  constructor(cache?: Map<string, any>) {
    this.cache = cache || new Map<string, any>()
  }

  add<T>(key: string, value: T, _ttl: number): Promise<T> {
    this.cache.set(key, value)
    return Promise.resolve(value)
  }

  get<T>(key: string): Promise<Optional<T>> {
    return Promise.resolve(Optional.ofNullable(this.cache.get(key)))
  }

  async getAndUpdate<T>(key: string, _ttl: number, adder: () => Promise<T>): Promise<T> {
    const data = this.cache.get(key)

    if (!data) {
      const newData = await adder()
      await this.cache.set(key, newData)

      return newData
    }

    return data
  }

  getOr<T>(key: string, defaultValue: T): Promise<T> {
    return Promise.resolve(this.cache.get(key) || defaultValue)
  }

  has(key: string): Promise<boolean> {
    return Promise.resolve(this.cache.has(key))
  }

  remove(key: string): Promise<void> {
    this.cache.delete(key)
    return Promise.resolve()
  }

  clear(): Promise<void> {
    this.cache.clear()
    return Promise.resolve()
  }

  quit(): Promise<void> {
    return Promise.resolve(undefined)
  }
}
