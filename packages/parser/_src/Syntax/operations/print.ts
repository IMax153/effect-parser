/**
 * Print the specified `value` to the specified `target` implementation.
 *
 * @tsplus fluent effect/parser/Syntax print
 */
export function print_<Error, Input, Output, Value, T extends Target<any, Output>>(
  self: Syntax<Error, Input, Output, Value>,
  value: Value,
  target: T
): Either<Error, void> {
  return self.asPrinter.print(value, target)
}

/**
 * Print the specified `value` to the specified `target` implementation.
 *
 * @tsplus static effect/parser/Syntax.Aspects print
 */
export const print = Pipeable(print_)
