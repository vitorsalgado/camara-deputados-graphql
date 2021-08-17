import { PartyRepository } from '../PartyRepository'
import { Query } from '../../base'
import { Party } from '../../congressapi/models/party'

export interface FindPartyByIdArgs {
  id: number
}

export function party(partyRepository: PartyRepository): Query<FindPartyByIdArgs, Party> {
  return function (parent: unknown, args: FindPartyByIdArgs) {
    return partyRepository.getById(args.id)
  }
}
