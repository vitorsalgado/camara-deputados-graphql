import { GraphQLScalarType, Kind } from 'graphql'
import { decode } from '../../encoding/base64'
import { encode } from '../../encoding/base64'

export const Cursor = new GraphQLScalarType({
  name: 'Cursor',

  serialize(value: unknown) {
    return encode(String(value))
  },

  parseValue(value: unknown): number {
    return parseInt(decode(value as string))
  },

  parseLiteral(ast: any) {
    if (ast.kind !== Kind.STRING) {
      return parseInt(decode(ast.value))
    }

    return parseInt(decode(String(ast.value)))
  }
})
