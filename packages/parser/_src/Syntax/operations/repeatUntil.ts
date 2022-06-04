/**
 * Repeats this syntax, evaluating `stopCondition` after each element until
 * `stopCondition` results in success.
 *
 * @tsplus fluent effect/parser/Syntax repeatUntil
 */
export function repeatUntil_<Error, Input, Output, Value, Error2, Input2, Output2>(
  self: Syntax<Error, Input, Output, Value>,
  stopCondition: Syntax<Error2, Input2, Output2, void>
): Syntax<Error | Error2, Input & Input2, Output & Output2, Chunk<Value>> {
  return Syntax(
    self.asParser.repeatUntil(stopCondition.asParser),
    self.asPrinter.repeatUntil(stopCondition.asPrinter)
  )
}
