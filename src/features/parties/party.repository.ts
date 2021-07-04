import { ApiResult, Party, PartySimple } from '@app/data/api'
import { Optional } from '@app/utils/func/optional'
import { SearchPartiesArgs } from '@app/features/parties/resolver-queries/query-parties'

export interface PartyRepository {
  getById(id: number): Promise<Party>

  getByAcronym(acronym: string): Promise<Optional<PartySimple>>

  search(qry: SearchPartiesArgs): Promise<ApiResult<PartySimple[]>>
}
