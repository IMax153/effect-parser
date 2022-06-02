import { FlatMap } from "@effect/parser/Parser/definition/primitives"

/**
 * Computes a continuation parser using the specified function which is provided
 * the result of the this parser.
 *
 * @tsplus fluent effect/parser/Parser flatMap
 */
export function flatMap_<Error, Input, Result, Error2, Input2, Result2>(
  self: Parser<Error, Input, Result>,
  f: (result: Result) => Parser<Error2, Input2, Result2>
): Parser<Error | Error2, Input & Input2, Result2> {
  return new FlatMap(self, f)
}

/**
 * Computes a continuation parser using the specified function which is provided
 * the result of the this parser.
 *
 * @tsplus static effect/parser/Parser.Aspects flatMap
 */
export const flatMap = Pipeable(flatMap_)
