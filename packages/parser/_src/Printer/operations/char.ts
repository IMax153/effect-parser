/**
 * A `Printer` that prints the specified `char` and results in unit.
 *
 * @tsplus static effect/parser/Printer.Ops char
 */
export function char(char: string): Printer<string, string, void> {
  return Printer.regexDiscard(Regex.charIn(char), Chunk(char))
}
