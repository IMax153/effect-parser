/**
 * Maps the error with the given function `f`.
 *
 * @tsplus fluent effect/parser/Syntax mapError
 */
export function mapError_<Error, Error2, Input, Output, Value>(
  self: Syntax<Error, Input, Output, Value>,
  f: (error: Error) => Error2
): Syntax<Error2, Input, Output, Value> {
  return Syntax(
    self.asParser.mapError(f),
    self.asPrinter.mapError(f)
  )
}

/**
 * Maps the error with the given function `f`.
 *
 * @tsplus static effect/parser/Syntax.Aspects mapError
 */
export const mapError = Pipeable(mapError_)
