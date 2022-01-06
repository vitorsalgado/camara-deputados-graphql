import { NestFactory } from '@nestjs/core'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { AppModule } from './AppModule'

async function bootstrap() {
  return NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter()).then(app => {
    app.enableShutdownHooks()

    return app.listen(3000)
  })
}

;(async () => await bootstrap())()
