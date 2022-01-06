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

export { registry }
