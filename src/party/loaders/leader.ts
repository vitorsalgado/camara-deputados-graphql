import { DeputiesArgs } from '../../deputy/query/deputies'
import { LoaderArgs } from '../../utils/graphql/LoaderArgs'
import { extractIdFromUri } from '../../congressapi/utils/extractIdFromUri'
import { DeputyRepository } from '../../deputy/DeputyRepository'
import { Loader } from '../../base'
import { Party } from '../../congressapi/models/party'
import { DeputySimple } from '../../congressapi/models/deputy'

export function leader(deputyRepository: DeputyRepository): Loader<Party, DeputySimple[]> {
  return function (args: LoaderArgs<Party>[]) {
    return deputyRepository
      .search(new DeputiesArgs(args.map(({ obj: party }) => extractIdFromUri(party.status.leader.uri)).join(',')))
      .then(response => response.data)
  }
}
