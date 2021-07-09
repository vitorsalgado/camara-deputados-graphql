import { ApiResult, CongressApi, Party, PartySimple } from '@app/data/api'
import { PartyRepository } from '@app/features/parties/party.repository'
import { collectFirst } from '@app/data/api/utils/utils'
import { Optional } from '@app/utils/func/optional'
import { SearchPartiesArgs } from '@app/features/parties/resolver-queries/query-parties'

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
