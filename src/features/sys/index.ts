import { FastifyInstance } from 'fastify'
import { SysRoutes } from '@app/features/sys/routes'

export default function configureSysRoutes(fastify: FastifyInstance): void {
  SysRoutes.buildAndRegister(fastify)
}
