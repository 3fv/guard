import 'jest'
import { guard,getValue, setGuardErrorHandler } from "../index"


function throwErr() {
	throw new Error('err')
}

test(`getValue`,() => {
	let errorHandled = false
	setGuardErrorHandler(() => errorHandled = true)
	expect(getValue(() => {
		throw new Error('err')
		// noinspection UnreachableCodeJS
		return 0
	}, 1)).toBe(1)
	expect(errorHandled).toBeTruthy()
	expect(getValue(throwErr)).toBeUndefined()
	expect(getValue(() => 123,1)).toBe(123)
	
	expect(getValue(() => true, false)).toBe(true)
})

test('guard',() => {
	expect(throwErr).toThrow()
	expect(() => guard(throwErr)).not.toThrow()
	
	const liftedGuard = guard.lift(throwErr)
	expect(typeof liftedGuard).toBe("function")
	expect(liftedGuard).not.toThrow()
})
