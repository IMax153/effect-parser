/**
 * Parse or print a specified character `value` resulting in the unit value, or
 * fail.
 *
 * @tsplus static effect/parser/Syntax.Ops charWithFailure
 */
export function char(value: string): Syntax<string, string, string, void> {
  return Syntax.regexDiscard(Regex.charIn(value), `not '${value}'`, Chunk(value))
}
