import { PartyRepository } from '../../party/PartyRepository'
import { LoaderArgs } from '../../utils/graphql/LoaderArgs'
import { SearchPartiesArgs } from '../../party/query/parties'
import { Loader } from '../../base'
import { PartySimple } from '../../congressapi/models/party'
import { DeputySimple } from '../../congressapi/models/deputy'

export function party(partyRepository: PartyRepository): Loader<DeputySimple, PartySimple[]> {
  return async function (queries: LoaderArgs<DeputySimple>[]) {
    const acronyms = queries.map(({ obj }) => obj.partyAcronym).join(',')
    const parties = await partyRepository.search(new SearchPartiesArgs(acronyms))

    return parties.data
  }
}
