/**
 * Spy function. Useful when you need to debug a .map function
 */
export const peek =
  <T>(fn: (arg: T) => void) =>
  (x: T): T => {
    fn(x)

    return x
  }
