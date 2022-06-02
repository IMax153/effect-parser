import { Transform } from "@effect/parser/Parser/definition/primitives"

/**
 * Transforms the success result of this parser using the specified function.
 *
 * @tsplus fluent effect/parser/Parser map
 */
export function map_<Error, Input, Result, Result2>(
  self: Parser<Error, Input, Result>,
  f: (result: Result) => Result2
): Parser<Error, Input, Result2> {
  return new Transform(self, f)
}

/**
 * Transforms the success result of this parser using the specified function.
 *
 * @tsplus static effect/parser/Parser.Aspects map
 */
export const map = Pipeable(map_)
