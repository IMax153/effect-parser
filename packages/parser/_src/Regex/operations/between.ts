import { Repeat } from "@effect/parser/Regex/definition"

/**
 * Returns a new regex that matches between `min` and `max` occurrences of this
 * regex.
 *
 * @tsplus fluent effect/parser/Regex between
 */
export function between_(self: Regex, min: number, max: number): Regex {
  return new Repeat(self, Option.some(min), Option.some(max))
}

/**
 * Returns a new regex that matches between `min` and `max` occurrences of this
 * regex.
 *
 * @tsplus static effect/parser/Regex.Aspects between
 */
export const between = Pipeable(between_)
