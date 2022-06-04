/**
 * Print the specified `value` to a string.
 *
 * @tsplus fluent effect/parser/Syntax printString
 */
export function printString_<Error, Input, Value>(
  self: Syntax<Error, Input, string, Value>,
  value: Value
): Either<Error, string> {
  return self.printChunk(value).map((chunk) => chunk.join(""))
}

/**
 * Print the specified `value` to a string.
 *
 * @tsplus static effect/parser/Syntax.Aspects printString
 */
export const printString = Pipeable(printString_)
