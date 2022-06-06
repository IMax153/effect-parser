import type { BashArithmeticExpression } from "@effect/parser/test/examples/bash/BashArithmeticExpression"
import type { BashArrayIndex } from "@effect/parser/test/examples/bash/BashArrayIndex"
import type { BashCondition } from "@effect/parser/test/examples/bash/BashCondition"
import type { BashStatement } from "@effect/parser/test/examples/bash/BashStatement"
import type { BashVariable } from "@effect/parser/test/examples/bash/BashVariable"

/**
 * @tsplus type effect/parser/test/BashExpression
 */
export type BashExpression =
  | Literal
  | ReadVariable
  | ReadArray
  | Eval
  | Conditional
  | Interpolated
  | EvalArithmetic
  | True
  | False
  | And
  | Or

/**
 * @tsplus type effect/parser/test/BashExpression.Ops
 */
export interface BashExpressionOps {}
export const BashExpression: BashExpressionOps = {}

export interface Literal extends Case {
  readonly _tag: "Literal"
  readonly literal: string
}

/**
 * @tsplus static effect/parser/test/BashExpression.Ops Literal
 */
export const Literal = Case.tagged<Literal>("Literal")

export interface ReadVariable extends Case {
  readonly _tag: "ReadVariable"
  readonly variable: BashVariable
}

/**
 * @tsplus static effect/parser/test/BashExpression.Ops ReadVariable
 */
export const ReadVariable = Case.tagged<ReadVariable>("ReadVariable")

export interface ReadArray extends Case {
  readonly _tag: "ReadArray"
  readonly variable: BashVariable
  readonly index: BashArrayIndex
}

/**
 * @tsplus static effect/parser/test/BashExpression.Ops ReadArray
 */
export const ReadArray = Case.tagged<ReadArray>("ReadArray")

export interface Eval extends Case {
  readonly _tag: "Eval"
  readonly statement: BashStatement
}

/**
 * @tsplus static effect/parser/test/BashExpression.Ops Eval
 */
export const Eval = Case.tagged<Eval>("Eval")

export interface Conditional extends Case {
  readonly _tag: "Conditional"
  readonly condition: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashExpression.Ops Conditional
 */
export const Conditional = Case.tagged<Conditional>("Conditional")

export interface Interpolated extends Case {
  readonly _tag: "Interpolated"
  readonly parts: List<BashExpression>
}

/**
 * @tsplus static effect/parser/test/BashExpression.Ops Interpolated
 */
export const Interpolated = Case.tagged<Interpolated>("Interpolated")

export interface EvalArithmetic extends Case {
  readonly _tag: "EvalArithmetic"
  readonly expression: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashExpression.Ops EvalArithmetic
 */
export const EvalArithmetic = Case.tagged<EvalArithmetic>("EvalArithmetic")

export interface True extends Case {
  readonly _tag: "True"
}

/**
 * @tsplus static effect/parser/test/BashExpression.Ops True
 */
export const True = Case.tagged<True>("True")

export interface False extends Case {
  readonly _tag: "False"
}

/**
 * @tsplus static effect/parser/test/BashExpression.Ops False
 */
export const False = Case.tagged<False>("False")

export interface And extends Case {
  readonly _tag: "And"
  readonly a: BashExpression
  readonly b: BashExpression
}

/**
 * @tsplus static effect/parser/test/BashExpression.Ops And
 */
export const And = Case.tagged<And>("And")

export interface Or extends Case {
  readonly _tag: "Or"
  readonly a: BashExpression
  readonly b: BashExpression
}

/**
 * @tsplus static effect/parser/test/BashExpression.Ops Or
 */
export const Or = Case.tagged<Or>("Or")
