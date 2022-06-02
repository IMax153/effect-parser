/**
 * Constructs a `Parser` that consumes the exact character `value` specified,
 * returning the unit value, or fails with the specified `failure`.
 *
 * @tsplus static effect/parser/Parser.Ops char
 */
export function char(value: string): Parser<string, string, void> {
  return Parser.charFailingWith(value, `not '${value}'`)
}
