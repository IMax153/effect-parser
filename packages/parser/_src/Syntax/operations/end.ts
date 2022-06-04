/**
 * A `Syntax` that in parser mode only succeeds if the input stream has been
 * consumed fully.
 *
 * This can be used to require that a parser consumes the full input.
 *
 * @tsplus static effect/parser/Syntax.Ops end
 */
export const end: Syntax<never, unknown, never, void> = Syntax(
  Parser.end,
  Printer.succeed<void>(undefined)
)
