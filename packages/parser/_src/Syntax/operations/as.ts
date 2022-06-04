/**
 * Ignores the result of the syntax and result in `value` instead.
 *
 * @tsplus fluent effect/parser/Syntax as
 */
export function as_<Error, Input, Output, Value2>(
  self: Syntax<Error, Input, Output, void>,
  value: Value2
): Syntax<Error, Input, Output, Value2> {
  return Syntax(
    self.asParser.as(value),
    self.asPrinter.asPrinted(value, undefined)
  )
}

/**
 * Ignores the result of the syntax and result in `value` instead.
 *
 * @tsplus static effect/parser/Syntax.Aspects as
 */
export const as = Pipeable(as_)
