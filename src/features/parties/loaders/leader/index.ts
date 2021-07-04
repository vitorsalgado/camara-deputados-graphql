import { DeputyRepository } from '@app/features/deputies'
import { LoaderArgs } from '@app/utils/base/gql'
import { DeputySimple, Party } from '@app/data/api'
import { extractIdFromUri } from '@app/data/api/utils'
import { SearchDeputiesArgs } from '@app/features/deputies/resolver-queries/query-deputies'

interface L {
  leader(args: LoaderArgs<Party>[]): Promise<DeputySimple[]>
}

export function LoadPartyLeader(deputyRepository: DeputyRepository): L {
  return {
    leader: (args: LoaderArgs<Party>[]): Promise<DeputySimple[]> =>
      deputyRepository
        .search(
          new SearchDeputiesArgs(args.map(({ obj: party }) => extractIdFromUri(party.status.leader.uri)).join(','))
        )
        .then(response => response.data)
  }
}
