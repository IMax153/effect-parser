import { Optional } from "@effect/parser/Parser/definition/primitives"

/**
 * Make this parser optional. Failure of this parser will be ignored. In case
 * auto-backtracking is enabled, backtracking is performed on it.
 *
 * @tsplus fluent effect/parser/Parser optional
 */
export function optional<Error, Input, Result>(
  self: Parser<Error, Input, Result>
): Parser<Error, Input, Option<Result>> {
  return new Optional(self)
}
