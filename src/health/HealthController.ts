import { Controller } from '@nestjs/common'
import { Get } from '@nestjs/common'
import { registry } from './metrics'

@Controller('health')
export class HealthController {
  @Get('ping')
  ping(): Promise<string> {
    return Promise.resolve('pong')
  }

  @Get('metrics')
  metrics(): Promise<string> {
    return registry.metrics()
  }
}
