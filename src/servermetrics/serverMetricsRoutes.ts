import { FastifyInstance } from 'fastify'
import PrometheusClient from 'prom-client'

const registry = new PrometheusClient.Registry()

registry.setDefaultLabels({ app: 'camara-deputados-graphql' })
PrometheusClient.collectDefaultMetrics({ register: registry })

const httpRequestDurationMicroseconds = new PrometheusClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
})

registry.registerMetric(httpRequestDurationMicroseconds)

export function serverMetricsRoutes(fastify: FastifyInstance): void {
  fastify.get('/live', async (request, reply) => reply.status(204).send())

  fastify.get('/metrics', async (request, reply) =>
    reply.header('content-type', registry.contentType).send(await registry.metrics())
  )
}
