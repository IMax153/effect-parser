import { ParseRegex } from "@effect/parser/Printer/definition/primitives"

/**
 * A `Printer` that prints a series of characters provided as input, if it
 * matches the specified `regex`. Otherwise fails with the specified `failure`.
 *
 * @tsplus static effect/parser/Printer.Ops regex
 */
export function regex<Error>(regex: Regex, failure: Error): Printer<Error, string, Chunk<string>> {
  return new ParseRegex(regex, Option.some(failure))
}
