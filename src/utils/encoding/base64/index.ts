export const encode = (value: string): string => Buffer.from(value).toString('base64')

export const decode = (value: string): string => Buffer.from(value, 'base64').toString()
