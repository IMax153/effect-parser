import { Not } from "@effect/parser/Parser/definition/primitives"

/**
 * A `Parser` that fails with the specified `failure` if this parser succeeds.
 *
 * @tsplus fluent effect/parser/Parser not
 */
export function not<Error, Error2, Input, Result>(
  self: Parser<Error, Input, Result>,
  failure: Error2
): Parser<Error2, Input, void> {
  return new Not(self, failure)
}
