import { Lazy, OrElse } from "@effect/parser/Printer/definition/primitives"

/**
 * Prints `self` unless it fails, in which case the printed output is ignored
 * and `that` is printed instead.
 *
 * @tsplus operator effect/parser/Printer |
 * @tsplus fluent effect/parser/Printer orElse
 */
export function orElse_<Error, Output, Value, Error2, Output2, Value2>(
  self: Printer<Error, Output, Value>,
  that: LazyArg<Printer<Error2, Output2, Value2>>
): Printer<Error2, Output & Output2, Value | Value2> {
  return new OrElse(new Lazy(() => self), new Lazy(that))
}

/**
 * Prints `self` unless it fails, in which case the printed output is ignored
 * and `that` is printed instead.
 *
 * @tsplus static effect/parser/Printer.Aspects orElse
 */
export const orElse = Pipeable(orElse_)
