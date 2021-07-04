export const allOf =
  <T>(...fns: Array<(...a: T[]) => boolean>) =>
  (...args: T[]) =>
    fns.every(f => f(...args))
