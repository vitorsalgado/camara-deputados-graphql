import { Party } from '../congressapi/models/party'
import { PartySimple } from '../congressapi/models/party'
import { ApiResult } from '../congressapi/models/base/ApiResult'
import { Optional } from '../utils/Optional'
import { SearchPartiesArgs } from './query/parties'

export interface PartyRepository {
  getById(id: number): Promise<Party>

  getByAcronym(acronym: string): Promise<Optional<PartySimple>>

  search(qry: SearchPartiesArgs): Promise<ApiResult<PartySimple[]>>
}
