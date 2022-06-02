const IS_LETTER_REGEX = /^[a-z]$/

/**
 * A regex that matches any single letter character.
 *
 * @tsplus static effect/parser/Regex.Ops anyLetter
 */
export const anyLetter: Regex = Regex.filter((char) => IS_LETTER_REGEX.test(char.toLowerCase()))
