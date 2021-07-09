import { PartyRepository } from '@app/features/parties'
import { Party } from '@app/data/api'
import mercurius from 'mercurius'
import { GraphQLResolveInfo } from 'graphql'
import { Context, Query } from '@app/features/core'
import ErrorWithProps = mercurius.ErrorWithProps

export interface PartyByAcronymArgs {
  acronym: string
}

export class QueryPartyByAcronym implements Query<unknown, PartyByAcronymArgs, Party> {
  constructor(private readonly partyRepository: PartyRepository) {}

  async execute(parent: unknown, args: PartyByAcronymArgs, _ctx: Context, _info: GraphQLResolveInfo): Promise<Party> {
    const response = await this.partyRepository.getByAcronym(args.acronym)

    if (response.isEmpty()) {
      throw new ErrorWithProps(`No party found with acronym "${args.acronym}"`, { ...args })
    }

    return this.partyRepository.getById(response.get().id)
  }
}
