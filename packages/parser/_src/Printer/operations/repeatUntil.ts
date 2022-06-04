/**
 * Repeat this printer for each element of the input chunk, verifying the
 * `stopConfition` has not been reached after processing each element.
 *
 * @tsplus fluent effect/parser/Printer repeatUntil
 */
export function repeatUntil_<Error, Output, Value, Error2, Output2>(
  self: Printer<Error, Output, Value>,
  stopCondition: Printer<Error2, Output2, void>
): Printer<Error | Error2, Output & Output2, Chunk<Value>> {
  return self.repeat0() < stopCondition
}

/**
 * Repeat this printer for each element of the input chunk, verifying the
 * `stopConfition` has not been reached after processing each element.
 *
 * @tsplus static effect/parser/Printer.Aspects repeatUntil
 */
export const repeatUntil = Pipeable(repeatUntil_)
