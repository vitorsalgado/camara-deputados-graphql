import { GraphQLEnumType } from 'graphql'

export const PartyTypes = {
  PartiesOrderBy: new GraphQLEnumType({
    name: 'PartiesOrderBy',
    description: 'Fields available for sorting on Parties Query',
    values: {
      ID: { value: 'id' },
      ACRONYM: { value: 'sigla' },
      NAME: { value: 'nome' },
      STARTDATE: { value: 'dataInicio' },
      ENDATE: { value: 'dataFim' }
    }
  })
}
