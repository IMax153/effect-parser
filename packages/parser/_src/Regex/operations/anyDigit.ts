/**
 * A regex that matches any single digit character.
 *
 * @tsplus static effect/parser/Regex.Ops anyDigit
 */
export const anyDigit: Regex = Regex.filter((char) => "0123456789".indexOf(char) !== -1)
