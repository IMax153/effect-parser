/**
 * A `Syntax` that parses/prints a single character that matches one of the
 * characters in `chars`.
 *
 * @tsplus static effect/parser/Syntax.Ops charIn
 */
export function charIn(chars: string): Syntax<string, string, string, string> {
  return Syntax.regexChar(
    Regex.charIn(chars),
    `not one of the expected characters (${chars.split("").join(", ")})`
  )
}
