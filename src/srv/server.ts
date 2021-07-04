import { Server } from 'http'
import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import Mercurius from 'mercurius'
import { Configurations } from '@app/config'
import { buildSchemas, configureRoutes, graphqlFeatures } from '@app/features'
import { GracefulShutdownPlugin } from '@app/srv/server.shutdown'
import Logger from '@app/utils/log'

export class AppServer {
  private fastifyApp!: FastifyInstance
  private readonly port: number
  private readonly host: string

  constructor(private readonly configurations: Configurations) {
    this.port = configurations.server.port
    this.host = configurations.server.host
  }

  build(opts?: FastifyServerOptions): FastifyInstance {
    this.fastifyApp = Fastify<Server>({ logger: false, ...opts })
    this.fastifyApp.register(GracefulShutdownPlugin)

    const features = graphqlFeatures(this.configurations)

    this.fastifyApp.register(Mercurius, {
      graphiql: this.configurations.gql.playground,
      schema: buildSchemas(),
      resolvers: features.Resolvers,
      loaders: features.Loaders
    })

    configureRoutes(this.fastifyApp)

    return this.fastifyApp
  }

  server = (): Server => this.fastifyApp.server

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

  async buildAndStart(opts?: FastifyServerOptions): Promise<FastifyInstance> {
    await this.build(opts)
    await this.start()

    return this.fastifyApp
  }

  async close(): Promise<void> {
    await this.fastifyApp.close()
  }
}
