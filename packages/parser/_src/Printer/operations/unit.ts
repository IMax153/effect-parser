import { Succeed } from "@effect/parser/Printer/definition/primitives"

/**
 * A `Printer` that takes no input and does not emit anything.
 *
 * @tsplus static effect/parser/Printer.Ops unit
 */
export const unit: Printer<never, never, unknown> = new Succeed(undefined)
