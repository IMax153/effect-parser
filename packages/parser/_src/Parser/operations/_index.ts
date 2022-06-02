import { Index } from "@effect/parser/Parser/definition/primitives"

/**
 * A `Parser` that results in the current input stream position.
 *
 * @tsplus static effect/parser/Parser.Ops index
 */
export const index: Parser<never, unknown, number> = new Index()
