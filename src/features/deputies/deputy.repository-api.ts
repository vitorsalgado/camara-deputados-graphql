import { CongressApi, DeputySimple, Order, ApiResult } from '@app/data/api'
import { DeputyRepository } from '@app/features/deputies/deputy.repository'
import { SearchDeputiesArgs } from '@app/features/deputies/resolver-queries/query-deputies'

export class DeputyApiRepository implements DeputyRepository {
  constructor(private readonly api: CongressApi) {}

  search(args: SearchDeputiesArgs): Promise<ApiResult<DeputySimple[]>> {
    return this.api.deputies(args.id, args.name, null, null, null, null, null, null, 1, 10, Order.ASC, 'nome')
  }
}
