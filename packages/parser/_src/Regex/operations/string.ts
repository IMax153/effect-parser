/**
 * A regex that matches the specified literal string.
 *
 * @tsplus static effect/parser/Regex.Ops string
 */
export function string(token: string): Regex {
  return token.split("").map((char) => Regex.charIn(char)).reduce((acc, curr) => acc > curr, Regex.empty)
}
