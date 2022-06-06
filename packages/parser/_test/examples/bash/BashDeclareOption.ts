/**
 * @tsplus type effect/parser/test/BashDeclareOption
 */
export type BashDeclareOption = Array | ReadOnly

/**
 * @tsplus type effect/parser/test/BashDeclareOption.Ops
 */
export interface BashDeclareOptionOps {}
export const BashDeclareOption: BashDeclareOptionOps = {}

export interface Array extends Case {
  readonly _tag: "Array"
}

/**
 * @tsplus static effect/parser/test/BashDeclareOption.Ops Array
 */
export const Array = Case.tagged<Array>("Array")

export interface ReadOnly extends Case {
  readonly _tag: "ReadOnly"
}

/**
 * @tsplus static effect/parser/test/BashDeclareOption.Ops ReadOnly
 */
export const ReadOnly = Case.tagged<ReadOnly>("ReadOnly")
