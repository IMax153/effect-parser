/**
 * A `Printer` that emits the input if it is equal to `value`, otherwise fails
 * with the specified `failure`.
 *
 * **Note**: equality is checked using hash equality.
 *
 * @tsplus static effect/parser/Printer.Ops exactlyWithFailure
 */
export function exactlyWithFailure<Output, Error>(value: Output, failure: Error): Printer<Error, Output, Output> {
  return Printer.any.filter((_: Output) => Equals.equals(_, value), failure)
}
