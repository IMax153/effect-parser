import { SkipRegex } from "@effect/parser/Parser/definition/primitives"

/**
 * Constructs a `Parser` that executes a regular expression on the input and
 * discards its result. The provided `Regex` is supposed to **never** fail.
 *
 * @tsplus static effect/parser/Parser.Ops unsafeRegexDiscard
 */
export function unsafeRegexDiscard(regex: Regex): Parser<never, string, void> {
  return new SkipRegex(regex, Option.none)
}
