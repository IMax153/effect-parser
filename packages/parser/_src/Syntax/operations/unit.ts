/**
 * A `Syntax` that always results in the unit value.
 *
 * @tsplus static effect/parser/Syntax.Ops unit
 */
export const unit: Syntax<never, unknown, never, void> = Syntax.succeed<void>(undefined)
