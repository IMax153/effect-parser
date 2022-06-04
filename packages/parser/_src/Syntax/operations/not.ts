/**
 * A `Syntax` that succeeds only if this syntax fails.
 *
 * @tsplus fluent effect/parser/Syntax not
 */
export function not<Error, Error2, Input, Output, Value>(
  self: Syntax<Error, Input, Output, Value>,
  failure: Error2
): Syntax<Error2, Input, Output, void> {
  return Syntax(
    self.asParser.not(failure),
    Printer.succeed<void>(undefined)
  )
}
