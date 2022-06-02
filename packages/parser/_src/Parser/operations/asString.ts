import { CaptureString } from "@effect/parser/Parser/definition/primitives"

/**
 * Ignores this parser's result and instead capture the parsed string fragment.
 *
 * @tsplus fluent effect/parser/Parser asString
 */
export function asString<Error, Result>(self: Parser<Error, string, Result>): Parser<Error, string, string> {
  return new CaptureString(self)
}
