import { AppError } from '../../../AppError'
import { apiError } from '../apiError'

describe('apiError', function () {
  it('should return AppError instance', function () {
    const err = apiError(new Error('message'))

    expect(err.message).toEqual('message')
    expect(err.code).toEqual('ERR_HTTP')
    expect(err).toBeInstanceOf(AppError)
  })
})
