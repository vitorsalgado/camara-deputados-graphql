export const extractIdFromUri = (uri: string): string => uri.substring(uri.lastIndexOf('/') + 1, uri.length)
