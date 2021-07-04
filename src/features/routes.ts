import { FastifyInstance } from 'fastify'
import { Server } from 'http'
import configureSysRoutes from '@app/features/sys'

export function configureRoutes(fastify: FastifyInstance<Server>): void {
  configureSysRoutes(fastify)
}
