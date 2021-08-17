import { ApiResult } from '../congressapi/models/base/ApiResult'
import { DeputySimple } from '../congressapi/models/deputy'
import { DeputiesArgs } from './query/deputies'

export interface DeputyRepository {
  search(args: DeputiesArgs): Promise<ApiResult<DeputySimple[]>>
}
