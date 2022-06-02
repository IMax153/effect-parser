import { Lazy, Zip } from "@effect/parser/Parser/definition/primitives"

/**
 * Concatenates this parser with `that` parser. In case both parser succeeds,
 * the result of both parsers will be passed to the specified function, which
 * will be used to compute the result of the zipped parser.
 *
 * @tsplus fluent effect/parser/Parser zipWith
 */
export function zipWith_<Error, Input, Result, Error2, Input2, Result2, Result3>(
  self: Parser<Error, Input, Result>,
  that: LazyArg<Parser<Error2, Input2, Result2>>,
  f: (result: Result, result2: Result2) => Result3
): Parser<Error | Error2, Input & Input2, Result3> {
  return new Zip(new Lazy(() => self), new Lazy(that), f)
}

/**
 * Concatenates this parser with `that` parser. In case both parser succeeds,
 * the result of both parsers will be passed to the specified function, which
 * will be used to compute the result of the zipped parser.
 *
 * @tsplus static effect/parser/Parser.Aspects zipWith
 */
export const zipWith = Pipeable(zipWith_)
