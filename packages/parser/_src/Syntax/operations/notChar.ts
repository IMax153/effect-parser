/**
 * Parse or print a single character or fail if it is `value`.
 *
 * @tsplus static effect/parser/Syntax.Ops notChar
 */
export function notChar<Error>(value: string): Syntax<string, string, string, string> {
  return Syntax.regexChar(Regex.charNotIn(value), `cannot be '${value}'`)
}
