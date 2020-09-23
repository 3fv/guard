
function getFn(mod:any) {
	return !mod ? undefined : typeof mod === "function" ? mod : mod.default
}

const _isNil = getFn(require('lodash/isNil'))
const _isObject = getFn(require('lodash/isObject'))
const _isString = getFn(require('lodash/isString'))
const _isNumber = getFn(require('lodash/isNumber'))
const _isFunction = getFn(require('lodash/isFunction'))


export type UndefinedOrNull = undefined|null

export function isNil(o:any):o is UndefinedOrNull {
	return _isNil(o)
}

/**
 * O is a valid object
 *
 * @param o
 */
export function isDefined<T>(o:any):o is Exclude<T, UndefinedOrNull>
export function isDefined(o:any):o is Exclude<any,UndefinedOrNull>
export function isDefined(o:any) {
	return !isNil(o)
}

export function isObject(o:any):o is Object {
	return !isNil(o) && _isObject(o)
}

export function isPromise(o:any):o is Promise<any> {
	return !isNil(o) && isObject(o) && (o instanceof Promise || isFunction(o.then))
}


export function isObjectType<T>(o:any,type:{new():T}):o is T {
	return !isNil(o) && (o instanceof type || o.$$clazz === type.name)
}

export function isString(o:any):o is string {
	return !isNil(o) && _isString(o)
}

export function isNumber(o:any):o is number {
	return !isNil(o) && _isNumber(o) && !isNaN(o)
}

export function isFunction(o:any):o is Function {
	return !isNil(o) && _isFunction(o)
}

export function isSymbol(o:any):o is Symbol {
	return !isNil(o) && typeof o === 'symbol'
}

/**
 * Is ES6+ class
 *
 * @see https://stackoverflow.com/questions/29093396/how-do-you-check-the-difference-between-an-ecmascript-6-class-and-function/49510834
 *
 * @param {any} value
 * @returns {boolean}
 */
export function isNativeClass <T = any>(value:any): value is Constructor<T> {
	return typeof value === 'function' && value.toString().indexOf('class') === 0
}

// Character positions
const INDEX_OF_FUNCTION_NAME = 9  // "function X", X is at index 9
const FIRST_UPPERCASE_INDEX_IN_ASCII = 65  // A is at index 65 in ASCII
const LAST_UPPERCASE_INDEX_IN_ASCII = 90   // Z is at index 90 in ASCII

/**
 * Is Conventional Class
 * Looks for function with capital first letter MyClass
 * First letter is the 9th character
 * If changed, isClass must also be updated
 * @param {any} value
 * @returns {boolean}
 */
export function isConventionalClass <T = any>(value:any): value is Constructor<T> {
	if ( typeof value !== 'function' )  return false
	const c = value.toString().charCodeAt(INDEX_OF_FUNCTION_NAME)
	return c >= FIRST_UPPERCASE_INDEX_IN_ASCII && c <= LAST_UPPERCASE_INDEX_IN_ASCII
}


export function isClass<T = any>(value: any): value is Constructor<T> {
	return isNativeClass<T>(value) || isConventionalClass<T>(value)
}

export type TypeChecker<T> = (o:any) => o is T

export type Constructor<T> = new (...args:any[]) => T

export function createInstanceOfGuard<T, Ctor extends Constructor<T>>(ctor: Ctor): ((o: any) => o is T) {
	return (o: any): o is T => o instanceof (ctor as any)
}

export function createGenericGuard<T>(tester: (val:any) => val is T):TypeChecker<T>
export function createGenericGuard<T>(type:{new():T}, tester: (val:any) => val is T):TypeChecker<T>
export function createGenericGuard<T>(typeOrTest: ({new():T} | ((val:any) => val is T)), tester?: (val:any) => val is T) {
	return tester as TypeChecker<T>
}

export function toNumber(str:string|number):number {
	return isNumber(str) ? str : parseInt(str,10)
}


