import type { OptimizerState } from "@effect/parser/Parser/_internal/OptimizerState"
import { instruction } from "@effect/parser/Parser/definition/instruction"

export function runOptimizeNode<Error, Input, Result>(
  self: Parser<Error, Input, Result>,
  optimizerState: OptimizerState
): Parser<Error, Input, Result> {
  const alreadyOptimized = optimizerState.optimized.get(self)
  if (alreadyOptimized != null) {
    return alreadyOptimized
  }
  const visited = optimizerState.visited.get(self)
  optimizerState.visited.set(self, visited != null ? visited + 1 : 1)
  const optimized = instruction(self).optimizeNode(optimizerState)
  optimizerState.optimized.set(self, optimized)
  return optimized as unknown as Parser<Error, Input, Result>
}
