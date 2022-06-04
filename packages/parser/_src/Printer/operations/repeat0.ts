import { Repeat } from "@effect/parser/Printer/definition/primitives"

/**
 * Repeats this printer for each element of the input chunk zero or more times.
 *
 * @tsplus fluent effect/parser/Printer repeat0
 */
export function repeat0<Error, Output, Value>(
  self: Printer<Error, Output, Value>
): Printer<Error, Output, Chunk<Value>> {
  return new Repeat(self, 0, Option.none)
}
