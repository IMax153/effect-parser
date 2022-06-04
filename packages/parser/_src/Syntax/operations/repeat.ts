/**
 * Repeats this `Syntax` at least once.
 *
 * The result is all the parsed elements until the first failure. The failure
 * that stops the repetition gets swallowed and in case auto-backtracking is on,
 * the parser backtracks to the end of the last successful item.
 *
 * When printing, the input is a chunk of values and each element gets printed.
 *
 * @tsplus fluent effect/parser/Syntax repeat
 */
export function repeat<Error, Input, Output, Value>(
  self: Syntax<Error, Input, Output, Value>
): Syntax<Error, Input, Output, Chunk<Value>> {
  return Syntax(
    self.asParser.repeat(),
    self.asPrinter.repeat()
  )
}
