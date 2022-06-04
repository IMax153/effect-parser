import type { Unzip } from "@effect/parser/Printer/definition/primitives"
import { Lazy, Zip } from "@effect/parser/Printer/definition/primitives"

function unmerge<A>(_a: A): Unzip<A> {
  // @ts-expect-error
  return Tuple.isTuple(_a) ?
    Tuple(..._a.tuple.slice(0, _a.tuple.length - 1), _a.tuple[_a.tuple.length - 1]) :
    Tuple(undefined, _a)
}

/**
 * Takes a pair to be printed and prints the left value with `self`, and the right
 * value with `that`. The result is a pair of both printer's results.
 *
 * @tsplus operator effect/parser/Printer +
 * @tsplus fluent effect/parser/Printer zip
 */
export function zip_<Error, Output, Value, Error2, Output2, Value2>(
  self: Printer<Error, Output, Value>,
  that: LazyArg<Printer<Error2, Output2, Value2>>
): Printer<Error | Error2, Output & Output2, Tuple<[Value, Value2]>> {
  // @ts-expect-error
  return new Zip(new Lazy(() => self), new Lazy(that), unmerge)
}

/**
 * Takes a pair to be printed and prints the left value with `self`, and the right
 * value with `that`. The result is a pair of both printer's results.
 *
 * @tsplus static effect/parser/Printer.Ops zip
 */
export const zip = Pipeable(zip_)
