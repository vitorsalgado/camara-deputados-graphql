import { LoaderArgs } from '@app/utils/base/gql'
import { PartyRepository } from '@app/features/parties/party.repository'
import { DeputySimple, PartySimple } from '@app/data/api'
import { SearchPartiesArgs } from '@app/features/parties/resolver-queries/query-parties'

interface L {
  party(queries: LoaderArgs<DeputySimple>[]): Promise<PartySimple[]>
}

export function LoadDeputyParty(partyRepository: PartyRepository): L {
  return {
    async party(queries: LoaderArgs<DeputySimple>[]): Promise<PartySimple[]> {
      const acronyms = queries.map(({ obj }) => obj.partyAcronym).join(',')
      const parties = await partyRepository.search(new SearchPartiesArgs(acronyms))

      return parties.data
    }
  }
}
