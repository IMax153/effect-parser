import { ParseRegex } from "@effect/parser/Parser/definition/primitives"

/**
 * Constructs a `Parser` that executes a regular expression on the input and
 * results in the chunk of the parsed characters, or fails with the specified
 * `failure`.
 *
 * @tsplus static effect/parser/Parser.Ops regex
 */
export function regex<Error>(regex: Regex, failure: Error): Parser<Error, string, Chunk<string>> {
  return new ParseRegex(regex, Option.some(failure))
}
