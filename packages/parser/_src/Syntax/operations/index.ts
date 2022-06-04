/**
 * A `Syntax` that in parser mode results in the current input stream position.
 *
 * @tsplus static effect/parser/Syntax.Ops index
 */
export const index: Syntax<never, unknown, never, number> = Syntax(
  Parser.index,
  Printer.succeed(0)
)
