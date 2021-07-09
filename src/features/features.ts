import { provideCongressApi } from '@app/data/api'
import { Configurations } from '@app/config'
import { PartyApiRepository } from '@app/features/parties/party.repository-api'
import DeputyFeatures, { DeputyApiRepository } from '@app/features/deputies'
import PartyFeatures from '@app/features/parties'
import { Scalars } from '@app/utils/graphql/scalars'

export function graphqlFeatures(configurations: Configurations): any {
  // Deps
  const congressApi = provideCongressApi(configurations)
  const partyRepository = new PartyApiRepository(congressApi)
  const deputyRepository = new DeputyApiRepository(congressApi)

  // Features
  const deputy = DeputyFeatures(deputyRepository, partyRepository)
  const party = PartyFeatures(partyRepository, deputyRepository)

  return {
    Resolvers: {
      Query: {
        ...deputy.Queries,
        ...party.Queries
      },

      ...deputy.Types,
      ...party.Types,

      ...Scalars
    },
    Loaders: {
      ...deputy.Loaders,
      ...party.Loaders
    }
  }
}
