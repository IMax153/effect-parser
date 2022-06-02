import { toLiteralChars } from "@effect/parser/Regex/operations/_internal/toLiteralChars"

/**
 * If the regex is a string literal, returns the string literal.
 *
 * @tsplus fluent effect/parser/Regex toLiteral
 */
export function toLiteral(self: Regex): Option<Chunk<string>> {
  return toLiteralChars(self)
}
