/**
 * Concatenates the `self` syntax with `that` syntax. In case both parsers
 * succeed, the result is a pair of the results. The printer destructures a pair
 * and prints the left value with `self`, the right value with `that`.
 *
 * @tsplus operator effect/parser/Syntax &
 * @tsplus fluent effect/parser/Syntax zip
 */
export function zip_<Error, Input, Output, Value, Error2, Input2, Output2, Value2>(
  self: Syntax<Error, Input, Output, Value>,
  that: LazyArg<Syntax<Error2, Input2, Output2, Value2>>
): Syntax<Error | Error2, Input & Input2, Output & Output2, Tuple<[Value, Value2]>> {
  return Syntax(
    self.asParser.zip(that().asParser),
    self.asPrinter.zip(that().asPrinter)
  )
}

/**
 * Concatenates the `self` syntax with `that` syntax. In case both parsers
 * succeed, the result is a pair of the results. The printer destructures a pair
 * and prints the left value with `self`, the right value with `that`.
 *
 * @tsplus static effect/parser/Syntax.Aspects zip
 */
export const zip = Pipeable(zip_)
