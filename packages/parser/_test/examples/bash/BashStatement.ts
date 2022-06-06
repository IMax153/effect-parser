import type { BashArithmeticExpression } from "@effect/parser/test/examples/bash/BashArithmeticExpression"
import type { BashDeclareOption } from "@effect/parser/test/examples/bash/BashDeclareOption"
import type { BashExpression } from "@effect/parser/test/examples/bash/BashExpression"
import type { BashIdentifier } from "@effect/parser/test/examples/bash/BashIdentifier"

/**
 * @tsplus type effect/parser/test/BashStatement
 */
export type BashStatement =
  | Noop
  | Assign
  | Command
  | IfThenElse
  | Declare
  | Local
  | Let
  | Function
  | Eval
  | ArrayUpdate
  | While
  | Sequence

/**
 * @tsplus type effect/parser/test/BashStatement.Ops
 */
export interface BashStatementOps {}
export const BashStatement: BashStatementOps = {}

export interface Noop extends Case {
  readonly _tag: "Noop"
}

/**
 * @tsplus static effect/parser/test/BashStatement.Ops Noop
 */
export const Noop = Case.tagged<Noop>("Noop")

export interface Assign extends Case {
  readonly _tag: "Assign"
  readonly target: BashIdentifier
  readonly expression: BashExpression
}

/**
 * @tsplus static effect/parser/test/BashStatement.Ops Assign
 */
export const Assign = Case.tagged<Assign>("Assign")

export interface Command extends Case {
  readonly _tag: "Command"
  readonly name: BashExpression
  readonly params: List<BashExpression>
  readonly hereString: Option<BashExpression>
}

/**
 * @tsplus static effect/parser/test/BashStatement.Ops Command
 */
export const Command = Case.tagged<Command>("Command")

export interface IfThenElse extends Case {
  readonly _tag: "IfThenElse"
  readonly conditional: BashExpression
  readonly onTrue: BashStatement
  readonly onFalse: BashStatement
}

/**
 * @tsplus static effect/parser/test/BashStatement.Ops IfThenElse
 */
export const IfThenElse = Case.tagged<IfThenElse>("IfThenElse")

export interface Declare extends Case {
  readonly _tag: "Declare"
  readonly options: HashSet<BashDeclareOption>
  readonly name: BashIdentifier
  readonly initialValue: Option<BashExpression>
}

/**
 * @tsplus static effect/parser/test/BashStatement.Ops Declare
 */
export const Declare = Case.tagged<Declare>("Declare")

export interface Local extends Case {
  readonly _tag: "Local"
  readonly options: HashSet<BashDeclareOption>
  readonly name: BashIdentifier
  readonly initialValue: Option<BashExpression>
}

/**
 * @tsplus static effect/parser/test/BashStatement.Ops Local
 */
export const Local = Case.tagged<Local>("Local")

export interface Let extends Case {
  readonly _tag: "Let"
  readonly expression: List<BashArithmeticExpression>
}

/**
 * @tsplus static effect/parser/test/BashStatement.Ops Let
 */
export const Let = Case.tagged<Let>("Let")

export interface Function extends Case {
  readonly _tag: "Function"
  readonly name: BashIdentifier
  readonly body: BashStatement
}

/**
 * @tsplus static effect/parser/test/BashStatement.Ops Function
 */
export const Function = Case.tagged<Function>("Function")

export interface Eval extends Case {
  readonly _tag: "Eval"
  readonly statement: BashStatement
}

/**
 * @tsplus static effect/parser/test/BashStatement.Ops Eval
 */
export const Eval = Case.tagged<Eval>("Eval")

export interface ArrayUpdate extends Case {
  readonly _tag: "ArrayUpdate"
  readonly target: BashIdentifier
  readonly index: BashExpression
  readonly value: BashExpression
}

/**
 * @tsplus static effect/parser/test/BashStatement.Ops ArrayUpdate
 */
export const ArrayUpdate = Case.tagged<ArrayUpdate>("ArrayUpdate")

export interface While extends Case {
  readonly _tag: "While"
  readonly conditional: BashExpression
  readonly body: BashStatement
}

/**
 * @tsplus static effect/parser/test/BashStatement.Ops While
 */
export const While = Case.tagged<While>("While")

export interface Sequence extends Case {
  readonly _tag: "Sequence"
  readonly statements: List<BashStatement>
}

/**
 * @tsplus static effect/parser/test/BashStatement.Ops Sequence
 */
export const Sequence = Case.tagged<Sequence>("Sequence")

/**
 * @tsplus fluent effect/parser/test/BashStatement flatten
 */
export function flatten(self: BashStatement): List<BashStatement> {
  if (self._tag === "Sequence") {
    return self.statements.flatMap((statement) => statement.flatten())
  }
  return List(self)
}

/**
 * @tsplus fluent effect/parser/test/BashStatement flatten
 */
export function normalize(self: BashStatement): BashStatement {
  if (self._tag === "Sequence") {
    const flattened = self.flatten()
    if (flattened.isNil()) {
      return BashStatement.Noop({})
    }
    return flattened.tail.isNil() ? flattened.head : BashStatement.Sequence({
      statements: flattened
    })
  }
  return self
}
