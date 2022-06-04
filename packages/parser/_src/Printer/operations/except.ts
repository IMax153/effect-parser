/**
 * A `Printer` that emits the input unless it is equal to `value`, in which case
 * it fails.
 *
 * **Note**: equality is checked using hash equality.
 *
 * @tsplus static effect/parser/Printer.Ops except
 */
export function except<Output>(value: Output): Printer<string, Output, Output> {
  return Printer.exceptWithFailure(value, `not ${value}`)
}
