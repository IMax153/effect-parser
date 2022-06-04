/**
 * Flattens a result of parsed strings to a single string.
 *
 * @tsplus fluent effect/parser/Syntax flatten
 */
export function flatten<Error, Input, Output>(
  self: Syntax<Error, Input, Output, Chunk<string>>
): Syntax<Error, Input, Output, string> {
  return self.transform(
    (chunk) => chunk.join(""),
    (string) => Chunk.from(string.split(""))
  )
}
