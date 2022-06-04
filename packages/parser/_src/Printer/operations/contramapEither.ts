import { ContramapEither } from "@effect/parser/Printer/definition/primitives"

/**
 * Maps the printer's input value with the specified function.
 *
 * @tsplus fluent effect/parser/Printer contramapEither
 */
export function contramapEither_<Error, Output, Value, Error2, Value2>(
  self: Printer<Error, Output, Value>,
  f: (value: Value2) => Either<Error2, Value>
): Printer<Error2, Output, Value2> {
  return new ContramapEither(self, f)
}

/**
 * Maps the printer's input value with the specified function.
 *
 * @tsplus static effect/parser/Printer.Aspects contramapEither
 */
export const contramapEither = Pipeable(contramapEither_)
