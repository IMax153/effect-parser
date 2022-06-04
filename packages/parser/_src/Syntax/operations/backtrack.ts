/**
 * A `Syntax` that resets the parsing position in case it fails.
 *
 * By default backtracking points are automatically inserted. This behavior can
 * be changed with the `autoBacktracking`, `manualBacktracking`, and
 * `setAutoBacktracking` combinators.
 *
 * Does not affect printing.
 *
 * @tsplus fluent effect/parser/Syntax backtrack
 */
export function backtrack<Error, Input, Output, Value>(
  self: Syntax<Error, Input, Output, Value>
): Syntax<Error, Input, Output, Value> {
  return Syntax(
    self.asParser.backtrack(),
    self.asPrinter
  )
}
