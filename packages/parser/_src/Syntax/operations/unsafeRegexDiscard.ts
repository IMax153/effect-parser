/**
 * Parse with a given regular expression and discard its results. The provided
 * `Regex` is supposed to **never** fail. When printing, the chunk of characters
 * in `value` gets printed.
 *
 * @tsplus static effect/parser/Syntax.Ops unsafeRegexDiscard
 */
export function unsafeRegexDiscard(
  regex: Regex,
  value: Chunk<string>
): Syntax<never, string, string, void> {
  return Syntax(
    Parser.unsafeRegexDiscard(regex),
    Printer.regexDiscard(regex, value)
  )
}
