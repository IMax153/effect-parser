import { Repeat } from "@effect/parser/Regex/definition"

/**
 * Returns a new regex that matches at least `min` occurrences of this regex.
 *
 * @tsplus fluent effect/parser/Regex atLeast
 */
export function atLeast_(self: Regex, min: number): Regex {
  return new Repeat(self, Option.some(min), Option.none)
}

/**
 * Returns a new regex that matches at least `min` occurrences of this regex.
 *
 * @tsplus static effect/parser/Regex.Aspects atLeast
 */
export const atLeast = Pipeable(atLeast_)
