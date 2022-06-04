/**
 * A `Syntax` that parses/prints an arbitrarily long string.
 *
 * @tsplus static effect/parser/Syntax.Ops anyString
 */
export const anyString: Syntax<never, string, string, string> = Syntax(
  Parser.anyString,
  Printer.anyString
)
