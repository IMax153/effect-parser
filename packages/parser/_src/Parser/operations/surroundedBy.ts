/**
 * Surrounds this parser with the `other` parser. The result is this parser's
 * result.
 *
 * @tsplus fluent effect/parser/Parser surroundedBy
 */
export function surroundedBy_<Error, Input, Result, Error2, Input2>(
  self: Parser<Error, Input, Result>,
  other: Parser<Error2, Input2, void>
): Parser<Error | Error2, Input & Input2, Result> {
  return (other + self + other).map(({ tuple: [_, b, __] }) => b as Result)
}

/**
 * Surrounds this parser with the `other` parser. The result is this parser's
 * result.
 *
 * @tsplus static effect/parser/Parser.Aspects surroundedBy
 */
export const surroundedBy = Pipeable(surroundedBy_)
