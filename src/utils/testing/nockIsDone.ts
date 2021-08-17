import Nock from 'nock'

export const nockIsDone = (nock: Nock.Scope | any): void => {
  const done = nock.isDone()

  if (!done) {
    // eslint-disable-next-line no-console
    console.log(nock.pendingMocks())
  }

  expect(done).toBeTruthy()
}
