import {
  FetchCallFactory,
  initDrizzleHttp,
  Level,
  LoggingInterceptor,
  PinoLogger,
  UndiciCallFactory
} from 'drizzle-http'
import { CongressApi } from '@app/data/api/congress.api'
import { Configurations } from '@app/config'
import { TranslationCallAdapterFactory } from '@app/data/api/translation/translation-call-adapter-factory'

export function provideCongressApi(configurations: Configurations): CongressApi {
  const callFactory = configurations.runtime.isTest
    ? // On test environments we use FetchCallFactory so we can mock http calls with Nock
      // Nock mocks NodeJs http module which doesn't use
      FetchCallFactory.DEFAULT
    : UndiciCallFactory.DEFAULT

  const builder = initDrizzleHttp()
    .baseUrl(configurations.api.congress.url)
    .callFactory(callFactory)
    .addCallAdapterFactories(new TranslationCallAdapterFactory())

  if (configurations.api.congress.loggerEnabled) {
    builder.addInterceptor(new LoggingInterceptor(PinoLogger.DEFAULT, Level.HEADERS))
  }

  return builder.build().create(CongressApi)
}

export * from './congress.api'
export * from './models'
