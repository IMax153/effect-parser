/**
 * A `Printer` that emits the given value.
 *
 * @tsplus static effect/parser/Printer.Ops emit
 */
export function emit<Output>(value: Output): Printer<string, Output, void> {
  return Printer.exactly(value).provide(value)
}
