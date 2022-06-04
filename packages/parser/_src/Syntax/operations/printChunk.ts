/**
 * Print the given `value` to a chunk of output elements.
 *
 * @tsplus fluent effect/parser/Syntax printChunk
 */
export function printChunk_<Error, Input, Output, Value>(
  self: Syntax<Error, Input, Output, Value>,
  value: Value
): Either<Error, Chunk<Output>> {
  return self.asPrinter.printChunk(value)
}

/**
 * Print the given `value` to a chunk of output elements.
 *
 * @tsplus static effect/parser/Syntax.Aspects printChunk
 */
export const printChunk = Pipeable(printChunk_)
