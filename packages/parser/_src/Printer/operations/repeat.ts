import { Repeat } from "@effect/parser/Printer/definition/primitives"

/**
 * Repeats this printer for each element of the input chunk, assuming it has at
 * least one element.
 *
 * @tsplus fluent effect/parser/Printer repeat
 */
export function repeat<Error, Output, Value>(
  self: Printer<Error, Output, Value>
): Printer<Error, Output, Chunk<Value>> {
  return new Repeat(self, 1, Option.none)
}
