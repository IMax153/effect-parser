import { SetAutoBacktrack } from "@effect/parser/Parser/definition/primitives"

/**
 * Enables or disables auto-backtracking for this parser.
 *
 * @tsplus fluent effect/parser/Parser setAutoBacktracking
 */
export function setAutoBacktracking_<Error, Input, Result>(
  self: Parser<Error, Input, Result>,
  enabled: boolean
): Parser<Error, Input, Result> {
  return new SetAutoBacktrack(self, enabled)
}

/**
 * Enables or disables auto-backtracking for this parser.
 *
 * @tsplus static effect/parser/Parser.Aspects setAutoBacktracking
 */
export const setAutoBacktracking = Pipeable(setAutoBacktracking_)
