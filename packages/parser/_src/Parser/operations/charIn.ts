/**
 * Constructs a `Parser` that consumes a single character and succeeds with it
 * if it is one of the specified `chars`.
 *
 * @tsplus static effect/parser/Parser.Ops charIn
 */
export function charIn(...chars: Array<string>): Parser<string, string, string> {
  return Parser.regexChar(Regex.charIn(...chars), `not one of the expected characters (${chars.join(", ")})`)
}
