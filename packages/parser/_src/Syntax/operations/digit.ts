/**
 * A `Syntax` of a single digit.
 *
 * @tsplus static effect/parser/Syntax.Ops digit
 */
export const digit: Syntax<string, string, string, string> = Syntax.regexChar(
  Regex.anyDigit,
  "not a digit"
)
