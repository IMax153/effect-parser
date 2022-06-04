/**
 * Prints the specified `value` to a string.
 *
 * @tsplus fluent effect/parser/Printer printString
 */
export function printString_<Error, Value>(
  self: Printer<Error, string, Value>,
  value: Value
): Either<Error, string> {
  return self.printChunk(value).map((chunk) => chunk.join(""))
}

/**
 * Prints the specified `value` to a string.
 *
 * @tsplus static effect/parser/Printer.Aspects printString
 */
export const printString = Pipeable(printString_)
