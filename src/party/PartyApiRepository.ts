import { Injectable } from '@nestjs/common'
import { collectFirst } from '../congressapi/utils/collectFirst'
import { CongressApi } from '../congressapi/CongressApi'
import { Party } from '../congressapi/models/party'
import { PartySimple } from '../congressapi/models/party'
import { ApiResult } from '../congressapi/models/base/ApiResult'
import { Optional } from '../utils/Optional'
import { SearchPartiesArgs } from './query/parties'
import { PartyRepository } from './PartyRepository'

@Injectable()
export class PartyApiRepository implements PartyRepository {
  constructor(private readonly api: CongressApi) {}

  getById(id: number): Promise<Party> {
    return this.api.partyById(id).then(response => response.data)
  }

  getByAcronym(acronym: string): Promise<Optional<PartySimple>> {
    return this.search(new SearchPartiesArgs(acronym)).then(collectFirst)
  }

  search(qry: SearchPartiesArgs): Promise<ApiResult<PartySimple[]>> {
    return this.api.parties(
      qry.acronym,
      qry.startDate,
      qry.endDate,
      qry.termId,
      qry.after,
      qry.first,
      qry.order,
      qry.orderBy
    )
  }
}
