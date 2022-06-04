import { Lazy, ZipLeft } from "@effect/parser/Printer/definition/primitives"

/**
 * Print `that` by providing the unit value to it after printing this. The
 * result is the `self` printer's result.
 *
 * @tsplus operator effect/parser/Printer <
 * @tsplus fluent effect/parser/Printer zipLeft
 */
export function zipLeft_<Error, Output, Value, Error2, Output2, Value2>(
  self: Printer<Error, Output, Value>,
  that: LazyArg<Printer<Error2, Output2, Value2>>
): Printer<Error | Error2, Output & Output2, Value> {
  return new ZipLeft(new Lazy(() => self), new Lazy(that))
}

/**
 * Print `that` by providing the unit value to it after printing this. The
 * result is the `self` printer's result.
 *
 * @tsplus static effect/parser/Printer.Aspects zipLeft
 */
export const zipLeft = Pipeable(zipLeft_)
