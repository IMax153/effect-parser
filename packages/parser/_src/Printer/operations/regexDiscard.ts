import { SkipRegex } from "@effect/parser/Printer/definition/primitives"

/**
 * A `Printer` that prints the given chunk of characters.
 *
 * @tsplus static effect/parser/Printer.Ops regexDiscard
 */
export function regexDiscard(regex: Regex, chars: Chunk<string>): Printer<never, string, void> {
  return new SkipRegex(regex, chars)
}
