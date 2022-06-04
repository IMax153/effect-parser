/**
 * Concatenates a chunk of strings to be printed.
 *
 * @tsplus fluent effect/parser/Printer flatten
 */
export function flatten<Error, Output>(
  self: Printer<Error, Output, Chunk<string>>
): Printer<Error, Output, string> {
  return self.contramap((s: string) => Chunk.from(s.split("")))
}
