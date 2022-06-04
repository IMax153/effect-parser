/**
 * Enables auto-backtracking for this syntax.
 *
 * @tsplus fluent effect/parser/Syntax autoBacktracking
 */
export function autoBacktracking<Error, Input, Output, Value>(
  self: Syntax<Error, Input, Output, Value>
): Syntax<Error, Input, Output, Value> {
  return Syntax(
    self.asParser.autoBacktracking(),
    self.asPrinter
  )
}
