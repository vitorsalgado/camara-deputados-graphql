export interface CacheService {
  add<T>(key: string, value: T, ttl: number): Promise<T>

  get<T>(key: string): Promise<T | null>

  getOr<T>(key: string, defaultValue: T): Promise<T>

  getAdding<T>(key: string, ttl: number, adder: () => Promise<T>): Promise<T>

  has(key: string): Promise<boolean>

  remove(key: string): Promise<void>

  clear(): Promise<void>
}
