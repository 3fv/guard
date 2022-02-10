export type TypeGuard<T> = (o:any) => o is T

export type ClassConstructor<T> = new (...args:any[]) => T

export type ConstantGuardFn<T> = () => boolean

export type TypeGuardExtras<T> = TypeGuard<T> & {
  constant: (o:any) => ConstantGuardFn<T>
}