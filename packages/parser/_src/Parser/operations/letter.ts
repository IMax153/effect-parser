/**
 * A `Parser` of a single letter.
 *
 * @tsplus static effect/parser/Parser.Ops letter
 */
export const letter: Parser<string, string, string> = Parser.regexChar(Regex.anyLetter, "not a letter")
