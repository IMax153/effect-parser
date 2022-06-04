/**
 * Strips all the name information from this syntax to improve performance but
 * reduces the failure message's verbosity.
 *
 * @tsplus fluent effect/parser/Syntax strip
 */
export function strip<Error, Input, Output, Value>(
  self: Syntax<Error, Input, Output, Value>
): Syntax<Error, Input, Output, Value> {
  return Syntax(
    self.asParser.strip(),
    self.asPrinter
  )
}
