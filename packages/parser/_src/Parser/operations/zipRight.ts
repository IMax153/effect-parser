import { Lazy, ZipRight } from "@effect/parser/Parser/definition/primitives"

/**
 * Concatenates this parser with `that` parser. In case both parsers succeed,
 * the result is the result of `that` parser. Otherwise the parser fails.
 *
 * @tsplus operator effect/Parser/Parser >
 * @tsplus fluent effect/parser/Parser zipRight
 */
export function zipRight_<Error, Error2, Input, Input2, Result, Result2>(
  self: Parser<Error, Input, Result>,
  that: LazyArg<Parser<Error2, Input2, Result2>>
): Parser<Error | Error2, Input & Input2, Result2> {
  return new ZipRight(new Lazy(() => self), new Lazy(that))
}

/**
 * Concatenates this parser with `that` parser. In case both parsers succeed,
 * the result is the result of `that` parser. Otherwise the parser fails.
 *
 * @tsplus static effect/parser/Parser.Aspects zipRight
 */
export const zipRight = Pipeable(zipRight_)
