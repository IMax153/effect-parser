/**
 * A `Printer` that prints a single character if it matches any of the given
 * `chars`.
 *
 * @tsplus static effect/parser/Printer.Ops charIn
 */
export function charIn(chars: string): Printer<string, string, string> {
  return Printer.regexChar(
    Regex.charIn(chars),
    `not one of the expected characters (${chars.split("").join(", ")})`
  )
}
