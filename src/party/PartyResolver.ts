import { Resolver } from '@nestjs/graphql'
import { Query } from '@nestjs/graphql'
import { CongressApi } from '../congressapi/CongressApi'
import { Party } from './Party'

@Resolver(() => Party)
export class PartyResolver {
  constructor(private readonly api: CongressApi) {}

  @Query(() => Party)
  party(): Promise<Party> {
    return this.api.partyById(36844).then(result => result.data)
  }
}
