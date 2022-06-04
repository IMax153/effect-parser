/**
 * Enables or disables auto-backtracking for this syntax.
 *
 * @tsplus fluent effect/parser/Syntax setAutoBacktracking
 */
export function setAutoBacktracking_<Error, Input, Output, Value>(
  self: Syntax<Error, Input, Output, Value>,
  enabled: boolean
): Syntax<Error, Input, Output, Value> {
  return Syntax(
    self.asParser.setAutoBacktracking(enabled),
    self.asPrinter
  )
}

/**
 * Enables or disables auto-backtracking for this syntax.
 *
 * @tsplus static effect/parser/Syntax.Aspects setAutoBacktracking
 */
export const setAutoBacktracking = Pipeable(setAutoBacktracking_)
