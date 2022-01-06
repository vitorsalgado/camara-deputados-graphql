import { newAPI } from '@drizzle-http/core'
import { UndiciCallFactory } from '@drizzle-http/undici'
import { CircuitBreakerCallAdapterFactory } from '@drizzle-http/opossum-circuit-breaker'
import { MapCallAdapterFactory } from '@drizzle-http/response-mapper-adapter'
import { LoggingInterceptor } from '@drizzle-http/logging-interceptor'
import { Level } from '@drizzle-http/logging-interceptor'
import { CongressApi } from './CongressApi'

export const apiFactory = {
  provide: CongressApi,
  useFactory: () => {
    return newAPI()
      .baseUrl('https://dadosabertos.camara.leg.br/api/v2/')
      .callFactory(new UndiciCallFactory())
      .addCallAdapterFactories(new CircuitBreakerCallAdapterFactory({}, new MapCallAdapterFactory()))
      .addCallAdapterFactories(new MapCallAdapterFactory())
      .addInterceptor(new LoggingInterceptor({ level: Level.HEADERS }))
      .createAPI(CongressApi)
  },
  inject: []
}
