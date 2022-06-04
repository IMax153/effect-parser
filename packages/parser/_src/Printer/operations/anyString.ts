/**
 * A `Printer` that just prints the input string.
 *
 * @tsplus static effect/parser/Printer.Ops anyString
 */
export const anyString: Printer<never, string, string> = Printer
  .unsafeRegex(Regex.anyChar.atLeast(0))
  .contramap((s: string) => Chunk.from(s.split("")))
