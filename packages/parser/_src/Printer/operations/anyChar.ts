/**
 * A `Printer` that prints a single character provided as input.
 *
 * @tsplus static effect/parser/Printer.Ops anyChar
 */
export const anyChar: Printer<never, string, string> = Printer.unsafeRegexChar(Regex.anyChar)
