import { ApiResult, CongressApi, Party, PartySimple } from '@app/data/api'
import { PartyRepository } from '@app/features/parties/party.repository'
import { CacheService } from '@app/utils/cache'
import { collectFirst } from '@app/data/api/utils/utils'
import { Optional } from '@app/utils/func/optional'
import { SearchPartiesArgs } from '@app/features/parties/resolver-queries/query-parties'

export class PartyApiRepository implements PartyRepository {
  private static readonly CACHE_PARTIES = 'cache_parties'
  private static readonly CACHE_PARTIES_TTL = 24 * 60 * 60

  constructor(private readonly api: CongressApi, private readonly cacheService: CacheService) {}

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
      qry.page,
      qry.limit,
      qry.order,
      qry.orderBy
    )
  }
}
