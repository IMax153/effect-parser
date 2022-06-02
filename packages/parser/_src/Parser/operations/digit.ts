/**
 * A `Parser` of a single digit.
 *
 * @tsplus static effect/parser/Parser.Ops digit
 */
export const digit: Parser<string, string, string> = Parser.regexChar(Regex.anyDigit, "not a digit")
