/**
 * A `Parser` of a single alpha-numeric character.
 *
 * @tsplus static effect/parser/Parser.Ops alphaNumeric
 */
export const alphaNumeric: Parser<string, string, string> = Parser.regexChar(
  Regex.anyAlphaNumeric,
  "not alphanumeric"
)
