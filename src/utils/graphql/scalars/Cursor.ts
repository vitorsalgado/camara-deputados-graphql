import { GraphQLScalarType, Kind } from 'graphql'
import { decode } from '../../encoding/base64'
import { encode } from '../../encoding/base64'

export const Cursor = new GraphQLScalarType({
  name: 'Cursor',

  serialize(value: number) {
    return encode(String(value))
  },

  parseValue(value: string): number {
    return parseInt(decode(value))
  },

  parseLiteral(ast: any) {
    if (ast.kind !== Kind.STRING) {
      return parseInt(decode(ast.value))
    }

    return parseInt(decode(String(ast.value)))
  }
})
