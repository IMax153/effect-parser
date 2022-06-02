/**
 * A `Parser` that consumes and discards all the remaining input.
 *
 * @tsplus static effect/parser/Parser.Ops ignoreRest
 */
export const ignoreRest: Parser<never, string, void> = Parser.unsafeRegexDiscard(Regex.anyChar.atLeast(0))
