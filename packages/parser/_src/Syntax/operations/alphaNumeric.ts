/**
 * A `Syntax` of a single alpha-numeric character.
 *
 * @tsplus static effect/parser/Syntax.Ops alphaNumeric
 */
export const alphaNumeric: Syntax<string, string, string, string> = Syntax.regexChar(
  Regex.anyAlphaNumeric,
  "not alphanumeric"
)
