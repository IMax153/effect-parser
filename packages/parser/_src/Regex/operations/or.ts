import { Or } from "@effect/parser/Regex/definition"

/**
 * Composes this regex with the specified regex using union, returning a regex
 * that will match a prefix only if either this or the specified regex match it.
 *
 * @tsplus operator effect/parser/Regex |
 * @tsplus fluent effect/parser/Regex or
 */
export function or_(self: Regex, that: Regex): Regex {
  return new Or(self, that)
}

/**
 * Composes this regex with the specified regex using union, returning a regex
 * that will match a prefix only if either this or the specified regex match it.
 *
 * @tsplus static effect/parser/Regex.Aspects or
 */
export const or = Pipeable(or_)
