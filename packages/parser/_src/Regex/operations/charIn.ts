import { OneOf } from "@effect/parser/Regex/definition"

/**
 * A regex that matches one of the specified characters.
 *
 * @tsplus static effect/parser/Regex.Ops charIn
 */
export function charIn(chars: string): Regex {
  return new OneOf(BitSet(chars.split("").map((char) => char.charCodeAt(0))))
}
