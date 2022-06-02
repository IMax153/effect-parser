/**
 * A `Parser` that consumes the whole input and captures it as a string.
 *
 * @tsplus static effect/parser/Parser.Ops anyString
 */
export const anyString: Parser<never, string, string> = Parser.unsafeRegexDiscard(Regex.anyChar.atLeast(0)).asString()
