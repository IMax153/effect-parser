/**
 * A `Printer` that prints the input character if it is not equal to the
 * specified `char`, otherwise fails.
 *
 * @tsplus static effect/parser/Printer.Ops notChar
 */
export function notChar(char: string): Printer<string, string, string> {
  return Printer.regexChar(Regex.charNotIn(char), `not ${char}`)
}
