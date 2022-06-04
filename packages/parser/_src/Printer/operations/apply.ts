import { ProvideValue } from "@effect/parser/Printer/definition/primitives"

/**
 * Provides this printer it's input value.
 *
 * @tsplus fluent effect/parser/Printer apply
 */
export function apply_<Error, Output, Value>(
  self: Printer<Error, Output, Value>,
  value: Value
): Printer<Error, Output, unknown> {
  return new ProvideValue(self, value)
}
