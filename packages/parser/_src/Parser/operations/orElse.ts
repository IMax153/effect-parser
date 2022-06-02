import { Lazy, OrElse } from "@effect/parser/Parser/definition/primitives"

/**
 * Assigns `that` parser as a fallback of this parser. First this parser will
 * get evaluated. In case it succeeds, the result is this parser's result. In
 * case it fails, the result is `that` parser's result.
 *
 * If auto-backtracking is on, this parser will backtrack before trying `that`
 * parser.
 *
 * @tsplus fluent effect/parser/Parser orElse
 */
export function orElse_<Error, Input, Result, Error2, Input2, Result2>(
  self: Parser<Error, Input, Result>,
  that: LazyArg<Parser<Error2, Input2, Result2>>
): Parser<Error2, Input & Input2, Result | Result2> {
  return new OrElse(new Lazy(() => self), new Lazy(that))
}

/**
 * Assigns `that` parser as a fallback of this parser. First this parser will
 * get evaluated. In case it succeeds, the result is this parser's result. In
 * case it fails, the result is `that` parser's result.
 *
 * If auto-backtracking is on, this parser will backtrack before trying `that`
 * parser.
 *
 * @tsplus static effect/parser/Parser.Aspects orElse
 */
export const orElse = Pipeable(orElse_)
