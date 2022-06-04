/**
 * Constructs a `Syntax` directly from a `Parser` and a `Printer`.
 *
 * @tsplus static effect/parser/Syntax.Ops __call
 */
export function from<Error, Input, Output, Value>(
  parser: Parser<Error, Input, Value>,
  printer: Printer<Error, Output, Value>
): Syntax<Error, Input, Output, Value> {
  return new Syntax(parser, printer)
}
