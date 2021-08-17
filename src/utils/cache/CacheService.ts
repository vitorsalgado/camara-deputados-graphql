import { Optional } from '../Optional'

export interface CacheService {
  add<T>(key: string, value: T, ttl: number): Promise<T>

  get<T>(key: string): Promise<Optional<T>>

  getOr<T>(key: string, defaultValue: T): Promise<T>

  getAndUpdate<T>(key: string, ttl: number, adder: () => Promise<T>): Promise<T>

  has(key: string): Promise<boolean>

  remove(key: string): Promise<void>

  clear(): Promise<void>

  quit(): Promise<void>
}
