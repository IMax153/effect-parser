/**
 * Specifies a filter condition that gets checked on the resulting value,
 * failing with the specified `failure` if the filter condition returns false.
 *
 * @tsplus fluent effect/parser/Printer filter
 */
export function filter_<Error, Output, Value, Error2, Value2 extends Value>(
  self: Printer<Error, Output, Value>,
  f: Refinement<Value, Value2>,
  failure: Error2
): Printer<Error2, Output, Value2>
export function filter_<Error, Output, Value, Error2>(
  self: Printer<Error, Output, Value>,
  f: Predicate<Value>,
  failure: Error2
): Printer<Error2, Output, Value>
export function filter_<Error, Output, Value, Error2>(
  self: Printer<Error, Output, Value>,
  f: Predicate<Value>,
  failure: Error2
): Printer<Error2, Output, Value> {
  return self.contramapEither((value) => f(value) ? Either.right(value) : Either.left(failure))
}

/**
 * Specifies a filter condition that gets checked on the resulting value,
 * failing with the specified `failure` if the filter condition returns false.
 *
 * @tsplus static effect/parser/Printer.Ops filter
 */
export function filter<Value, Error2, Value2 extends Value>(
  f: Refinement<Value, Value2>,
  failure: Error2
): <Error, Output>(self: Printer<Error, Output, Value>) => Printer<Error2, Output, Value2>
export function filter<Value, Error2>(
  f: Predicate<Value>,
  failure: Error2
): <Error, Output>(self: Printer<Error, Output, Value>) => Printer<Error2, Output, Value>
export function filter<Value, Error2>(
  f: Predicate<Value>,
  failure: Error2
) {
  return <Error, Output>(self: Printer<Error, Output, Value>): Printer<Error2, Output, Value> => self.filter(f, failure)
}
