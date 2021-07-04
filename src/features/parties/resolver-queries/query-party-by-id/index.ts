import { PartyRepository } from '@app/features/parties'
import { Party } from '@app/data/api'
import { MercuriusContext } from 'mercurius'

export interface FindByIdArgs {
  id: number
}

interface Q {
  party(_: MercuriusContext, args: FindByIdArgs): Promise<Party>
}

export function QueryPartyById(partyRepository: PartyRepository): Q {
  return {
    party(_: MercuriusContext, args: FindByIdArgs): Promise<Party> {
      return partyRepository.getById(args.id)
    }
  }
}
