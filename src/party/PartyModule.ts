import { Module } from '@nestjs/common'
import { CongressApi } from '../congressapi/CongressApi'
import { PartyResolver } from './PartyResolver'

@Module({
  providers: [PartyResolver, CongressApi]
})
export class PartyModule {}
