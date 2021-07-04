import { allOf } from '@app/utils/func'

describe('AllOf', function () {
  it('should return TRUE when all functions resolve to TRUE', function () {
    const fn1 = (val: string) => val === 'test'
    const fn2 = (val: string) => val.length === 4
    const fn3 = (_val: string) => true

    expect(allOf(fn1, fn2, fn3)('test')).toBeTruthy()
  })

  it('should return FALSE when any function resolves to FALSE', function () {
    const fn1 = (val: string) => val === 'test'
    const fn2 = (val: string) => val.length === 2
    const fn3 = (_val: string) => true

    expect(allOf(fn1, fn2, fn3)('test')).toBeFalsy()
  })

  it('should return FALSE when all functions resolve to TRUE', function () {
    const fn1 = (val: string) => val === 'abc'
    const fn2 = (val: string) => val.length === 5
    const fn3 = (_val: string) => false

    expect(allOf(fn1, fn2, fn3)('test')).toBeFalsy()
  })
})
