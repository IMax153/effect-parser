/**
 * Syntax that executes a regular expression on the input and results in the
 * chunk of the parsed characters. The provided `Regex` is supposed to **never**
 * fail.
 *
 * @tsplus static effect/parser/Syntax.Ops unsafeRegex
 */
export function unsafeRegex(regex: Regex): Syntax<never, string, string, Chunk<string>> {
  return Syntax(
    Parser.unsafeRegex(regex),
    Printer.unsafeRegex(regex)
  )
}
