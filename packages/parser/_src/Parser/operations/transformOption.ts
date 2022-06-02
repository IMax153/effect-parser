/**
 * Maps the parser's successful result with the given function which either
 * fails with a `None` or produces a new result value in a `Some`.
 *
 * @tsplus fluent effect/parser/Parser transformOption
 */
export function transformOption_<Error, Input, Result, Result2>(
  self: Parser<Error, Input, Result>,
  f: (result: Result) => Option<Result2>
): Parser<Option<Error>, Input, Result2> {
  return self.transformEither((result) => Either.fromOption(f(result), Option.none))
}

/**
 * Maps the parser's successful result with the given function which either
 * fails with a `None` or produces a new result value in a `Some`.
 *
 * @tsplus static effect/parser/Parser.Aspects transformOption
 */
export const transformOption = Pipeable(transformOption_)
