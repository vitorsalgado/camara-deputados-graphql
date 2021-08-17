import { BaseQuery } from '../../utils/graphql/BaseQuery'
import { PagedQuery } from '../../base'
import { toPagedResult } from '../../congressapi/utils/toPagedResult'
import { DeputyRepository } from '../DeputyRepository'
import { DeputySimple } from '../../congressapi/models/deputy'

export class DeputiesArgs implements BaseQuery {
  constructor(
    public readonly id: string,
    public readonly name: string = '',
    public readonly first: number = 100,
    public readonly after: string = ''
  ) {}
}

export function deputies(deputyRepository: DeputyRepository): PagedQuery<DeputiesArgs, DeputySimple> {
  return function () {
    return deputyRepository.search(new DeputiesArgs('')).then(toPagedResult)
  }
}
