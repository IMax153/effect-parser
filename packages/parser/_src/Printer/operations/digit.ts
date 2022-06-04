/**
 * Prints a single digit.
 *
 * @tsplus static effect/parser/Printer.Ops digit
 */
export const digit: Printer<string, string, string> = Printer
  .regexChar(Regex.anyDigit, "not a digit")
