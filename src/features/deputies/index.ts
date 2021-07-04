import { DeputyRepository } from '@app/features/deputies/deputy.repository'
import { PartyRepository } from '@app/features/parties'
import { QueryDeputies } from '@app/features/deputies/resolver-queries/query-deputies'
import { LoadDeputyParty } from '@app/features/deputies/loaders/party/deputy.loaders'

export * from './deputy.repository'
export * from './deputy.repository-api'
export { QueryDeputies, LoadDeputyParty }

export default function DeputyFeatures(deputyRepository: DeputyRepository, partyRepository: PartyRepository) {
  const queryDeputies = QueryDeputies(deputyRepository)
  const loadDeputyParty = LoadDeputyParty(partyRepository)

  return {
    Types: {},
    Queries: {
      ...queryDeputies
    },
    Loaders: {
      Deputy: {
        ...loadDeputyParty
      }
    }
  }
}
