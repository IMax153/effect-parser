import { MapError } from "@effect/parser/Parser/definition/primitives"

/**
 * Maps the parser's error with the given function `f`.
 *
 * @tsplus fluent effect/parser/Parser mapError
 */
export function mapError_<Error, Error2, Input, Result>(
  self: Parser<Error, Input, Result>,
  f: (error: Error) => Error2
): Parser<Error2, Input, Result> {
  return new MapError(self, (error) => error.map(f))
}

/**
 * Maps the parser's error with the given function `f`.
 *
 * @tsplus static effect/parser/Parser.Aspects mapError
 */
export const mapError = Pipeable(mapError_)
