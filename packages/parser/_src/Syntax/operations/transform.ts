/**
 * Maps the parser's successful result with the specified function `to`, and
 * maps the value to be printed with the specified function `from`.
 *
 * @tsplus fluent effect/parser/Syntax transform
 */
export function transform_<Error, Input, Output, Value, Value2>(
  self: Syntax<Error, Input, Output, Value>,
  to: (value: Value) => Value2,
  from: (value: Value2) => Value
): Syntax<Error, Input, Output, Value2> {
  return Syntax(
    self.asParser.map(to),
    self.asPrinter.contramap(from)
  )
}

/**
 * Maps the parser's successful result with the specified function `to`, and
 * maps the value to be printed with the specified function `from`.
 *
 * @tsplus static effect/parser/Syntax.Aspects transform
 */
export const transform = Pipeable(transform_)
