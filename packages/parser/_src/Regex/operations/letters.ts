/**
 * A regex that matches any one or more letter characters.
 *
 * @tsplus static effect/parser/Regex.Ops letters
 */
export const letters: Regex = Regex.anyLetter.atLeast(1)
