import { GraphQLApi } from '@app/utils/testing/app-graphql-client/graphql-api'
import { initDrizzleHttp, Level, LoggingInterceptor, PinoLogger, UndiciCallFactory } from 'drizzle-http'

export function provideGraphApi(baseUrl: string, log = false): GraphQLApi {
  const builder = initDrizzleHttp().baseUrl(baseUrl).callFactory(new UndiciCallFactory())

  if (log) {
    builder.addInterceptor(new LoggingInterceptor(PinoLogger.DEFAULT, Level.BODY))
  }

  return builder.build().create(GraphQLApi)
}
