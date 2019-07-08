export type Either<L, R> = Left<NonNullable<L>> | Right<NonNullable<R>>

export interface Right<R> {
  r: NonNullable<R>
}

export interface Left<L> {
  l: NonNullable<L>
}

export function isRight<L, R>(either: Either<L, R>): either is Right<NonNullable<R>> {
  return !!(either as Right<R>).r
}

export function isLeft<L, R>(either: Either<L, R>): either is Left<NonNullable<L>> {
  return !!(either as Left<L>).l
}
