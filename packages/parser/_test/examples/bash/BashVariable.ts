import type { BashIdentifier } from "@effect/parser/test/examples/bash/BashIdentifier"

/**
 * @tsplus type effect/parser/test/BashVariable
 */
export type BashVariable = Variable | Positional

/**
 * @tsplus type effect/parser/test/BashVariable.Ops
 */
export interface BashVariableOps {}
export const BashVariable: BashVariableOps = {}

export interface Variable extends Case {
  readonly _tag: "Variable"
  readonly name: BashIdentifier
}

/**
 * @tsplus static effect/parser/test/BashVariable.Ops Variable
 */
export const Variable = Case.tagged<Variable>("Variable")

export interface Positional extends Case {
  readonly _tag: "Positional"
  readonly index: number
}

/**
 * @tsplus static effect/parser/test/BashVariable.Ops Positional
 */
export const Positional = Case.tagged<Positional>("Positional")
