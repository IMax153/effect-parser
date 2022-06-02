import { Repeat } from "@effect/parser/Parser/definition/primitives"

/**
 * Repeats this parser at least `min` times.
 *
 * The result is all the parsed elements until the first failure. The failure
 * that stops the repetition gets swallowed and in case auto-backtracking is on,
 * the parser backtracks to the end of the last successful item.
 *
 * @tsplus fluent effect/parser/Parser atLeast
 */
export function atLeast_<Error, Input, Result>(
  self: Parser<Error, Input, Result>,
  min: number
): Parser<Error, Input, Chunk<Result>> {
  return new Repeat(self, min, Option.none)
}

/**
 * Repeats this parser at least `min` times.
 *
 * The result is all the parsed elements until the first failure. The failure
 * that stops the repetition gets swallowed and in case auto-backtracking is on,
 * the parser backtracks to the end of the last successful item.
 *
 * @tsplus static effect/parser/Parser.Aspects atLeast
 */
export const atLeast = Pipeable(atLeast_)
