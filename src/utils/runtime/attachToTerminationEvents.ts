export function attachToTerminationEvents(listener: () => void): void {
  process.on('SIGTERM', listener)
  process.on('SIGINT', listener)
}
