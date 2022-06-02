/**
 * Constructs a `Parser` that consumes the exact character `value` specified,
 * returning the unit value, or fails with the specified `failure`.
 *
 * @tsplus static effect/parser/Parser.Ops charFailingWith
 */
export function charFailingWith<Error>(value: string, failure: Error): Parser<Error, string, void> {
  return Parser.regexDiscard(Regex.charIn(value), failure)
}
