import type { ParserOp } from "@effect/parser/Parser/_internal/ParserOp"
import type { Instruction } from "@effect/parser/Parser/definition/instruction"

/**
 * @tsplus type effect/parser/Parser/CompilerState
 */
export interface CompilerState {
  readonly optimized: Map<Instruction, ParserOp>
  readonly visited: Set<Instruction>
}

/**
 * @tsplus type effect/parser/Parser/CompilerState.Ops
 */
export interface CompilerStateOps {}
export const CompilerState: CompilerStateOps = {}

/**
 * @tsplus static effect/parser/Parser/CompilerState.Ops initial
 */
export function initial(): CompilerState {
  return {
    optimized: new Map(),
    visited: new Set()
  }
}
