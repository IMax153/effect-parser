import type { BashExpression } from "@effect/parser/test/examples/bash/BashExpression"

/**
 * @tsplus type effect/parser/test/BashArrayIndex
 */
export type BashArrayIndex = Index | All

/**
 * @tsplus type effect/parser/test/BashArrayIndex.Ops
 */
export interface BashArrayIndexOps {}
export const BashArrayIndex: BashArrayIndexOps = {}

export interface Index extends Case {
  readonly _tag: "Index"
  readonly index: BashExpression
}

/**
 * @tsplus static effect/parser/test/BashArrayIndex.Ops Index
 */
export const Index = Case.tagged<Index>("Index")

export interface All extends Case {
  readonly _tag: "All"
}

/**
 * @tsplus static effect/parser/test/BashArrayIndex.Ops All
 */
export const All = Case.tagged<All>("All")
