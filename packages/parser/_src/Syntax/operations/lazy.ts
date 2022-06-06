/**
 * Lazily constructs a `Syntax`.
 *
 * @tsplus static effect/parser/Syntax.Ops lazy
 */
export function lazy<Error, Input, Output, Value>(
  syntax: LazyArg<Syntax<Error, Input, Output, Value>>
): Syntax<Error, Input, Output, Value> {
  return Syntax(
    Parser.lazy(syntax().asParser),
    Printer.lazy(syntax().asPrinter)
  )
}
