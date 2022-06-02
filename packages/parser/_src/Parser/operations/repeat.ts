/**
 * Repeats this parser at least one time.
 *
 * The result is all the parsed elements until the first failure. The failure
 * that stops the repetition gets swallowed and in case auto-backtracking is on,
 * the parser backtracks to the end of the last successful item.
 *
 * @tsplus fluent effect/parser/Parser repeat
 */
export function repeat<Error, Input, Result>(
  self: Parser<Error, Input, Result>
): Parser<Error, Input, Chunk<Result>> {
  return self.atLeast(1)
}
