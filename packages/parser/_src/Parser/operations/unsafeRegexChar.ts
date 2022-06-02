import { ParseRegexLastChar } from "@effect/parser/Parser/definition/primitives"

/**
 * Constructs a `Parser` that executes a regular expression on the input and
 * results in the last parsed character. The provided `Regex` is supposed to
 * **never** fail. Useful for regexes that are known to parse a single
 * character.
 *
 * @tsplus static effect/parser/Parser.Ops unsafeRegexChar
 */
export function unsafeRegexChar(regex: Regex): Parser<never, string, string> {
  return new ParseRegexLastChar(regex, Option.none)
}
