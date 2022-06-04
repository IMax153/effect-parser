/**
 * A `Syntax` that during parsing executes a regular expression on the input and
 * results in the last parsed character, or fails with the specified `failure`.
 * Useful for regexes that are known to parse a single character. The printer
 * prints the character provided as input value.
 *
 * @tsplus static effect/parser/Syntax.Ops regexChar
 */
export function regexChar<Error>(
  regex: Regex,
  failure: Error
): Syntax<Error, string, string, string> {
  return Syntax(
    Parser.regexChar(regex, failure),
    Printer.regexChar(regex, failure)
  )
}
