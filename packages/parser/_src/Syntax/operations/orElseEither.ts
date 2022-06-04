/**
 * Assigns `that` syntax as a fallback of `self`. First this parser or printer
 * gets evaluated. In case it succeeds, the result is the `self` syntax's result
 * wrapped in a `Left`. In case it fails, the result is `that` syntax's result,
 * wrapped in a `Right`.
 *
 * If auto-backtracking is on, this parser will backtrack before trying `that`
 * parser.
 *
 * @tsplus fluent effect/parser/Syntax orElseEither
 */
export function orElseEither_<Error, Input, Output, Value, Error2, Input2, Output2, Value2>(
  self: Syntax<Error, Input, Output, Value>,
  that: LazyArg<Syntax<Error2, Input2, Output2, Value2>>
): Syntax<Error2, Input & Input2, Output & Output2, Either<Value, Value2>> {
  return Syntax(
    self.asParser.orElseEither(that().asParser),
    self.asPrinter.orElseEither(that().asPrinter)
  )
}

/**
 * Assigns `that` syntax as a fallback of `self`. First this parser or printer
 * gets evaluated. In case it succeeds, the result is the `self` syntax's result
 * wrapped in a `Left`. In case it fails, the result is `that` syntax's result,
 * wrapped in a `Right`.
 *
 * If auto-backtracking is on, this parser will backtrack before trying `that`
 * parser.
 *
 * @tsplus static effect/parser/Syntax.Aspects orElseEither
 */
export const orElseEither = Pipeable(orElseEither_)
