import { Server } from 'http'
import Fastify from 'fastify'
import { GracefulShutdownPlugin } from '../GracefulShutdownPlugin'
import { gracefullyShutdown } from '../GracefulShutdownPlugin'

describe('GracefulShutdownPlugin', function () {
  const fastify = Fastify<Server>({ logger: false })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  process.exit = jest.fn()

  it('should init shutdown plugin and attach to termination signal events', async function () {
    process.on = jest.fn()

    await GracefulShutdownPlugin(fastify, { timeout: 5000 })

    expect(process.on).toHaveBeenCalledTimes(3)
  })

  describe('when server takes longer than the timeout', function () {
    it('should exit before respecting the timeout and with exit code 1', async function () {
      fastify.close = jest.fn().mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 2000)))

      await gracefullyShutdown(fastify, { timeout: 500 })('SIGINT')

      expect(process.exit).toHaveBeenCalledWith(1)
    })
  })

  describe('when server closes fast', function () {
    it('should exit with 0 and no errors', async function () {
      await gracefullyShutdown(fastify, { timeout: 2000 })('SIGINT')

      expect(process.exit).toHaveBeenCalledWith(0)
    })
  })
})
