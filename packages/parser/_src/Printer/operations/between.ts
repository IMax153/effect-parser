/**
 * Surround this printer with `left` and `right`, each getting the unit value to
 * be printed.
 *
 * @tsplus fluent effect/parser/Printer between
 */
export function between_<Error, Output, Value, Error2, Output2, Error3, Output3>(
  self: Printer<Error, Output, Value>,
  left: Printer<Error2, Output2, void>,
  right: Printer<Error3, Output3, void>
): Printer<Error | Error2 | Error3, Output & Output2 & Output3, Value> {
  return left > self < right
}

/**
 * Surround this printer with `left` and `right`, each getting the unit value to
 * be printed.
 *
 * @tsplus static effect/parser/Printer.Aspects between
 */
export const between = Pipeable(between_)
