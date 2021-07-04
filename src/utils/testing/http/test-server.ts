import Fastify, { FastifyInstance, FastifyServerOptions, HTTPMethods, RouteOptions } from 'fastify'
import { RouteBuilder } from '@app/utils/testing/http/test-route-builder'
import { Configurations } from '@app/config'
import { AppServer } from '@app/srv'

export class TestServer {
  private readonly fastify: FastifyInstance
  private addr!: string

  constructor(opts: FastifyServerOptions = { logger: false }) {
    this.fastify = Fastify(opts)
  }

  async start(port = 0): Promise<string> {
    await this.fastify.ready()
    this.addr = await this.fastify.listen(port)

    return this.addr
  }

  address(): string {
    if (!this.addr) {
      throw new TypeError('Attempt to get server address without starting it.')
    }

    return this.addr
  }

  close = (): FastifyInstance => this.fastify.close()

  setup(fn: (f: FastifyInstance) => void): this {
    fn(this.fastify)
    return this
  }

  addFastifyRoute(route: RouteOptions): this {
    this.fastify.route(route)
    return this
  }

  addRoute(routeBuilder: RouteBuilder): this {
    const route = routeBuilder.build()

    this.fastify.route({
      method: route.method as HTTPMethods,
      url: route.url,
      handler: async (request, reply) => {
        reply.status(route.response.status).headers(route.response.headers).send(route.response.body)
      }
    })

    return this
  }
}

export function newApplicationServerInstance(
  configurations: Configurations,
  mockAddr: string,
  mockLog: boolean = false
): AppServer {
  configurations.api.congress.url = mockAddr
  configurations.api.congress.loggerEnabled = mockLog
  configurations.server.port = 0
  configurations.server.host = '127.0.0.1'

  return new AppServer(configurations)
}
