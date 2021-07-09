import { Order, PartySimple } from '@app/data/api'
import { PartyRepository } from '@app/features/parties'
import { PagedCriteria, PagedResult } from '@app/utils/base/gql'
import { toPagedResult } from '@app/data/api/utils'
import { Context, PagedQuery } from '@app/features/core'
import { GraphQLResolveInfo } from 'graphql'

export class SearchPartiesArgs implements PagedCriteria {
  constructor(
    public readonly acronym: string = '',
    public readonly startDate: string = '',
    public readonly endDate: string = '',
    public readonly termId: number | null = null,
    public readonly after: number = 1,
    public readonly first: number = 100,
    public readonly before: number = 1,
    public readonly last: number = 100,
    public readonly order: Order = Order.ASC,
    public readonly orderBy: string = 'sigla'
  ) {}
}

export class QueryParties implements PagedQuery<unknown, SearchPartiesArgs, PartySimple> {
  constructor(private readonly partyRepository: PartyRepository) {}

  execute = (
    parent: unknown,
    args: SearchPartiesArgs,
    _ctx: Context,
    _info: GraphQLResolveInfo
  ): Promise<PagedResult<PartySimple>> => this.partyRepository.search(args).then(toPagedResult)
}
