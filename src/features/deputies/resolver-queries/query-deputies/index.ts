import { BaseQry, PagedResult } from '@app/utils/base/gql'
import { DeputyRepository } from '@app/features/deputies'
import { toPagedResult } from '@app/data/api/utils'
import { DeputySimple } from '@app/data/api'

interface Q {
  deputies(): Promise<PagedResult<DeputySimple>>
}

export class SearchDeputiesArgs implements BaseQry {
  constructor(
    public readonly id: string,
    public readonly name: string = '',
    public readonly first: number = 100,
    public readonly after: string = ''
  ) {}
}

export function QueryDeputies(deputyRepository: DeputyRepository): Q {
  return {
    deputies(): Promise<PagedResult<DeputySimple>> {
      return deputyRepository.search(new SearchDeputiesArgs('')).then(toPagedResult)
    }
  }
}
