
import { isNil } from "./Guards"

export type GuardErrorHandler = (err:Error) => void

let guardErrorHandler_:GuardErrorHandler | null

export function setGuardErrorHandler(guardErrorHandler:GuardErrorHandler | null = null) {
	guardErrorHandler_ = guardErrorHandler
}

/**
 * Get a value in a guarded fashion
 * ensuring no exception
 *
 * @param fn
 * @param defaultValue
 * @returns {any}
 */
export function getValue<T>(fn:() => T,defaultValue:T = null):T {
	let
		result
	
	try {
		result = fn()
	} catch (err) {
		guardErrorHandler_ && guardErrorHandler_(err)
	}
	
	if (isNil(result))
		result = defaultValue
	
	return result
}


/**
 * Execute a function guarded from exception
 *
 * @param fn
 * @returns {(fn:()=>any)=>(fn:()=>any)=>any}
 */
export function guard(fn:() => any) {
	try {
		fn()
	} catch (err) {
		guardErrorHandler_ && guardErrorHandler_(err)
	}
}