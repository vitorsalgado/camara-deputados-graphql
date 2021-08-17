describe('Logger', function () {
  describe('when NODE_ENV is test', function () {
    it('should init silent', async function () {
      const module = await import('../Logger')

      module.Logger.trace('hey')
    })
  })

  describe('when NODE_ENV is not test nad PRETTY is off', function () {
    it('should init with level equal to LOG_LEVEL env', async function () {
      process.env.NODE_ENV = 'no-test'
      process.env.LOG_LEVEL = 'trace'
      process.env.LOG_PRETTY = 'false'

      const module = await import('../Logger')

      module.Logger.trace('hey')
    })
  })
})
