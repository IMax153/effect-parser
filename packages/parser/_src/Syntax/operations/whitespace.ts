/**
 * A `Syntax` of a single whitespace character.
 *
 * @tsplus static effect/parser/Syntax.Ops whitespace
 */
export const whitespace: Syntax<string, string, string, string> = Syntax.regexChar(
  Regex.anyWhitespace,
  "not a letter"
)
