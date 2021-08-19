import Fs from 'fs'
import Path from 'path'
import * as Util from 'util'
import { buildSchema, GraphQLSchema } from 'graphql'
import { Logger } from './utils/log/Logger'
import { getFilenames } from './utils/io/getFilenames'
import { peek } from './utils/peek'

const readFile = Util.promisify(Fs.readFile)

export async function buildGraphQLSchemas(): Promise<GraphQLSchema> {
  return buildSchema(await loadSchemas(Path.resolve(__dirname)))
}

const loadSchemas = (baseDir: string): Promise<string> =>
  Promise.all(
    getFilenames(baseDir, isSchema)
      .map(peek(x => Logger.debug(`GraphQL Schema File: ${x}`)))
      .map(file => readFile(file))
  )
    .then(buf => Buffer.concat(buf))
    .then(x => x.toString())

const isSchema = (file: string): boolean =>
  file.indexOf('.graphql') > -1 || file.indexOf('.graphqls') > -1 || file.indexOf('.gql') > -1
