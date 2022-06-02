/**
 * Repeats this parser zero or more times.
 *
 * The result is all the parsed elements until the first failure. The failure
 * that stops the repetition gets swallowed and in case auto-backtracking is on,
 * the parser backtracks to the end of the last successful item.
 *
 * @tsplus fluent effect/parser/Parser repeat0
 */
export function repeat0<Error, Input, Result>(
  self: Parser<Error, Input, Result>
): Parser<Error, Input, Chunk<Result>> {
  return self.atLeast(0)
}
