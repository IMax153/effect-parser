/**
 * A `Syntax` that does not parse or print anything but succeeds with the
 * specified `value`.
 *
 * @tsplus static effect/parser/Syntax.Ops succeed
 */
export function succeed<Value>(value: Value): Syntax<never, unknown, never, Value> {
  return Syntax(Parser.succeed(value), Printer.succeed(value))
}
