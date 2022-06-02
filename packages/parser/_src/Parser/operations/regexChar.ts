import { ParseRegexLastChar } from "@effect/parser/Parser/definition/primitives"

/**
 * Constructs a `Parser` that executes a regular expression on the input and
 * results in the last parsed character, or fails with the specified `failure`.
 * Useful for regexes that are known to parse a single character.
 *
 * @tsplus static effect/parser/Parser.Ops regexChar
 */
export function regexChar<Error>(regex: Regex, failure: Error): Parser<Error, string, string> {
  return new ParseRegexLastChar(regex, Option.some(failure))
}
