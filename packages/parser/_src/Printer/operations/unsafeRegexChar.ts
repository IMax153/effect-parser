import { ParseRegexLastChar } from "@effect/parser/Printer/definition/primitives"

/**
 * A `Printer` that prints a single character if matches the specified `regex`.
 * The provided `Regex` is supposed to **never** fail.
 *
 * @tsplus static effect/parser/Printer.Ops unsafeRegexChar
 */
export function unsafeRegexChar(regex: Regex): Printer<never, string, string> {
  return new ParseRegexLastChar(regex, Option.none)
}
