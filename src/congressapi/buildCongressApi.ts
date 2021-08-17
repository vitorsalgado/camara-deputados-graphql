import { Level } from 'drizzle-http'
import { PinoLogger } from 'drizzle-http'
import { LoggingInterceptor } from 'drizzle-http'
import { initDrizzleHttp } from 'drizzle-http'
import { UndiciCallFactory } from 'drizzle-http'
import { FetchCallFactory } from 'drizzle-http'
import { Configurations } from '../config/Configurations'
import { CongressApi } from './CongressApi'
import { TranslationCallAdapterFactory } from './translation/TranslationCallAdapterFactory'

export function buildCongressApi(configurations: Configurations): CongressApi {
  const callFactory = configurations.runtime.isTest
    ? // On test environments we use FetchCallFactory so we can mock http calls with Nock
      // Nock mocks NodeJs http module which doesn't use
      FetchCallFactory.DEFAULT
    : UndiciCallFactory.DEFAULT

  const builder = initDrizzleHttp()
    .baseUrl(configurations.api.congress.url)
    .callFactory(callFactory)
    .addCallAdapterFactories(new TranslationCallAdapterFactory())

  if (configurations.api.congress.loggerEnabled && !configurations.runtime.isTest) {
    builder.addInterceptor(new LoggingInterceptor(PinoLogger.DEFAULT, Level.HEADERS))
  }

  return builder.build().create(CongressApi)
}
