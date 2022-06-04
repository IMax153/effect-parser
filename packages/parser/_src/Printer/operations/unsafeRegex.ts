import { ParseRegex } from "@effect/parser/Printer/definition/primitives"

/**
 * A `Printer` that prints a series of characters provided as input, if it
 * matches the specified `regex`. The provided `Regex` is supposed to **never**
 * fail.
 *
 * @tsplus static effect/parser/Printer.Ops unsafeRegex
 */
export function unsafeRegex(regex: Regex): Printer<never, string, Chunk<string>> {
  return new ParseRegex(regex, Option.none)
}
