import { PartyRepository } from '../PartyRepository'
import { Query } from '../../base'
import { Party } from '../../congressapi/models/party'
import { AppError } from '../../AppError'

export interface PartyByAcronymArgs {
  acronym: string
}

export function partyByAcronym(partyRepository: PartyRepository): Query<PartyByAcronymArgs, Party> {
  return async function (parent: unknown, args: PartyByAcronymArgs) {
    const response = await partyRepository.getByAcronym(args.acronym)

    if (response.isEmpty()) {
      throw new AppError(`No party found with acronym "${args.acronym}"`, 'ERR_NOT_FOUND', { ...args })
    }

    return partyRepository.getById(response.get().id)
  }
}
