import Fs from 'fs'
import Path from 'path'

export const stub = (stub: string): any => JSON.parse(Fs.readFileSync(Path.resolve(stub)).toString())
