/**
 * Ignores this syntax's result and instead captures the parsed string fragment
 * and directly prints the input string.
 *
 * @tsplus fluent effect/parser/Syntax asString
 */
export function asString<Error, Output, Value>(
  self: Syntax<Error, string, Output, Value>
): Syntax<Error, string, string, string> {
  return Syntax(
    self.asParser.asString(),
    Printer.anyString
  )
}
