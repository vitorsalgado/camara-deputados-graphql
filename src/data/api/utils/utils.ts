import { ApiResult } from '@app/data/api'
import { Optional } from '@app/utils/func/optional'

export const extractIdFromUri = (uri: string): string => uri.substring(uri.lastIndexOf('/') + 1, uri.length)

export const collectFirst = <R>(res: ApiResult<R[]>): Optional<R> => Optional.ofNullable(res.data[0])
