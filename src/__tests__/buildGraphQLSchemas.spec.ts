import { validateSchema } from 'graphql'
import { buildGraphQLSchemas } from '../buildGraphQLSchemas'

describe('buildGraphQLSchemas', function () {
  describe('when schema is valid', function () {
    it('should load and build without errors', async function () {
      const errors = validateSchema(await buildGraphQLSchemas())

      expect(errors).toHaveLength(0)
    })
  })
})
