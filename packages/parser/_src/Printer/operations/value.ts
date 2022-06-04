import { Passthrough, ProvideValue } from "@effect/parser/Printer/definition/primitives"

/**
 * A `Printer` emitting a specific value.
 *
 * @tsplus static effect/parser/Printer.Ops value
 */
export function value<Output>(value: Output): Printer<never, Output, unknown> {
  return new ProvideValue(new Passthrough(), value)
}
