import { Optional } from '../../utils/Optional'
import { ApiResult } from '../models/base/ApiResult'

export const collectFirst = <R>(res: ApiResult<R[]>): Optional<R> => Optional.ofNullable(res.data[0])
