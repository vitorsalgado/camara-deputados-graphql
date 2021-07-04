/* eslint-disable @typescript-eslint/no-unused-vars */

import { Accept, Body, ContentType, MediaTypes, POST, theTypes } from 'drizzle-http'

export interface GraphResponse<T, TExt> {
  data: T
  errors: {
    message: string
    path: string[]
    locations: { line: number; column: number }[]
    extensions: TExt
  }
}

export interface QueryBody {
  query: string
}

@ContentType(MediaTypes.APPLICATION_JSON_UTF8)
@Accept(MediaTypes.APPLICATION_JSON_UTF8)
export class GraphQLApi {
  @POST('/graphql')
  postGQL<T, TExt>(@Body() gql: QueryBody): Promise<GraphResponse<T, TExt>> {
    return theTypes(Promise)
  }
}
