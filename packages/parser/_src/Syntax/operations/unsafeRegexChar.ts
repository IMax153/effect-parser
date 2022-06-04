/**
 * A `Syntax` that during parsing executes a regular expression on the input and
 * results in the last parsed character. The provided `Regex` is supposed to
 * **never** fail. Useful for regexes that are known to parse a single character.
 * The printer prints the character provided as input value.
 *
 * @tsplus static effect/parser/Syntax.Ops unsafeRegexChar
 */
export function unsafeRegexChar(regex: Regex): Syntax<never, string, string, string> {
  return Syntax(
    Parser.unsafeRegexChar(regex),
    Printer.unsafeRegexChar(regex)
  )
}
