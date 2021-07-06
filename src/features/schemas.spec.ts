import { buildSchemas } from '@app/features/schemas'

describe('GraphQL Schemas', function () {
  it('should load and build schemas recursively without problems', function () {
    expect(() => buildSchemas()).not.toThrow()
  })
})
