'use strict'

exports.config = {
  app_name: ['camara-deputados-graphql'],
  distributed_tracing: {
    enabled: true
  },
  logging: {
    enabled: false,
    level: 'error'
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*'
    ]
  }
}
