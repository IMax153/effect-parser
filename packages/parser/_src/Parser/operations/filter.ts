/**
 * Checks the result of this `Parser` with the specified function. If the result
 * is false, the parser fails with the specified `failure`, otherwise the
 * parser results in the this parser's result.
 *
 * @tsplus fluent effect/parser/Parser filter
 */
export function filter_<Error, Input, Result, Error2, Result2 extends Result>(
  self: Parser<Error, Input, Result>,
  f: Refinement<Result, Result2>,
  failure: Error2
): Parser<Error2, Input, Result2>
export function filter_<Error, Input, Result, Error2>(
  self: Parser<Error, Input, Result>,
  f: Predicate<Result>,
  failure: Error2
): Parser<Error2, Input, Result>
export function filter_<Error, Input, Result, Error2>(
  self: Parser<Error, Input, Result>,
  f: Predicate<Result>,
  failure: Error2
): Parser<Error2, Input, Result> {
  return self.transformEither((result) => f(result) ? Either.right(result) : Either.left(failure))
}

/**
 * Checks the result of this `Parser` with the specified function. If the result
 * is false, the parser fails with the specified `failure`, otherwise the
 * parser results in the this parser's result.
 *
 * @tsplus static effect/parser/Parser.Aspects filter
 */
export function filter<Result, Error2, Result2 extends Result>(
  f: Refinement<Result, Result2>,
  failure: Error2
): <Error, Input>(self: Parser<Error, Input, Result>) => Parser<Error2, Input, Result2>
export function filter<Result, Error2>(
  f: Predicate<Result>,
  failure: Error2
): <Error, Input>(self: Parser<Error, Input, Result>) => Parser<Error2, Input, Result>
export function filter<Result, Error2>(
  f: Predicate<Result>,
  failure: Error2
) {
  return <Error, Input>(self: Parser<Error, Input, Result>): Parser<Error2, Input, Result> => self.filter(f, failure)
}
