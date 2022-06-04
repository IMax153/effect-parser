/**
 * Prints a single letter.
 *
 * @tsplus static effect/parser/Printer.Ops letter
 */
export const letter: Printer<string, string, string> = Printer
  .regexChar(Regex.anyLetter, "not a letter")
