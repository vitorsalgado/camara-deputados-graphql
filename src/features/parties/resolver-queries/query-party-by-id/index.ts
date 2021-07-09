import { PartyRepository } from '@app/features/parties'
import { Party } from '@app/data/api'
import { Context, Query } from '@app/features/core'
import { GraphQLResolveInfo } from 'graphql'

export interface FindByIdArgs {
  id: number
}

export class QueryPartyById implements Query<unknown, FindByIdArgs, Party> {
  constructor(private readonly partyRepository: PartyRepository) {}

  execute = (parent: unknown, args: FindByIdArgs, _ctx: Context, _info: GraphQLResolveInfo): Promise<Party> =>
    this.partyRepository.getById(args.id)
}
