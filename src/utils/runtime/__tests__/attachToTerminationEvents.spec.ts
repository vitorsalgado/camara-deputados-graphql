import { attachToTerminationEvents } from '../attachToTerminationEvents'

describe('attachToTerminationEvents', function () {
  it('should attach listener to process termination signals', function () {
    const spy = jest.fn()

    attachToTerminationEvents(spy)

    expect(process.listeners('SIGTERM')).toHaveLength(1)
    expect(process.listeners('SIGINT')).toHaveLength(1)
  })
})
