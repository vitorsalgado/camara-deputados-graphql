import { PartyRepository } from '@app/features/parties'
import { Party } from '@app/data/api'
import mercurius, { MercuriusContext } from 'mercurius'
import ErrorWithProps = mercurius.ErrorWithProps

export interface PartyByAcronymArgs {
  acronym: string
}

interface Q {
  partyByAcronym(_: MercuriusContext, args: PartyByAcronymArgs): Promise<Party>
}

export function QueryPartyByAcronym(partyRepository: PartyRepository): Q {
  return {
    partyByAcronym(_: MercuriusContext, args: PartyByAcronymArgs): Promise<Party> {
      return partyRepository.getByAcronym(args.acronym).then(response => {
        if (response.isEmpty()) {
          throw new ErrorWithProps(`No party found with acronym "${args.acronym}"`, { ...args })
        }

        return partyRepository.getById(response.get().id)
      })
    }
  }
}
