import { FastifyInstance, FastifyServerOptions } from 'fastify'
import { RoutesRegister } from '@app/utils/base/route'

export class SysRoutes extends RoutesRegister {
  prefix = (): string => '/system'

  static buildAndRegister(fastify: FastifyInstance): void {
    new SysRoutes().register(fastify)
  }

  async routes(fastify: FastifyInstance, _options?: FastifyServerOptions): Promise<void> {
    fastify.get('/health', async (request, reply) => reply.status(204).send())
  }
}
