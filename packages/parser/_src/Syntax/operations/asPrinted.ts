/**
 * Sets the result to `result` and the value to be printed to `value`.
 *
 * @tsplus fluent effect/parser/Syntax asPrinted
 */
export function asPrinted_<Error, Input, Output, Value, Value2>(
  self: Syntax<Error, Input, Output, Value>,
  result: Value2,
  value: Value
): Syntax<Error, Input, Output, Value2> {
  return Syntax(
    self.asParser.as(result),
    self.asPrinter.asPrinted(result, value)
  )
}

/**
 * Sets the result to `result` and the value to be printed to `value`.
 *
 * @tsplus static effect/parser/Syntax.Aspects asPrinted
 */
export const asPrinted = Pipeable(asPrinted_)
