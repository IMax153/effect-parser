import { Lazy } from "@effect/parser/Printer/definition/primitives"

/**
 * Lazily constructs a `Printer`.
 *
 * @tsplus static effect/parser/Printer.Ops lazy
 */
export function lazy<Error, Output, Value>(
  printer: LazyArg<Printer<Error, Output, Value>>
): Printer<Error, Output, Value> {
  return new Lazy(printer)
}
