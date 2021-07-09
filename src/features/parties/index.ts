import { QueryPartyByAcronym } from '@app/features/parties/resolver-queries/query-party-by-acronym'
import { PartyRepository } from '@app/features/parties/party.repository'
import { QueryPartyById } from '@app/features/parties/resolver-queries/query-party-by-id'
import { QueryParties } from '@app/features/parties/resolver-queries/query-parties'
import { LoadPartyLeader } from '@app/features/parties/loaders/leader'
import { DeputyRepository } from '@app/features/deputies'
import { PartyTypes } from '@app/features/parties/types'
import { applyLoader, applyQuery, Feature } from '@app/features/core'

export * from './party.repository'
export * from './party.repository-api'
export { QueryPartyByAcronym, QueryPartyById, QueryParties, LoadPartyLeader }

export default function PartyFeatures(partyRepository: PartyRepository, deputyRepository: DeputyRepository): Feature {
  const queryPartyByAcronym = new QueryPartyByAcronym(partyRepository)
  const queryPartyById = new QueryPartyById(partyRepository)
  const queryParties = new QueryParties(partyRepository)

  const loadLeader = new LoadPartyLeader(deputyRepository)

  return {
    Types: {
      ...PartyTypes
    },
    Queries: {
      partyByAcronym: applyQuery(queryPartyByAcronym),
      party: applyQuery(queryPartyById),
      parties: applyQuery(queryParties)
    },
    Loaders: {
      Party: {
        leader: applyLoader(loadLeader)
      }
    }
  }
}
