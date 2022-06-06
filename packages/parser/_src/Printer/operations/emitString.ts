/**
 * A `Printer` emitting a specific string to a character output.
 *
 * @tsplus static effect/parser/Printer.Ops emitString
 */
export function emitString(str: string): Printer<never, string, unknown> {
  return Printer.anyString.provide(str)
}
