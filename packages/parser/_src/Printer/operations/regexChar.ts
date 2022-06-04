import { ParseRegexLastChar } from "@effect/parser/Printer/definition/primitives"

/**
 * A `Printer` that prints a single character if matches the specified `regex`,
 * otherwise fails with `failure`.
 *
 * @tsplus static effect/parser/Printer.Ops regexChar
 */
export function regexChar<Error>(regex: Regex, failure: Error): Printer<Error, string, string> {
  return new ParseRegexLastChar(regex, Option.some(failure))
}
