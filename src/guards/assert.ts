import { isFunction } from "./primitive"

export interface AssertOptions {
  logErrorsToConsole: boolean
}

export const DefaultAssertOptions:AssertOptions = {
  logErrorsToConsole: false
}

let assertOptions:AssertOptions = {...DefaultAssertOptions}

export function getAssertOptions() {
  return {...assertOptions}
}

export function setGlobalAssertOptions(options: AssertOptions) {
  assertOptions = {...assertOptions, ...options}
}

export class AssertError extends Error {
  
  
  
  constructor(message: string,  public readonly cause?: Error) {
    super(message)
  }
}


export function assert(
  test: (() => boolean) | boolean,
  msg?: null | ((err?: Error) => string) | string | undefined,
  overrideOptions: Partial<AssertOptions> = {}
): void | never {
  const options = {...assertOptions, ...overrideOptions}
  let result: boolean = false
  let error: Error = undefined
  
  try {
    result = isFunction(test) ? test() : test
  } catch (err) {
    error = err
    if (options.logErrorsToConsole) {
      console.error(`Assert failed: "${test}"`, err)
    }
  }
  
  
  
  if (!result || !!error) {
    const text = !msg ? (error?.message ?? "unknown") :
      isFunction(msg) ? msg(error) :
        msg
    throw new AssertError(text, error)
  }
}
