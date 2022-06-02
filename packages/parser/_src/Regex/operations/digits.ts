/**
 * A regex that matches one or more digit characters.
 *
 * @tsplus static effect/parser/Regex.Ops digits
 */
export const digits: Regex = Regex.anyDigit.atLeast(1)
