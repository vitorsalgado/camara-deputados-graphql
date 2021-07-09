import { Server } from 'http'
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import Mercurius from 'mercurius'
import { v4 as UUIDv4 } from 'uuid'
import { Configurations } from '@app/config'
import { buildSchemas, configureRoutes, graphqlFeatures } from '@app/features'
import { GracefulShutdownPlugin } from '@app/srv/server.shutdown'
import Logger from '@app/utils/log'

const buildContext = async (_req: FastifyRequest, _reply: FastifyReply) => ({
  correlationId: UUIDv4()
})

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T

declare module 'mercurius' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface MercuriusContext extends PromiseType<ReturnType<typeof buildContext>> {}
}

export class AppServer {
  private readonly fastifyApp: FastifyInstance
  private readonly port: number
  private readonly host: string

  constructor(private readonly configurations: Configurations) {
    this.port = configurations.server.port
    this.host = configurations.server.host
    this.fastifyApp = Fastify<Server>({ logger: this.configurations.server.loggerEnabled })
  }

  build(): FastifyInstance {
    this.fastifyApp.register(GracefulShutdownPlugin)

    const features = graphqlFeatures(this.configurations)

    this.fastifyApp.register(Mercurius, {
      graphiql: this.configurations.graphql.graphiql,
      onlyPersisted: false,
      context: buildContext,
      schema: buildSchemas(),
      resolvers: features.Resolvers,
      loaders: features.Loaders
    })

    configureRoutes(this.fastifyApp)

    return this.fastifyApp
  }

  server(): Server {
    return this.fastifyApp.server
  }

  async start(): Promise<void> {
    await this.fastifyApp.ready()

    return this.fastifyApp
      .listen(this.port, this.host)
      .then(addr => Logger.info(`Server online on: ${addr}`))
      .catch(err => {
        Logger.error(err)
        process.exit(1)
      })
  }

  async buildAndStart(): Promise<FastifyInstance> {
    await this.build()
    await this.start()

    return this.fastifyApp
  }

  async close(): Promise<void> {
    return this.fastifyApp.close()
  }
}
