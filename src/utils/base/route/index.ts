import { FastifyInstance, FastifyServerOptions } from 'fastify'

export abstract class RoutesRegister {
  abstract prefix(): string

  abstract routes(fastify: FastifyInstance, options?: FastifyServerOptions): Promise<void>

  register(fastify: FastifyInstance): void {
    fastify.register(this.routes, { prefix: this.prefix() })
  }
}
