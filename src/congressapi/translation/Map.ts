import { DrizzleMeta } from 'drizzle-http'

export const AdapterActivationKey = 'translation_mapper'
export const AdapterMapperFunctionKey = 'translation_mapper_function'

export function Map<R, TR>(mapper: (response: R) => TR) {
  return function (target: any, method: string): void {
    const requestFactory = DrizzleMeta.provideRequestFactory(target.constructor, method)
    requestFactory.addConfig(AdapterActivationKey, true)
    requestFactory.addConfig(AdapterMapperFunctionKey, mapper)
  }
}
