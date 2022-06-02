/**
 * A regex that matches zero or more whitespace characters.
 *
 * @tsplus static effect/parser/Regex.Ops whitespace
 */
export const whitespace: Regex = Regex.anyWhitespace.atLeast(0)
