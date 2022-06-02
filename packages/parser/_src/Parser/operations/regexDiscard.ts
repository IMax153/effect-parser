import { SkipRegex } from "@effect/parser/Parser/definition/primitives"

/**
 * Constructs a `Parser` that executes a regular expression on the input and
 * discards its result. The `Parser` will fail with the specified `failure` if
 * the `Regex` fails.
 *
 * @tsplus static effect/parser/Parser.Ops regexDiscard
 */
export function regexDiscard<Error>(regex: Regex, failure: Error): Parser<Error, string, void> {
  return new SkipRegex(regex, Option.some(failure))
}
