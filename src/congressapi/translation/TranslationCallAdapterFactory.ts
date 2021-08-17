import { CallAdapter, CallAdapterFactory, Drizzle, RequestFactory } from 'drizzle-http'
import { AdapterActivationKey } from './Map'
import { AdapterMapperFunctionKey } from './Map'
import { TranslationCallAdapter } from './TranslationCallAdapter'

export class TranslationCallAdapterFactory extends CallAdapterFactory {
  provideCallAdapter(
    _drizzle: Drizzle,
    _method: string,
    requestFactory: RequestFactory
  ): CallAdapter<unknown, unknown> | null {
    if (requestFactory.getConfig(AdapterActivationKey)) {
      return new TranslationCallAdapter(
        requestFactory.getConfig(AdapterMapperFunctionKey) as (response: unknown) => unknown
      )
    }

    return null
  }
}
