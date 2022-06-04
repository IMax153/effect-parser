/**
 * A `Syntax` that parses/prints a single character.
 *
 * @tsplus static effect/parser/Syntax.Ops anyChar
 */
export const anyChar: Syntax<never, string, string, string> = Syntax.unsafeRegexChar(Regex.anyChar)
