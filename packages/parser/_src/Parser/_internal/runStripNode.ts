import type { OptimizerState } from "@effect/parser/Parser/_internal/OptimizerState"
import { instruction } from "@effect/parser/Parser/definition/instruction"

export function runStripNode<Error, Input, Result>(
  self: Parser<Error, Input, Result>,
  stripState: OptimizerState
): Parser<Error, Input, Result> {
  const alreadyOptimized = stripState.optimized.get(self)
  if (alreadyOptimized != null) {
    return alreadyOptimized
  }
  const visited = stripState.visited.get(self)
  stripState.visited.set(self, visited != null ? visited + 1 : 1)
  const strippedNode = instruction(self).stripNode(stripState)
  stripState.optimized.set(self, strippedNode)
  return strippedNode as unknown as Parser<Error, Input, Result>
}
