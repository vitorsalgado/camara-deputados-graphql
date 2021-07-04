import { QueryPartyByAcronym } from '@app/features/parties/resolver-queries/query-party-by-acronym'
import { PartyRepository } from '@app/features/parties/party.repository'
import { QueryPartyById } from '@app/features/parties/resolver-queries/query-party-by-id'
import { QueryParties } from '@app/features/parties/resolver-queries/query-parties/parties.query'
import { LoadPartyLeader } from '@app/features/parties/loaders/leader'
import { DeputyRepository } from '@app/features/deputies'
import { PartyTypes } from '@app/features/parties/types'

export * from './party.repository'
export * from './party.repository-api'
export { QueryPartyByAcronym, QueryPartyById, QueryParties, LoadPartyLeader }

export default function PartyFeatures(partyRepository: PartyRepository, deputyRepository: DeputyRepository) {
  const queryPartyByAcronym = QueryPartyByAcronym(partyRepository)
  const queryPartyById = QueryPartyById(partyRepository)
  const queryParties = QueryParties(partyRepository)

  const loadLeader = LoadPartyLeader(deputyRepository)

  return {
    Types: {
      ...PartyTypes
    },
    Queries: {
      ...queryPartyByAcronym,
      ...queryPartyById,
      ...queryParties
    },
    Loaders: {
      Party: {
        ...loadLeader
      }
    }
  }
}
