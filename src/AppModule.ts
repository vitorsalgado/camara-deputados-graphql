import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { apiFactory } from './congressapi/apiProvider'
import { PartyModule } from './party/PartyModule'
import { HealthModule } from './health/HealthModule'

@Module({
  providers: [apiFactory],
  imports: [
    HealthModule,
    PartyModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true
    })
  ]
})
export class AppModule {}
