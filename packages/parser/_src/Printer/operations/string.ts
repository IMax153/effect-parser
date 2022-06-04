/**
 * A `Printer` which prints a the specified string `str` and results in the
 * specified `value`.
 *
 * @tsplus static effect/parser/Printer.Ops string
 */
export function string<Value>(str: string, value: Value): Printer<never, string, Value> {
  return Printer.regexDiscard(Regex.string(str), Chunk.from(str.split(""))).asPrinted(value, undefined)
}
