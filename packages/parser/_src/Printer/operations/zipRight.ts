import { Lazy, ZipRight } from "@effect/parser/Printer/definition/primitives"

/**
 * Print `self`, then print `that` and use the `that` printer's result value.
 * Both printers get the same value to be printed.
 *
 * @tsplus operator effect/parser/Printer >
 * @tsplus fluent effect/parser/Printer zipRight
 */
export function zipRight_<Error, Output, Value, Error2, Output2, Value2>(
  self: Printer<Error, Output, Value>,
  that: LazyArg<Printer<Error2, Output2, Value2>>
): Printer<Error | Error2, Output & Output2, Value2> {
  return new ZipRight(new Lazy(() => self), new Lazy(that))
}

/**
 * Print `self`, then print `that` and use the `that` printer's result value.
 * Both printers get the same value to be printed.
 *
 * @tsplus static effect/parser/Printer.Aspects zipRight
 */
export const zipRight = Pipeable(zipRight_)
