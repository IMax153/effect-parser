/**
 * A `Syntax` that does not parse or print anything but fails with the specified
 * `failure`.
 *
 * @tsplus static effect/parser/Syntax.Ops fail
 */
export function fail<Error>(failure: Error): Syntax<Error, unknown, never, never> {
  return Syntax(Parser.fail(failure), Printer.fail(failure))
}
