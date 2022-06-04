import { Ignore } from "@effect/parser/Printer/definition/primitives"

/**
 * Ignores the printer's result and input and use `result` and `value` instead.
 *
 * @tsplus fluent effect/parser/Printer asPrinted
 */
export function asPrinted_<Error, Output, Value, Value2>(
  self: Printer<Error, Output, Value>,
  matches: Value2,
  value: Value
): Printer<Error, Output, Value2> {
  return new Ignore(self, matches, value)
}

/**
 * Ignores the printer's result and input and use `result` and `value` instead.
 *
 * @tsplus static effect/parser/Printer.Aspects asPrinted
 */
export const asPrinted = Pipeable(asPrinted_)
