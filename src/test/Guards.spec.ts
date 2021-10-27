import 'jest'
import { isArray,isNil,isNumber,isString } from "../index"


test(`isNil`,() => {
	expect(isNil(null)).toBeTruthy()
	expect(isNil(undefined)).toBeTruthy()
	expect(isNil(1)).toBeFalsy()
})

test(`isNumber`,() => {
	expect(isNumber(1)).toBeTruthy()
	expect(isNumber("1")).toBeFalsy()
})

test(`isString`,() => {
	expect(isString(1)).toBeFalsy()
	expect(isString("1")).toBeTruthy()
})

test(`isArray`,() => {
	expect(isArray(1)).toBeFalsy()
	expect(isArray("1")).toBeFalsy()
	expect(isArray(["1",2])).toBeTruthy()
})

test(`instanceOf`, () => {
	class Test1 {}

	class Test2 extends Test1 {}


	let a = new Test1()
	let b = new Test2()
	expect(a).toBeInstanceOf(Test1)
	expect(a).not.toBeInstanceOf(Test2)

	expect(b).toBeInstanceOf(Test1)
	expect(b).toBeInstanceOf(Test2)

})