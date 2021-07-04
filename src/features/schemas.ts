import Fs from 'fs'
import Path from 'path'
import { buildSchema, GraphQLSchema } from 'graphql'
import { getFiles } from '@app/utils/io/file'
import Logger from '@app/utils/log'
import { peek } from '@app/utils/func/peek'

const isSchema = (file: string): boolean =>
  file.indexOf('.graphql') > -1 || file.indexOf('.graphqls') > -1 || file.indexOf('.gql') > -1

const loadSchemas = (baseDir: string): string =>
  getFiles(baseDir, isSchema)
    .map(peek(x => Logger.debug(`gQL File: ${x}`)))
    .map(x => Fs.readFileSync(x))
    .map(x => Buffer.concat([x]))
    .map(x => x.toString())
    .join()

export const buildSchemas = (): GraphQLSchema => buildSchema(loadSchemas(Path.resolve(__dirname)))
