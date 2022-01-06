import { LoggingInterceptor } from '@drizzle-http/logging-interceptor'
import { Level } from '@drizzle-http/logging-interceptor'
import { UndiciCallFactory } from '@drizzle-http/undici'
import { MapCallAdapterFactory } from '@drizzle-http/response-mapper-adapter'
import { newAPI } from '@drizzle-http/core'
import { CircuitBreakerCallAdapterFactory } from '@drizzle-http/opossum-circuit-breaker'
import { Configurations } from '../config/Configurations'
import { CongressApi } from './CongressApi'
import { NodeHttpCallAdapterFactory } from './utils/NodeHttpCallAdapter'

export function buildCongressApi(configurations: Configurations): CongressApi {
  const callFactory = configurations.runtime.isTest ? new NodeHttpCallAdapterFactory() : new UndiciCallFactory()

  const builder = newAPI()
    .baseUrl(configurations.api.congress.url)
    .callFactory(callFactory)
    .addCallAdapterFactories(new CircuitBreakerCallAdapterFactory({}, new MapCallAdapterFactory()))

  if (configurations.api.congress.loggerEnabled && !configurations.runtime.isTest) {
    builder.addInterceptor(new LoggingInterceptor({ level: Level.HEADERS }))
  }

  return builder.build().create(CongressApi)
}
