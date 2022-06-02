/**
 * Turns off auto-backtracking for this parser.
 *
 * @tsplus fluent effect/parser/Parser manualBacktracking
 */
export function manualBacktracking<Error, Input, Result>(
  self: Parser<Error, Input, Result>
): Parser<Error, Input, Result> {
  return self.setAutoBacktracking(false)
}
