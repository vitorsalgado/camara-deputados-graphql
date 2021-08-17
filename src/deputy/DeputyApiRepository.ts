import { CongressApi } from '../congressapi/CongressApi'
import { Order } from '../congressapi/models/base/Order'
import { ApiResult } from '../congressapi/models/base/ApiResult'
import { DeputySimple } from '../congressapi/models/deputy'
import { DeputiesArgs } from './query/deputies'
import { DeputyRepository } from './DeputyRepository'

export class DeputyApiRepository implements DeputyRepository {
  constructor(private readonly api: CongressApi) {}

  search(args: DeputiesArgs): Promise<ApiResult<DeputySimple[]>> {
    return this.api.deputies(args.id, args.name, null, null, null, null, null, null, 1, 10, Order.ASC, 'nome')
  }
}
