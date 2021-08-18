import { Server } from 'http'
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import Mercurius from 'mercurius'
import { v4 as UUIDv4 } from 'uuid'
import FastifyHelmet from 'fastify-helmet'
import FastifyCors from 'fastify-cors'
import { GracefulShutdownPlugin } from './utils/shutdown/GracefulShutdownPlugin'
import { Configurations } from './config/Configurations'
import { buildGraphQLSchemas } from './buildGraphQLSchemas'
import { buildFeatures } from './buildFeatures'
import { Logger } from './utils/log/Logger'

const buildContext = async (_req: FastifyRequest, _reply: FastifyReply) => ({
  correlationId: UUIDv4()
})

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T

declare module 'mercurius' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface MercuriusContext extends PromiseType<ReturnType<typeof buildContext>> {}
}

export class GraphQLServer {
  private readonly fastify: FastifyInstance
  private readonly port: number
  private readonly host: string

  constructor(private readonly configurations: Configurations) {
    this.port = configurations.server.port
    this.host = configurations.server.host

    this.fastify = Fastify({ bodyLimit: 1048576 / 2, logger: this.configurations.server.loggerEnabled })
  }

  async build(): Promise<FastifyInstance> {
    const features = buildFeatures(this.fastify, this.configurations)
    const schemas = await buildGraphQLSchemas()

    const helmetOptions: Record<string, unknown> = {
      expectCt: true,
      frameguard: true,
      hidePoweredBy: true,
      hsts: true,
      noSniff: true,
      permittedCrossDomainPolicies: { permittedPolicies: 'none' },
      contentSecurityPolicy: { useDefaults: true }
    }

    if (this.configurations.graphql.graphiql) {
      this.fastify.get('/', async (request, reply) => reply.redirect('/graphiql'))

      helmetOptions.contentSecurityPolicy = {
        useDefaults: true,
        directives: {
          'script-src': ["'self' 'unsafe-eval' https://unpkg.com"],
          'style-src': ["'self' 'unsafe-inline' https://unpkg.com"]
        }
      }
    }

    this.fastify.register(FastifyHelmet, helmetOptions)
    this.fastify.register(FastifyCors, { origin: '*' })
    this.fastify.register(GracefulShutdownPlugin)
    this.fastify.register(Mercurius, {
      graphiql: this.configurations.graphql.graphiql,
      onlyPersisted: false,
      context: buildContext,
      schema: schemas,
      resolvers: features.Resolvers,
      loaders: features.Loaders
    })

    return this.fastify
  }

  server(): Server {
    return this.fastify.server
  }

  async start(): Promise<void> {
    await this.fastify.ready()

    return this.fastify.listen(this.port, this.host).then(addr => Logger.info(`server listening on: ${addr}`))
  }

  async buildAndStart(): Promise<FastifyInstance> {
    await this.build()
    await this.start()

    return this.fastify
  }

  async close(): Promise<void> {
    return this.fastify.close()
  }
}
