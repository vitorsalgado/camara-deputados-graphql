import { MercuriusContext } from 'mercurius'
import { PartySimple } from '@app/data/api'
import { PartyRepository } from '@app/features/parties'
import { SearchPartiesArgs } from '@app/features/parties/resolver-queries/query-parties/parties.query-args'
import { PagedResult } from '@app/utils/base/gql'
import { toPagedResult } from '@app/data/api/utils'

interface Q {
  parties(_: MercuriusContext, args: SearchPartiesArgs): Promise<PagedResult<PartySimple>>
}

export function QueryParties(partyRepository: PartyRepository): Q {
  return {
    parties: (_: MercuriusContext, args: SearchPartiesArgs): Promise<PagedResult<PartySimple>> =>
      partyRepository.search(args).then(toPagedResult)
  }
}
