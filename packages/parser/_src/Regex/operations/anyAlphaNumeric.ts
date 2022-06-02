/**
 * A regex that matches a single letter or digit character.
 *
 * @tsplus static effect/parser/Regex.Ops anyAlphaNumeric
 */
export const anyAlphaNumeric: Regex = Regex.anyLetter | Regex.anyDigit
