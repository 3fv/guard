export type TypeChecker<T> = (o:any) => o is T

export type ClassConstructor<T> = new (...args:any[]) => T
