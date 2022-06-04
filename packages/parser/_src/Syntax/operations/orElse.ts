/**
 * Assigns `that` syntax as a fallback of `self`. First this parser or printer
 * gets evaluated. In case it succeeds, the result is the `self` syntax's result.
 * In case it fails, the result is `that` syntax's result.
 *
 * If auto-backtracking is on, this parser will backtrack before trying `that`
 * parser.
 *
 * @tsplus operator effect/parser/Syntax |
 * @tsplus fluent effect/parser/Syntax orElse
 */
export function orElse_<Error, Input, Output, Value, Error2, Input2, Output2, Value2>(
  self: Syntax<Error, Input, Output, Value>,
  that: LazyArg<Syntax<Error2, Input2, Output2, Value2>>
): Syntax<Error2, Input & Input2, Output & Output2, Value2 | Value> {
  return Syntax(
    self.asParser.orElse(that().asParser),
    self.asPrinter.orElse(that().asPrinter)
  )
}

/**
 * Assigns `that` syntax as a fallback of `self`. First this parser or printer
 * gets evaluated. In case it succeeds, the result is the `self` syntax's result.
 * In case it fails, the result is `that` syntax's result.
 *
 * If auto-backtracking is on, this parser will backtrack before trying `that`
 * parser.
 *
 * @tsplus static effect/parser/Syntax.Aspects orElse
 */
export const orElse = Pipeable(orElse_)
