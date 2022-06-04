/**
 * Makes this syntax optional.
 *
 * Failure of the parser will be ignored. In case auto-backtracking is enabled,
 * backtracking is performed on it.
 *
 * @tsplus fluent effect/parser/Syntax optional
 */
export function optional<Error, Input, Output, Value>(
  self: Syntax<Error, Input, Output, Value>
): Syntax<Error, Input, Output, Option<Value>> {
  return Syntax(
    self.asParser.optional(),
    self.asPrinter.optional()
  )
}
