/**
 * Syntax that executes a regular expression on the input and results in the
 * chunk of the parsed characters, or fails with the specified `failure`.
 *
 * @tsplus static effect/parser/Syntax.Ops regex
 */
export function regex<Error>(
  regex: Regex,
  failure: Error
): Syntax<Error, string, string, Chunk<string>> {
  return Syntax(
    Parser.regex(regex, failure),
    Printer.regex(regex, failure)
  )
}
