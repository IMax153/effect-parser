/**
 * Maps the parser's successful result with the specified function `to`, and
 * maps the value to be printed with the specified function `from`. Both of the
 * mapping functions can fail the parser/printer.
 *
 * @tsplus fluent effect/parser/Syntax transformEither
 */
export function transformEither_<Error, Error2, Error3, Input, Output, Value, Value2>(
  self: Syntax<Error, Input, Output, Value>,
  to: (value: Value) => Either<Error2, Value2>,
  from: (value: Value2) => Either<Error3, Value>
): Syntax<Error2 | Error3, Input, Output, Value2> {
  return Syntax<Error2 | Error3, Input, Output, Value2>(
    self.asParser.transformEither(to),
    self.asPrinter.contramapEither(from)
  )
}

/**
 * Maps the parser's successful result with the specified function `to`, and
 * maps the value to be printed with the specified function `from`. Both of the
 * mapping functions can fail the parser/printer.
 *
 * @tsplus static effect/parser/Syntax.Aspects transformEither
 */
export const transformEither = Pipeable(transformEither_)
