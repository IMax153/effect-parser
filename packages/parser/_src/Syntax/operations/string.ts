/**
 * A `Syntax` that parses/prints a specific string `str`, and results in `value`.
 *
 * @tsplus static effect/parser/Syntax.Ops string
 */
export function string<Value>(
  str: string,
  value: Value
): Syntax<string, string, string, Value> {
  return Syntax.regexDiscard(
    Regex.string(str),
    `not '${str}'`,
    Chunk.from(str.split(""))
  ).asPrinted(value, undefined)
}
