/**
 * A `Syntax` that parses/prints a single character that does not match any of
 * the characters in `chars`.
 *
 * @tsplus static effect/parser/Syntax.Ops charNotIn
 */
export function charNotIn(chars: string): Syntax<string, string, string, string> {
  return Syntax.regexChar(
    Regex.charNotIn(chars),
    `one of the excluded characters (${chars.split("").join(", ")})`
  )
}
