/**
 * Concatenates the `self` parser with `that` parser. In the case where both
 * parsers succeed, the result is the result of `that` parser. Otherwise the
 * parser fails. The printer first passes the value to be printed to the `self`
 * printer, and then passes the value to `that` printer.
 *
 * @tsplus operator effect/parser/Syntax >
 * @tsplus fluent effect/parser/Syntax zipRight
 */
export function zipRight_<Error, Input, Output, Value, Error2, Input2, Output2, Value2>(
  self: Syntax<Error, Input, Output, Value>,
  that: LazyArg<Syntax<Error2, Input2, Output2, Value2>>
): Syntax<Error | Error2, Input & Input2, Output & Output2, Value2> {
  return Syntax(
    self.asParser.zipRight(that().asParser),
    self.asPrinter.zipRight(that().asPrinter)
  )
}

/**
 * Concatenates the `self` parser with `that` parser. In the case where both
 * parsers succeed, the result is the result of `that` parser. Otherwise the
 * parser fails. The printer first passes the value to be printed to the `self`
 * printer, and then passes the value to `that` printer.
 *
 * @tsplus static effect/parser/Syntax.Aspects zipRight
 */
export const zipRight = Pipeable(zipRight_)
