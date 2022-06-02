/**
 * A regex that matches at least one letter or digit character.
 *
 * @tsplus static effect/parser/Regex.Ops alphaNumerics
 */
export const alphaNumerics: Regex = Regex.anyAlphaNumeric.atLeast(1)
