import { Lazy, ZipLeft } from "@effect/parser/Parser/definition/primitives"

/**
 * Concatenates this parser with `that` parser. In case both parsers succeed,
 * the result is the result of this parser. Otherwise the parser fails.
 *
 * @tsplus operator effect/Parser/Parser <
 * @tsplus fluent effect/parser/Parser zipLeft
 */
export function zipLeft_<Error, Error2, Input, Input2, Result, Result2>(
  self: Parser<Error, Input, Result>,
  that: LazyArg<Parser<Error2, Input2, Result2>>
): Parser<Error | Error2, Input & Input2, Result> {
  return new ZipLeft(new Lazy(() => self), new Lazy(that))
}

/**
 * Concatenates this parser with `that` parser. In case both parsers succeed,
 * the result is the result of this parser. Otherwise the parser fails.
 *
 * @tsplus static effect/parser/Parser.Aspects zipLeft
 */
export const zipLeft = Pipeable(zipLeft_)
