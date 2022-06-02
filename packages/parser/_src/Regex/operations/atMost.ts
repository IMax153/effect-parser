import { Repeat } from "@effect/parser/Regex/definition"

/**
 * Returns a new regex that matches at most `max` occurrences of this regex.
 *
 * @tsplus fluent effect/parser/Regex atMost
 */
export function atMost_(self: Regex, max: number): Regex {
  return new Repeat(self, Option.none, Option.some(max))
}

/**
 * Returns a new regex that matches at most `max` occurrences of this regex.
 *
 * @tsplus static effect/parser/Regex.Aspects atMost
 */
export const atMost = Pipeable(atMost_)
