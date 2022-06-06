import type { BashVariable } from "@effect/parser/test/examples/bash/BashVariable"

/**
 * @tsplus type effect/parser/test/BashArithmeticExpression
 */
export type BashArithmeticExpression =
  | Number
  | Variable
  | PostIncrement
  | PostDecrement
  | PreIncrement
  | PreDecrement
  | Minus
  | Plus
  | LogicalNot
  | BitwiseNot
  | Exponentiation
  | Add
  | Sub
  | Mul
  | Div
  | Rem
  | BitwiseLeftShift
  | BitwiseRightShift
  | LessEq
  | Less
  | GreaterEq
  | Greater
  | Equal
  | NotEqual
  | BitwiseAnd
  | BitwiseXor
  | BitwiseOr
  | LogicalAnd
  | LogicalOr
  | Conditional
  | Assign
  | AssignMul
  | AssignDiv
  | AssignRem
  | AssignAdd
  | AssignSub
  | AssignShiftLeft
  | AssignShiftRight
  | AssignAnd
  | AssignOr
  | AssignXor
  | Comma

/**
 * @tsplus type effect/parser/test/BashArithmeticExpression.Ops
 */
export interface BashArithmeticExpressionOps {}
export const BashArithmeticExpression: BashArithmeticExpressionOps = {}

/**
 * ```bash
 * n
 * ```
 */
export interface Number extends Case {
  readonly _tag: "Number"
  readonly value: number
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Number
 */
export const Number = Case.tagged<Number>("Number")

/**
 * ```bash
 * $X
 * ```
 */
export interface Variable extends Case {
  readonly _tag: "Variable"
  readonly variable: BashVariable
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Variable
 */
export const Variable = Case.tagged<Variable>("Variable")

/**
 * ```bash
 * x++
 * ```
 */
export interface PostIncrement extends Case {
  readonly _tag: "PostIncrement"
  readonly x: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops PostIncrement
 */
export const PostIncrement = Case.tagged<PostIncrement>("PostIncrement")

/**
 * ```bash
 * x--
 * ```
 */
export interface PostDecrement extends Case {
  readonly _tag: "PostDecrement"
  readonly x: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops PostDecrement
 */
export const PostDecrement = Case.tagged<PostDecrement>("PostDecrement")

/**
 * ```bash
 * ++x
 * ```
 */
export interface PreIncrement extends Case {
  readonly _tag: "PreIncrement"
  readonly x: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops PreIncrement
 */
export const PreIncrement = Case.tagged<PreIncrement>("PreIncrement")

/**
 * ```bash
 * --x
 * ```
 */
export interface PreDecrement extends Case {
  readonly _tag: "PreDecrement"
  readonly x: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops PreDecrement
 */
export const PreDecrement = Case.tagged<PreDecrement>("PreDecrement")

/**
 * ```bash
 * -x
 * ```
 */
export interface Minus extends Case {
  readonly _tag: "Minus"
  readonly x: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Minus
 */
export const Minus = Case.tagged<Minus>("Minus")

/**
 * ```bash
 * +x
 * ```
 */
export interface Plus extends Case {
  readonly _tag: "Plus"
  readonly x: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Plus
 */
export const Plus = Case.tagged<Plus>("Plus")

/**
 * ```bash
 * !x
 * ```
 */
export interface LogicalNot extends Case {
  readonly _tag: "LogicalNot"
  readonly x: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops LogicalNot
 */
export const LogicalNot = Case.tagged<LogicalNot>("LogicalNot")

/**
 * ```bash
 * ~x
 * ```
 */
export interface BitwiseNot extends Case {
  readonly _tag: "BitwiseNot"
  readonly x: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops BitwiseNot
 */
export const BitwiseNot = Case.tagged<BitwiseNot>("BitwiseNot")

/**
 * ```bash
 * x ** y
 * ```
 */
export interface Exponentiation extends Case {
  readonly _tag: "Exponentiation"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Exponentiation
 */
export const Exponentiation = Case.tagged<Exponentiation>("Exponentiation")

/**
 * ```bash
 * x + y
 * ```
 */
export interface Add extends Case {
  readonly _tag: "Add"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Add
 */
export const Add = Case.tagged<Add>("Add")

/**
 * ```bash
 * x - y
 * ```
 */
export interface Sub extends Case {
  readonly _tag: "Sub"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Sub
 */
export const Sub = Case.tagged<Sub>("Sub")

/** * ```bash
 * x * y
 * ```
 */
export interface Mul extends Case {
  readonly _tag: "Mul"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Mul
 */
export const Mul = Case.tagged<Mul>("Mul")

/**
 * ```bash
 * x / y
 * ```
 */
export interface Div extends Case {
  readonly _tag: "Div"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Div
 */
export const Div = Case.tagged<Div>("Div")

/**
 * ```bash
 * x % y
 * ```
 */
export interface Rem extends Case {
  readonly _tag: "Rem"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Rem
 */
export const Rem = Case.tagged<Rem>("Rem")

/**
 * ```bash
 * x << y
 * ```
 */
export interface BitwiseLeftShift extends Case {
  readonly _tag: "BitwiseLeftShift"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops BitwiseLeftShift
 */
export const BitwiseLeftShift = Case.tagged<BitwiseLeftShift>("BitwiseLeftShift")

/**
 * ```bash
 * x >> y
 * ```
 */
export interface BitwiseRightShift extends Case {
  readonly _tag: "BitwiseRightShift"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops BitwiseRightShift
 */
export const BitwiseRightShift = Case.tagged<BitwiseRightShift>("BitwiseRightShift")

/**
 * ```bash
 * x <= y
 * ```
 */
export interface LessEq extends Case {
  readonly _tag: "LessEq"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops LessEq
 */
export const LessEq = Case.tagged<LessEq>("LessEq")

/**
 * ```bash
 * x < y
 * ```
 */
export interface Less extends Case {
  readonly _tag: "Less"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Less
 */
export const Less = Case.tagged<Less>("Less")

/**
 * ```bash
 * x >= y
 * ```
 */
export interface GreaterEq extends Case {
  readonly _tag: "GreaterEq"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops GreaterEq
 */
export const GreaterEq = Case.tagged<GreaterEq>("GreaterEq")

/**
 * ```bash
 * x > y
 * ```
 */
export interface Greater extends Case {
  readonly _tag: "Greater"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Greater
 */
export const Greater = Case.tagged<Greater>("Greater")

/**
 * ```bash
 * x == y
 * ```
 */
export interface Equal extends Case {
  readonly _tag: "Equal"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Equal
 */
export const Equal = Case.tagged<Equal>("Equal")

/**
 * ```bash
 * x != y
 * ```
 */
export interface NotEqual extends Case {
  readonly _tag: "NotEqual"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops NotEqual
 */
export const NotEqual = Case.tagged<NotEqual>("NotEqual")

/**
 * ```bash
 * x & y
 * ```
 */
export interface BitwiseAnd extends Case {
  readonly _tag: "BitwiseAnd"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops BitwiseAnd
 */
export const BitwiseAnd = Case.tagged<BitwiseAnd>("BitwiseAnd")

/**
 * ```bash
 * x ^ y
 * ```
 */
export interface BitwiseXor extends Case {
  readonly _tag: "BitwiseXor"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops BitwiseXor
 */
export const BitwiseXor = Case.tagged<BitwiseXor>("BitwiseXor")

/**
 * ```bash
 * x | y
 * ```
 */
export interface BitwiseOr extends Case {
  readonly _tag: "BitwiseOr"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops BitwiseOr
 */
export const BitwiseOr = Case.tagged<BitwiseOr>("BitwiseOr")

/**
 * ```bash
 * x && y
 * ```
 */
export interface LogicalAnd extends Case {
  readonly _tag: "LogicalAnd"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops LogicalAnd
 */
export const LogicalAnd = Case.tagged<LogicalAnd>("LogicalAnd")

/**
 * ```bash
 * x || y
 * ```
 */
export interface LogicalOr extends Case {
  readonly _tag: "LogicalOr"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops LogicalOr
 */
export const LogicalOr = Case.tagged<LogicalOr>("LogicalOr")

/**
 * ```bash
 * condition ? trueCase : falseCase
 * ```
 */
export interface Conditional extends Case {
  readonly _tag: "Conditional"
  readonly condition: BashArithmeticExpression
  readonly trueCase: BashArithmeticExpression
  readonly falseCase: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Conditional
 */
export const Conditional = Case.tagged<Conditional>("Conditional")

/**
 * ```bash
 * x = y
 * ```
 */
export interface Assign extends Case {
  readonly _tag: "Assign"
  readonly x: BashVariable
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Assign
 */
export const Assign = Case.tagged<Assign>("Assign")

/**
 * ```bash
 * x *= y
 * ```
 */
export interface AssignMul extends Case {
  readonly _tag: "AssignMul"
  readonly x: BashVariable
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops AssignMul
 */
export const AssignMul = Case.tagged<AssignMul>("AssignMul")

/**
 * ```bash
 * x /= y
 * ```
 */
export interface AssignDiv extends Case {
  readonly _tag: "AssignDiv"
  readonly x: BashVariable
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops AssignDiv
 */
export const AssignDiv = Case.tagged<AssignDiv>("AssignDiv")

/**
 * ```bash
 * x %= y
 * ```
 */
export interface AssignRem extends Case {
  readonly _tag: "AssignRem"
  readonly x: BashVariable
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops AssignRem
 */
export const AssignRem = Case.tagged<AssignRem>("AssignRem")

/**
 * ```bash
 * x += y
 * ```
 */
export interface AssignAdd extends Case {
  readonly _tag: "AssignAdd"
  readonly x: BashVariable
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops AssignAdd
 */
export const AssignAdd = Case.tagged<AssignAdd>("AssignAdd")

/**
 * ```bash
 * x -= y
 * ```
 */
export interface AssignSub extends Case {
  readonly _tag: "AssignSub"
  readonly x: BashVariable
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops AssignSub
 */
export const AssignSub = Case.tagged<AssignSub>("AssignSub")

/** * ```bash
 * x <<= y
 * ```
 */
export interface AssignShiftLeft extends Case {
  readonly _tag: "AssignShiftLeft"
  readonly x: BashVariable
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops AssignShiftLeft
 */
export const AssignShiftLeft = Case.tagged<AssignShiftLeft>("AssignShiftLeft")

/**
 * ```bash
 * x >>= y
 * ```
 */
export interface AssignShiftRight extends Case {
  readonly _tag: "AssignShiftRight"
  readonly x: BashVariable
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops AssignShiftRight
 */
export const AssignShiftRight = Case.tagged<AssignShiftRight>("AssignShiftRight")

/**
 * ```bash
 * x &= y
 * ```
 */
export interface AssignAnd extends Case {
  readonly _tag: "AssignAnd"
  readonly x: BashVariable
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops AssignAnd
 */
export const AssignAnd = Case.tagged<AssignAnd>("AssignAnd")

/**
 * ```bash
 * x |= y
 * ```
 */
export interface AssignOr extends Case {
  readonly _tag: "AssignOr"
  readonly x: BashVariable
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops AssignOr
 */
export const AssignOr = Case.tagged<AssignOr>("AssignOr")

/**
 * ```bash
 * x ^= y
 * ```
 */
export interface AssignXor extends Case {
  readonly _tag: "AssignXor"
  readonly x: BashVariable
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops AssignXor
 */
export const AssignXor = Case.tagged<AssignXor>("AssignXor")

/**
 * ```bash
 * x, y
 * ```
 */
export interface Comma extends Case {
  readonly _tag: "Comma"
  readonly x: BashArithmeticExpression
  readonly y: BashArithmeticExpression
}

/**
 * @tsplus static effect/parser/test/BashArithmeticExpression.Ops Comma
 */
export const Comma = Case.tagged<Comma>("Comma")
