const IS_WHITESPACE_REGEX = /^\s$/

/**
 * A regex that matches any single whitespace character.
 *
 * @tsplus static effect/parser/Regex.Ops anyWhitespace
 */
export const anyWhitespace: Regex = Regex.filter((char) => IS_WHITESPACE_REGEX.test(char))
