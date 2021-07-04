import { decode, encode } from '@app/utils/encoding/base64'

describe('Encoding', function () {
  describe('Base64', function () {
    it('should encode a string value', function () {
      const val = 'test-123456'
      const expected = 'dGVzdC0xMjM0NTY='

      const encoded = encode(val)
      const decoded = decode(encoded)

      expect(encoded).toEqual(expected)
      expect(decoded).toEqual(val)
    })
  })
})
