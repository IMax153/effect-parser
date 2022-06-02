/**
 * Constructs a `Parser` that consumes a single character and returns the parsed
 * character as its result, or fails if the parsed character matches the
 * character specified by `value`.
 *
 * @tsplus static effect/parser/Parser.Ops notChar
 */
export function notChar(value: string): Parser<string, string, string> {
  return Parser.regexChar(Regex.charNotIn(value), `cannot be '${value}'`)
}
