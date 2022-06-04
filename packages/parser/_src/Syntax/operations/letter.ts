/**
 * A `Syntax` of a single letter.
 *
 * @tsplus static effect/parser/Syntax.Ops letter
 */
export const letter: Syntax<string, string, string, string> = Syntax.regexChar(
  Regex.anyLetter,
  "not a letter"
)
