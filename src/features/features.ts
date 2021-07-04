import { provideCongressApi } from '@app/data/api'
import { Configurations } from '@app/config'
import { PartyApiRepository } from '@app/features/parties/party.repository-api'
import DeputyFeatures, { DeputyApiRepository } from '@app/features/deputies'
import { CacheInmemoryService } from '@app/utils/cache'
import PartyFeatures from './parties'

export function graphqlFeatures(configurations: Configurations): any {
  // Deps
  const congressApi = provideCongressApi(configurations)
  const partyRepository = new PartyApiRepository(congressApi, new CacheInmemoryService())
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
      ...party.Types
    },
    Loaders: {
      ...deputy.Loaders,
      ...party.Loaders
    }
  }
}
