import { Passthrough } from "@effect/parser/Printer/definition/primitives"

/**
 * A `Printer` that just emits its input value.
 *
 * @tsplus static effect/parser/Printer.Ops any
 */
export const any: Printer<never, never, unknown> = new Passthrough()
