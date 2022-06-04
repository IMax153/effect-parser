/**
 * Surround this printer with `other`, which will get the unit value to be
 * printed.
 *
 * @tsplus fluent effect/parser/Printer surroundedBy
 */
export function surroundedBy_<Error, Output, Value, Error2, Output2>(
  self: Printer<Error, Output, Value>,
  other: Printer<Error2, Output2, void>
): Printer<Error | Error2, Output & Output2, Value> {
  return self.between(other, other)
}

/**
 * Surround this printer with `other`, which will get the unit value to be
 * printed.
 *
 * @tsplus static effect/parser/Printer.Aspects surroundedBy
 */
export const surroundedBy = Pipeable(surroundedBy_)
