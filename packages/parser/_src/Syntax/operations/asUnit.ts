/**
 * A `Syntax` that does not consume any input but prints 'printed' and results
 * in unit.
 *
 * @tsplus fluent effect/parser/Syntax asUnit
 */
export function asUnit_<Error, Input, Output, Value>(
  self: Syntax<Error, Input, Output, Value>,
  printed: Value
): Syntax<Error, Input, Output, void> {
  return Syntax(
    self.asParser.asUnit(),
    self.asPrinter.asPrinted(undefined as void, printed)
  )
}

/**
 * A `Syntax` that does not consume any input but prints 'printed' and results
 * in unit.
 *
 * @tsplus static effect/parser/Syntax.Aspects asUnit
 */
export const asUnit = Pipeable(asUnit_)
