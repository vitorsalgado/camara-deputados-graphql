import { FastifyInstance } from 'fastify'

export function serverMetricsRoutes(fastify: FastifyInstance): void {
  fastify.get('/health', async (request, reply) => reply.status(204).send())
}
