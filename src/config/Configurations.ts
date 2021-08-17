export interface Configurations {
  runtime: {
    isTest: boolean
  }

  log: {
    level: string
    pretty: boolean
  }

  server: {
    port: number
    host: string
    loggerEnabled: boolean
  }

  api: {
    congress: {
      url: string
      loggerEnabled: boolean
    }
  }

  graphql: {
    graphiql: boolean | string
  }

  cache: {
    strategy: string
  }

  redis: {
    connectionString: string
  }
}
