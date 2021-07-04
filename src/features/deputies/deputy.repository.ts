import { DeputySimple, ApiResult } from '@app/data/api'
import { SearchDeputiesArgs } from '@app/features/deputies/resolver-queries/query-deputies'

export interface DeputyRepository {
  search(args: SearchDeputiesArgs): Promise<ApiResult<DeputySimple[]>>
}
