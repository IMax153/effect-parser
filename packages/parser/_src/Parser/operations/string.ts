/**
 * Parser that parses the specified string `str`, and if it succeeds will result
 * in the specified `value`.
 *
 * @tsplus static effect/parser/Parser.Ops string
 */
export function string<Result>(str: string, value: Result): Parser<string, string, Result> {
  return Parser.regexDiscard(Regex.string(str), `not "${str}"`).as(value)
}
