import { DeputyRepository } from '@app/features/deputies'
import { LoaderArgs } from '@app/utils/base/gql'
import { DeputySimple, Party } from '@app/data/api'
import { extractIdFromUri } from '@app/data/api/utils'
import { SearchDeputiesArgs } from '@app/features/deputies/resolver-queries/query-deputies'
import { Loader } from '@app/features/core'

export class LoadPartyLeader implements Loader<Party, DeputySimple[]> {
  constructor(private readonly deputyRepository: DeputyRepository) {}

  execute(args: LoaderArgs<Party>[]): Promise<DeputySimple[]> {
    return this.deputyRepository
      .search(new SearchDeputiesArgs(args.map(({ obj: party }) => extractIdFromUri(party.status.leader.uri)).join(',')))
      .then(response => response.data)
  }
}
