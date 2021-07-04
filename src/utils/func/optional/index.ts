/* eslint-disable @typescript-eslint/no-non-null-assertion */

export class Optional<T> {
  constructor(public readonly value?: T) {}

  static empty = <T>(): Optional<T> => new Optional<T>()

  static ofNullable = <T>(value?: T): Optional<T> => (value ? Optional.of(value) : Optional.empty<T>())

  static of = <T>(value: T): Optional<T> => new Optional(Optional.checkNotNull(value))

  isEmpty = (): boolean => !this.value

  isPresent = (): boolean => !!this.value

  get = (): T => Optional.checkNotNull(this.value!)

  getOrDefault = (defaultValue: T): T => this.value ?? defaultValue

  map = <R>(mapper: (value: T) => R): Optional<R> =>
    this.isPresent() ? Optional.ofNullable(mapper(this.value!)) : Optional.empty()

  ifPresent = (fn: (value: T | null) => void): void => {
    if (this.isPresent()) {
      fn(this.value!)
    }
  }

  private static checkNotNull<T>(value: T): T {
    if (value === null || typeof value === 'undefined') {
      throw new TypeError('')
    }

    return value
  }
}

export const empty = <T>(): Optional<T> => Optional.ofNullable()

export const fromNullable = <T>(value: T): Optional<T> => new Optional<T>(value)
