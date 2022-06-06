import { ProvideValue } from "@effect/parser/Printer/definition/primitives"

/**
 * Provides this printer it's input value.
 *
 * @tsplus fluent effect/parser/Printer provide
 */
export function provide_<Error, Output, Value>(
  self: Printer<Error, Output, Value>,
  value: Value
): Printer<Error, Output, unknown> {
  return new ProvideValue(self, value)
}

/**
 * Provides this printer it's input value.
 *
 * @tsplus static effect/parser/Printer.Aspects provide
 */
export const provide = Pipeable(provide_)
