/**
 * Constructs a `Parser` that consumes a single character and returns the parsed
 * character as its result, or fails with the specified `failure` if the parsed
 * character matches the character specified by `value`.
 *
 * @tsplus static effect/parser/Parser.Ops notCharFailingWith
 */
export function notCharFailingWith<Error>(value: string, failure: Error): Parser<Error, string, string> {
  return Parser.regexChar(Regex.charNotIn(value), failure)
}
