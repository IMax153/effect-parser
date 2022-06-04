import { ChunkTarget } from "@effect/parser/Target"

/**
 * Print the given `value` to a chunk of output elements.
 *
 * @tsplus fluent effect/parser/Printer printChunk
 */
export function printChunk_<Error, Output, Value>(
  self: Printer<Error, Output, Value>,
  value: Value
): Either<Error, Chunk<Output>> {
  const target = new ChunkTarget<Output>()
  return self.print(value, target).map(() => target.result())
}

/**
 * Print the given `value` to a chunk of output elements.
 *
 * @tsplus static effect/parser/Printer.Aspects printChunk
 */
export const printChunk = Pipeable(printChunk_)
