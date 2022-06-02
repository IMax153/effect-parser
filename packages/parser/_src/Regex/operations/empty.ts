import { Succeed } from "@effect/parser/Regex/definition"

/**
 * A regex that matches the empty string, which will always succeed.
 *
 * @tsplus static effect/parser/Regex.Ops empty
 */
export const empty: Regex = new Succeed()
