import Path from 'path'

export const stubPath = (dir: string, file: string): string => Path.join(dir, '__fixtures__', file)
