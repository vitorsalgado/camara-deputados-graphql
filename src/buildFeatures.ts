import { FastifyInstance } from 'fastify'
import { PartyApiRepository } from './party/PartyApiRepository'
import { DeputyApiRepository } from './deputy/DeputyApiRepository'
import { buildDeputyFeatures } from './deputy/buildDeputyFeatures'
import { buildPartyFeatures } from './party/buildPartyFeatures'
import { buildCongressApi } from './congressapi/buildCongressApi'
import { Configurations } from './config/Configurations'
import { Cursor } from './utils/graphql/scalars/Cursor'
import { serverMetricsRoutes } from './servermetrics/serverMetricsRoutes'
import { Features } from './base'

export function buildFeatures(fastify: FastifyInstance, configurations: Configurations): any {
  // Shared Deps
  const congressApi = buildCongressApi(configurations)
  const partyRepository = new PartyApiRepository(congressApi)
  const deputyRepository = new DeputyApiRepository(congressApi)

  const features: Features = {}

  // Routes
  serverMetricsRoutes(fastify)

  // GraphQL Features
  buildDeputyFeatures(features, deputyRepository, partyRepository)
  buildPartyFeatures(features, partyRepository, deputyRepository)

  return {
    Resolvers: {
      Query: { ...features.queries },
      ...features.types,
      Cursor
    },
    Loaders: { ...features.loaders }
  }
}
