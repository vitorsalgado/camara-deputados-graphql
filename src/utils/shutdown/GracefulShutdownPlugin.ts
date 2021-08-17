import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { Logger } from '../log/Logger'

type FastifyGracefulExitOptions = {
  timeout: number
}

export const GracefulShutdownPlugin: FastifyPluginAsync<FastifyGracefulExitOptions> = async (
  fastify,
  options
): Promise<void> => {
  const shutdown = gracefullyShutdown(fastify, options)

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)

  // Nodemon signal
  process.on('SIGUSR2', shutdown)
}

export function gracefullyShutdown(
  fastify: FastifyInstance,
  options: FastifyGracefulExitOptions
): (signal: string) => Promise<void> {
  return async function (signal: string): Promise<void> {
    Logger.warn(`Server is shutting down after receiving the signal: ${signal}`)

    const timeout = setTimeout(() => {
      Logger.warn('Graceful shutdown failed. Exiting process.')
      process.exit(1)
    }, options.timeout)

    await fastify.close()

    clearTimeout(timeout)

    process.exit(0)
  }
}
