/**
 * A `Parser` of a single whitespace character.
 *
 * @tsplus static effect/parser/Parser.Ops whitespace
 */
export const whitespace: Parser<string, string, string> = Parser.regexChar(
  Regex.whitespace,
  "not a whitespace character"
)
