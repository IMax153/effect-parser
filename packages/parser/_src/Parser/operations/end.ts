import { End } from "@effect/parser/Parser/definition/primitives"

/**
 * A `Parser` that only succeeds if the input stream has been consumed fully.
 *
 * This can be used to require that a parser consumes the full input.
 *
 * @tsplus static effect/parser/Parser.Ops end
 */
export const end: Parser<never, unknown, void> = new End()
