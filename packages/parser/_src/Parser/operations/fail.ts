import { Fail } from "@effect/parser/Parser/definition/primitives"

/**
 * Constructs a `Parser` that does not consume any input and always fails with
 * the specified `failure`.
 *
 * @tsplus static effect/parser/Parser.Ops fail
 */
export function fail<Error>(failure: Error): Parser<Error, unknown, never> {
  return new Fail(failure)
}
