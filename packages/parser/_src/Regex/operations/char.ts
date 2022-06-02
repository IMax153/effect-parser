/**
 * A regex that matches the specified character.
 *
 * @tsplus static effect/parser/Regex.Ops char
 */
export function char(char: string): Regex {
  return Regex.charIn(char)
}
