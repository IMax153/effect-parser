import type { OptimizerState } from "@effect/parser/Parser/_internal/OptimizerState"
import { runStripNode } from "@effect/parser/Parser/_internal/runStripNode"

/**
 * Strips all the name information from this parser to improve performance but
 * reduces the failure message's verbosity.
 *
 * @tsplus fluent effect/parser/Parser strip
 */
export function strip<Error, Input, Result>(
  self: Parser<Error, Input, Result>
): Parser<Error, Input, Result> {
  const strippedNodes: OptimizerState = {
    optimized: new Map(),
    visited: new Map(),
    autoBacktrack: true // Default auto-backtrack state
  }
  return runStripNode(self, strippedNodes)
}
