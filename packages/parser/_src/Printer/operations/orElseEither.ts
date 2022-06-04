import { Lazy, OrElseEither } from "@effect/parser/Printer/definition/primitives"

/**
 * Prints `self` if the input is `Left`, or prints `that` if the input is
 * `Right`.
 *
 * @tsplus fluent effect/parser/Printer orElseEither
 */
export function orElseEither_<Error, Output, Value, Error2, Output2, Value2>(
  self: Printer<Error, Output, Value>,
  that: LazyArg<Printer<Error2, Output2, Value2>>
): Printer<Error2, Output & Output2, Either<Value, Value2>> {
  return new OrElseEither(new Lazy(() => self), new Lazy(that))
}

/**
 * Prints `self` if the input is `Left`, or prints `that` if the input is
 * `Right`.
 *
 * @tsplus static effect/parser/Printer.Aspects orElseEither
 */
export const orElseEither = Pipeable(orElseEither_)
