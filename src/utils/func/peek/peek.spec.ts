import { peek } from '.'

describe('Peek', function () {
  it('should execute the function with the argument without changing it', function () {
    const fn = jest.fn()
    const arg = 'test'

    peek(fn)(arg)

    expect(arg).toEqual('test')
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(arg)
  })
})
