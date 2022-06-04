/**
 * Parse or print a single character or fail with the specified `failure` if it
 * is `value`.
 *
 * @tsplus static effect/parser/Syntax.Ops notCharWithFailure
 */
export function notCharWithFailure<Error>(
  value: string,
  failure: Error
): Syntax<Error, string, string, string> {
  return Syntax.regexChar(Regex.charNotIn(value), failure)
}
