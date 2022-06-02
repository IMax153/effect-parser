/**
 * Constructs a `Parser` that consumes a single character and succeeds with it
 * if it is **NOT** one of the specified `chars`.
 *
 * @tsplus static effect/parser/Parser.Ops charNotIn
 */
export function charNotIn(...chars: Array<string>): Parser<string, string, string> {
  return Parser.regexChar(Regex.charNotIn(...chars), `one of the excluded characters (${chars.join(", ")})`)
}
