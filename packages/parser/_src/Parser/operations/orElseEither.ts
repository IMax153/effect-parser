import { Lazy, OrElseEither } from "@effect/parser/Parser/definition"

/**
 * Assigns `that` parser as a fallback of this. First this parser will be
 * evaluated. In case it succeeds, the result is this parser's result wrapped in
 * a `Left`. In case it fails, the result is `that` parser's result, wrapped in
 * a `Right`.
 *
 * If auto-backtracking is on, this parser will backtrack before trying `that`
 * parser.
 *
 * @tsplus fluent effect/parser/Parser orElseEither
 */
export function orElseEither_<Error, Input, Result, Error2, Input2, Result2>(
  self: Parser<Error, Input, Result>,
  that: LazyArg<Parser<Error2, Input2, Result2>>
): Parser<Error2, Input & Input2, Either<Result, Result2>> {
  return new OrElseEither(new Lazy(() => self), new Lazy(that))
}

/**
 * Assigns `that` parser as a fallback of this. First this parser will be
 * evaluated. In case it succeeds, the result is this parser's result wrapped in
 * a `Left`. In case it fails, the result is `that` parser's result, wrapped in
 * a `Right`.
 *
 * If auto-backtracking is on, this parser will backtrack before trying `that`
 * parser.
 *
 * @tsplus static effect/parser/Parser.Aspects orElseEither
 */
export const orElseEither = Pipeable(orElseEither_)
