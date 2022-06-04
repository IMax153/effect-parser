/**
 * Concatenates the `self` parser with `that` parser. In the case where both
 * parsers succeed, the result is the result of the `self` parser. Otherwise the
 * parser fails. The printer passes the value to be printed to the `self`
 * printer, and also executes `that` printer with unit as the input value.
 *
 * Note that the right syntax must have `Value` defined as the unit value,
 * because there is no way for the printer to reconstruct an arbitrary input for
 * the right printer.
 *
 * @tsplus operator effect/parser/Syntax <
 * @tsplus fluent effect/parser/Syntax zipLeft
 */
export function zipLeft_<Error, Input, Output, Value, Error2, Input2, Output2>(
  self: Syntax<Error, Input, Output, Value>,
  that: LazyArg<Syntax<Error2, Input2, Output2, void>>
): Syntax<Error | Error2, Input & Input2, Output & Output2, Value> {
  return Syntax(
    self.asParser.zipLeft(that().asParser),
    self.asPrinter.zipLeft(that().asPrinter)
  )
}

/**
 * Concatenates the `self` parser with `that` parser. In the case where both
 * parsers succeed, the result is the result of the `self` parser. Otherwise the
 * parser fails. The printer passes the value to be printed to the `self`
 * printer, and also executes `that` printer with unit as the input value.
 *
 * Note that the right syntax must have `Value` defined as the unit value,
 * because there is no way for the printer to reconstruct an arbitrary input for
 * the right printer.
 *
 * @tsplus static effect/parser/Syntax.Aspects zipLeft
 */
export const zipLeft = Pipeable(zipLeft_)
