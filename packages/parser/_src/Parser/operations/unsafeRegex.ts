import { ParseRegex } from "@effect/parser/Parser/definition/primitives"

/**
 * Constructs a `Parser` that executes a regular expression on the input and
 * results in the chunk of the parsed characters. The provided `Regex` is
 * supposed to **never** fail.
 *
 * @tsplus static effect/parser/Parser.Ops unsafeRegex
 */
export function unsafeRegex(regex: Regex): Parser<never, string, Chunk<string>> {
  return new ParseRegex(regex, Option.none)
}
