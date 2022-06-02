/**
 * A `Parser` that consumes a single character and returns it.
 *
 * @tsplus static effect/parser/Parser.Ops anyChar
 */
export const anyChar: Parser<never, string, string> = Parser.unsafeRegexChar(Regex.anyChar)
