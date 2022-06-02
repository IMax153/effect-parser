/**
 * Turns on auto-backtracking for this parser.
 *
 * @tsplus fluent effect/parser/Parser autoBacktracking
 */
export function autoBacktracking<Error, Input, Result>(
  self: Parser<Error, Input, Result>
): Parser<Error, Input, Result> {
  return self.setAutoBacktracking(true)
}
