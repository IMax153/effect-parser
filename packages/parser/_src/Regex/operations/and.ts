import { And } from "@effect/parser/Regex/definition"

/**
 * Composes this regex with the specified regex using intersection, returning a
 * regex that will match a prefix only if both this and the specified regex
 * match it.
 *
 * @tsplus operator effect/parser/Regex &
 * @tsplus fluent effect/parser/Regex and
 */
export function and_(self: Regex, that: Regex): Regex {
  return new And(self, that)
}

/**
 * Composes this regex with the specified regex using intersection, returning a
 * regex that will match a prefix only if both this and the specified regex
 * match it.
 *
 * @tsplus static effect/parser/Regex.Aspects and
 */
export const and = Pipeable(and_)
