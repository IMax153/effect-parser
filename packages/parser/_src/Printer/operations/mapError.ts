import { MapError } from "@effect/parser/Printer/definition/primitives"

/**
 * Maps the error value of the printer with the specified function.
 *
 * @tsplus fluent effect/parser/Printer mapError
 */
export function mapError_<Error, Error2, Output, Value>(
  self: Printer<Error, Output, Value>,
  f: (error: Error) => Error2
): Printer<Error2, Output, Value> {
  return new MapError(self, f)
}

/**
 * Maps the error value of the printer with the specified function.
 *
 * @tsplus static effect/parser/Printer.Aspects mapError
 */
export const mapError = Pipeable(mapError_)
