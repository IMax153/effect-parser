import type { MergeTuple } from "@tsplus/stdlib/data/Tuple"

/**
 * Concatenates this parser with `that` parser. In case both parser succeeds,
 * the resulting parser will combine the results of both parsers into a
 * flattened `Tuple<[Result, Result2]>`, removing any nested `Tuple`s.
 *
 * @tsplus operator effect/parser/Parser +
 * @tsplus fluent effect/parser/Parser zipFlatten
 */
export function zipFlatten_<Error, Input, Result, Error2, Input2, Result2>(
  self: Parser<Error, Input, Result>,
  that: LazyArg<Parser<Error2, Input2, Result2>>
): Parser<Error | Error2, Input & Input2, MergeTuple<Result, Result2>> {
  return self.zipWith(that, Tuple.mergeTuple)
}

/**
 * Concatenates this parser with `that` parser. In case both parser succeeds,
 * the resulting parser will combine the results of both parsers into a
 * flattened `Tuple<[Result, Result2]>`, removing any nested `Tuple`s.
 *
 * @tsplus static effect/parser/Parser.Aspects zipFlatten
 */
export const zipFlatten = Pipeable(zipFlatten_)
