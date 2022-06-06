/**
 * @tsplus type effect/parser/Parser/PairTransformation
 */
export type PairTransformation = Zip | KeepFirst | KeepSecond | IgnoreFirstKeepSecond | IgnoreFirstWrapSecondAsRight

/**
 * @tsplus type effect/parser/Parser/PairTransformation.Ops
 */
export interface PairTransformationOps {}
export const PairTransformation: PairTransformationOps = {}

export class Zip {
  readonly _tag = "Zip"
  constructor(readonly zip: (a: unknown, b: unknown) => unknown) {}
}

export interface KeepFirst {
  readonly _tag: "KeepFirst"
}

export interface KeepSecond {
  readonly _tag: "KeepSecond"
}

export interface IgnoreFirstKeepSecond {
  readonly _tag: "IgnoreFirstKeepSecond"
}

export interface IgnoreFirstWrapSecondAsRight {
  readonly _tag: "IgnoreFirstWrapSecondAsRight"
}

/**
 * @tsplus static effect/parser/Parser/PairTransformation.Ops Zip
 */
export function zip(f: (a: unknown, b: unknown) => unknown) {
  return new Zip(f)
}

/**
 * @tsplus static effect/parser/Parser/PairTransformation.Ops KeepFirst
 */
export const keepFirst: PairTransformation = {
  _tag: "KeepFirst"
}

/**
 * @tsplus static effect/parser/Parser/PairTransformation.Ops KeepSecond
 */
export const keepSecond: PairTransformation = {
  _tag: "KeepSecond"
}

/**
 * @tsplus static effect/parser/Parser/PairTransformation.Ops IgnoreFirstKeepSecond
 */
export const ignoreFirstKeepSecond: PairTransformation = {
  _tag: "IgnoreFirstKeepSecond"
}

/**
 * @tsplus static effect/parser/Parser/PairTransformation.Ops IgnoreFirstWrapSecondAsRight
 */
export const ignoreFirstWrapSecondAsRight: PairTransformation = {
  _tag: "IgnoreFirstWrapSecondAsRight"
}
