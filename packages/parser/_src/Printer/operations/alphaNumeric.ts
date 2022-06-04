/**
 * Prints a single alpha-numeric character.
 *
 * @tsplus static effect/parser/Printer alphaNumeric
 */
export const alphaNumeric: Printer<string, string, string> = Printer
  .regexChar(Regex.anyAlphaNumeric, "not alphanumeric")
