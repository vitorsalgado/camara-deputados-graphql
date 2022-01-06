import { ObjectType } from '@nestjs/graphql'
import { Field } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'

@ObjectType()
export class Party {
  @Field(() => ID)
  id: number

  @Field()
  acronym: string

  @Field()
  name: string

  @Field()
  uri: string

  @Field()
  logoUrl: string
}
