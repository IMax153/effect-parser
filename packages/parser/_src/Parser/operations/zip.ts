/**
 * Concatenates this parser with `that` parser. In case both parser succeeds,
 * the resulting parser will combine the results of both parsers into a
 * `Tuple<[Result, Result2]>`.
 *
 * @tsplus operator effect/parser/Parser &
 * @tsplus fluent effect/parser/Parser zip
 */
export function zip_<Error, Input, Result, Error2, Input2, Result2>(
  self: Parser<Error, Input, Result>,
  that: LazyArg<Parser<Error2, Input2, Result2>>
): Parser<Error | Error2, Input & Input2, Tuple<[Result, Result2]>> {
  return self.zipWith(that, (a, b) => Tuple(a, b))
}

/**
 * Concatenates this parser with `that` parser. In case both parser succeeds,
 * the resulting parser will combine the results of both parsers into a
 * `Tuple<[Result, Result2]>`.
 *
 * @tsplus static effect/parser/Parser.Aspects zip
 */
export const zip = Pipeable(zip_)
