/**
 * Flattens a result of parsed strings to a single string.
 *
 * @tsplus fluent effect/parser/Parser flatten
 */
export function flatten<Error, Input>(
  self: Parser<Error, Input, Chunk<string>>
): Parser<Error, Input, string> {
  return self.map((chunk) => chunk.join(""))
}
