/* eslint-disable no-console */

import Nock from 'nock'
import { nockIsDone } from '../nockIsDone'

describe('nockIsDone', function () {
  it('should log pending mocks and throw error when nock is not done', function () {
    console.log = jest.fn()
    const scope = Nock('http://example.org').get('/').reply(200)

    expect(() => nockIsDone(scope)).toThrow()
    expect(console.log).toHaveBeenCalled()
  })
})
