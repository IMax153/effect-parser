/**
 * A `Printer` that prints a single character unless it matches any of the
 * specified `chars`.
 *
 * @tsplus static effect/parser/Printer.Ops charNotIn
 */
export function charNotIn(chars: string): Printer<string, string, string> {
  return Printer.regexChar(
    Regex.charNotIn(chars),
    `one of the excluded characters (${chars.split("").join(", ")})`
  )
}
