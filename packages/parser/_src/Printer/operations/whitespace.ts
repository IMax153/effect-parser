/**
 * Prints a single whitespace character.
 *
 * @tsplus static effect/parser/Printer.Ops whitespace
 */
export const whitespace: Printer<string, string, string> = Printer
  .regexChar(Regex.anyWhitespace, "not a whitespace character")
