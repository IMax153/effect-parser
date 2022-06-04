/**
 * A `Printer` that emits the input if it is equal to `value`, otherwise fails.
 *
 * **Note**: equality is checked using hash equality.
 *
 * @tsplus static effect/parser/Printer.Ops exactly
 */
export function exactly<Output>(value: Output): Printer<string, Output, Output> {
  return Printer.exactlyWithFailure(value, `not ${value}`)
}
