import { OneOf } from "@effect/parser/Regex/definition"

/**
 * A regex that matches any single character.
 *
 * @tsplus static effect/parser/Regex.Ops anyChar
 */
export const anyChar: Regex = new OneOf(BitSet.AllChars)
