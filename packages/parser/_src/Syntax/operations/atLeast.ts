/**
 * Repeats this `Syntax` at least 'min' times.
 *
 * The result is all the parsed elements until the first failure. The failure
 * that stops the repetition gets swallowed and in case auto-backtracking is on,
 * the parser backtracks to the end of the last successful item.
 *
 * When printing, the input is a chunk of values and each element gets printed.
 *
 * @tsplus fluent effect/parser/Syntax atLeast
 */
export function atLeast_<Error, Input, Output, Value>(
  self: Syntax<Error, Input, Output, Value>,
  min: number
): Syntax<Error, Input, Output, Chunk<Value>> {
  return Syntax(
    self.asParser.atLeast(min),
    self.asPrinter.repeat()
  )
}

/**
 * Repeats this `Syntax` at least 'min' times.
 *
 * The result is all the parsed elements until the first failure. The failure
 * that stops the repetition gets swallowed and in case auto-backtracking is on,
 * the parser backtracks to the end of the last successful item.
 *
 * When printing, the input is a chunk of values and each element gets printed.
 *
 * @tsplus static effect/parser/Syntax.Aspects atLeast
 */
export const atLeast = Pipeable(atLeast_)
