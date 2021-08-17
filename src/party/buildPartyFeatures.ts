import { applyLoader } from '../base'
import { applyQuery } from '../base'
import { Features } from '../base'
import { DeputyRepository } from '../deputy/DeputyRepository'
import { PartiesOrderField } from './graphqltypes/PartiesOrderField'
import { leader } from './loaders/leader'
import { PartyRepository } from './PartyRepository'
import { partyByAcronym } from './query/partyByAcronym'
import { parties } from './query/parties'
import { party } from './query/party'

export function buildPartyFeatures(
  features: Features,
  partyRepository: PartyRepository,
  deputyRepository: DeputyRepository
): void {
  features.types = {
    ...features.types,
    PartiesOrderField
  }

  features.queries = {
    ...features.queries,
    partyByAcronym: applyQuery(partyByAcronym(partyRepository)),
    party: applyQuery(party(partyRepository)),
    parties: applyQuery(parties(partyRepository))
  }

  features.loaders = {
    ...features.loaders,
    Party: {
      leader: applyLoader(leader(deputyRepository))
    }
  }
}
