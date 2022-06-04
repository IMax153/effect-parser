/**
 * A `Printer` that emits the input unless it equals `value`, in which case it
 * fails with the specified `failure`.
 *
 * **Note**: equality is checked using hash equality.
 *
 * @tsplus static effect/parser/Printer.Ops exceptWithFailure
 */
export function exceptWithFailure<Output, Error>(value: Output, failure: Error): Printer<Error, Output, Output> {
  return Printer.any.filter((_: Output) => !Equals.equals(_, value), failure)
}
