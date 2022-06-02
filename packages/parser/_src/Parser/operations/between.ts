/**
 * Concatenates the parsers `left`, then this, then `right`. All three must
 * succeed. The result is this parser's result.
 *
 * @tsplus fluent effect/parser/Parser between
 */
export function between_<Error, Input, Result, Error2, Input2, Result2, Error3, Input3, Result3>(
  self: Parser<Error, Input, Result>,
  left: Parser<Error2, Input2, Result2>,
  right: Parser<Error3, Input3, Result3>
): Parser<Error | Error2 | Error3, Input & Input2 & Input3, Result> {
  return (left + self + right).map(({ tuple: [_, b, __] }) => b as Result)
}

/**
 * Concatenates the parsers `left`, then this, then `right`. All three must
 * succeed. The result is this parser's result.
 *
 * @tsplus static effect/parser/Parser.Aspects between
 */
export const between = Pipeable(between_)
