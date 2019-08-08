// const logLevel = 0

export function getLogger(caller: string) {

  return {
    debug: (...args: any) => console.log(caller, ...args),
    info: (...args: any) => console.info(caller, ...args),
    warn: (...args: any) => console.warn(caller, ...args),
    error: (...args: any) => console.error(caller, ...args),
  }
}