import { TransformEither } from "@effect/parser/Parser/definition/primitives"

/**
 * Maps the parser's successful result with the given function which either
 * fails with a `Left` or produces a new result value in a `Right`.
 *
 * @tsplus fluent effect/parser/Parser transformEither
 */
export function transformEither_<Error, Input, Result, Error2, Result2>(
  self: Parser<Error, Input, Result>,
  f: (result: Result) => Either<Error2, Result2>
): Parser<Error2, Input, Result2> {
  return new TransformEither(self, f)
}

/**
 * Maps the parser's successful result with the given function which either
 * fails with a `Left` or produces a new result value in a `Right`.
 *
 * @tsplus static effect/parser/Parser.Aspects transformEither
 */
export const transformEither = Pipeable(transformEither_)
