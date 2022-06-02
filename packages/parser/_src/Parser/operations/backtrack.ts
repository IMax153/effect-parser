import { Backtrack } from "@effect/parser/Parser/definition/primitives"

/**
 * A `Parser` that resets the parsing position in case it fails.
 *
 * By default backtracking points are automatically inserted. This behavior can
 * be changed with the `autoBacktracking`, `manualBacktracking` and
 * `setAutoBacktracking` combinators.
 *
 * @tsplus fluent effect/parser/Parser backtrack
 */
export function backtrack<Error, Input, Result>(
  self: Parser<Error, Input, Result>
): Parser<Error, Input, Result> {
  return new Backtrack(self)
}
