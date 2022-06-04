import { FlatMapValue } from "@effect/parser/Printer/definition/primitives"

/**
 * A `Printer` determined by a function on the input value.
 *
 * @tsplus static effect/parser/Printer.Ops byValue
 */
export function byValue<Error, Output, Value, Value2>(
  f: (value: Value) => Printer<Error, Output, Value2>
): Printer<Error, Output, Value> {
  return new FlatMapValue(f)
}
