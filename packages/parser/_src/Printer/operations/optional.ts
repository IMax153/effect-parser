import { Optional } from "@effect/parser/Printer/definition/primitives"

/**
 * Prints option values.
 *
 * @tsplus fluent effect/parser/Printer optional
 */
export function optional<Error, Output, Value>(
  self: Printer<Error, Output, Value>
): Printer<Error, Output, Option<Value>> {
  return new Optional(self)
}
