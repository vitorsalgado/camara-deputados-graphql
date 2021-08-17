import { PartyRepository } from '../party/PartyRepository'
import { applyQuery } from '../base'
import { applyLoader } from '../base'
import { Features } from '../base'
import { deputies } from './query/deputies'
import { DeputyRepository } from './DeputyRepository'
import { party } from './loaders/party'

export function buildDeputyFeatures(
  features: Features,
  deputyRepository: DeputyRepository,
  partyRepository: PartyRepository
): void {
  features.queries = {
    ...features.queries,
    deputies: applyQuery(deputies(deputyRepository))
  }

  features.loaders = {
    ...features.loaders,
    Deputy: {
      party: applyLoader(party(partyRepository))
    }
  }
}
