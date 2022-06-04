import { Succeed } from "@effect/parser/Printer/definition/primitives"

/**
 * A `Printer` that always emits the specified value.
 *
 * @tsplus static effect/parser/Printer.Ops succeed
 */
export function succeed<Value>(value: Value): Printer<never, never, Value> {
  return new Succeed(value)
}
