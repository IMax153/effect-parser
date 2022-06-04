/**
 * Parse with a given regular expression and discard its results. If the regex
 * fails, fail with the specified `failure`. When printing, the chunk of
 * characters in `value` gets printed.
 *
 * @tsplus static effect/parser/Syntax.Ops regexDiscard
 */
export function regexDiscard<Error>(
  regex: Regex,
  failure: Error,
  value: Chunk<string>
): Syntax<Error, string, string, void> {
  return Syntax(
    Parser.regexDiscard(regex, failure),
    Printer.regexDiscard(regex, value)
  )
}
