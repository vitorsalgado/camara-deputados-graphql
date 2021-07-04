import * as Fs from 'fs'
import * as Path from 'path'

export const stubPath = (dir: string, file: string): string => Path.join(dir, '__fixtures__', file)

export const stub = (stub: string): any => JSON.parse(Fs.readFileSync(Path.resolve(stub)).toString())

export const contains =
  (field: string, value: string): ((query: any) => boolean) =>
  (data: any): boolean =>
    data[field] === value

export const nockIsDone = (nock: any): void => {
  const done = nock.isDone()

  if (done) return

  // eslint-disable-next-line no-console
  console.log(nock.pendingMocks())

  expect(done).toBeTruthy()
}
