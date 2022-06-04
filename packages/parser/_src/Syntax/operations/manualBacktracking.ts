/**
 * Disables auto-backtracking for this syntax.
 *
 * @tsplus fluent effect/parser/Syntax manualBacktracking
 */
export function manualBacktracking<Error, Input, Output, Value>(
  self: Syntax<Error, Input, Output, Value>
): Syntax<Error, Input, Output, Value> {
  return Syntax(
    self.asParser.manualBacktracking(),
    self.asPrinter
  )
}
