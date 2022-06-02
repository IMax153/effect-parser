/**
 * A `Parser` that does not consume any input and results in unit.
 *
 * @tsplus static effect/parser/Parser.Ops unit
 */
export const unit: Parser<never, unknown, void> = Parser.succeed(undefined)
