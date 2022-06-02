import { OneOf } from "@effect/parser/Regex/definition"

/**
 * A regex that matches any character except of the specified ones.
 *
 * @tsplus static effect/parser/Regex.Ops charNotIn
 */
export function charNotIn(...chars: Array<string>): Regex {
  return new OneOf(chars.reduce((bitset, char) => bitset.remove(char.charCodeAt(0)), BitSet.AllChars))
}
