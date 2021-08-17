import { createAndConnect } from '../createAndConnect'

describe('createAndConnect', function () {
  it('should connect to redis', async function () {
    const redis = createAndConnect({ redis: { connectionString: 'redis://fake' } } as any)

    redis.emit('connect')
    redis.emit('ready')
    redis.emit('error', new Error('test'))
    redis.emit('close')
    redis.emit('end')

    await redis.quit()
  })
})
