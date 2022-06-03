import type { OptimizerState } from "@effect/parser/Parser/_internal/OptimizerState"
import { runOptimizeNode } from "@effect/parser/Parser/_internal/runOptimizeNode"

/**
 * The optimized parser tree used internally by the parser implementations.
 *
 * @tsplus fluent effect/parser/Parser optimized
 */
export function optimized<Error, Input, Result>(
  self: Parser<Error, Input, Result>
): Parser<Error, Input, Result> {
  const optimizedNodes: OptimizerState = {
    optimized: new Map(),
    visited: new Map(),
    autoBacktrack: true // Default auto-backtrack state
  }
  return runOptimizeNode(self, optimizedNodes)
}
