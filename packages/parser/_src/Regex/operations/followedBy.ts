import { Sequence } from "@effect/parser/Regex/definition"

/**
 * Sequentially composes this regex with the specified regex, returning a regex
 * that will first match this one, a then match the specified regex.
 *
 * @tsplus operator effect/parser/Regex >
 * @tsplus fluent effect/parser/Regex followedBy
 */
export function followedBy_(self: Regex, that: Regex): Regex {
  return new Sequence(self, that)
}

/**
 * Sequentially composes this regex with the specified regex, returning a regex
 * that will first match this one, a then match the specified regex.
 *
 * @tsplus static effect/parser/Regex.Aspects followedBy
 */
export const followedBy = Pipeable(followedBy_)
