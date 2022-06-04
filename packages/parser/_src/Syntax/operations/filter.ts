/**
 * Specifies a filter condition that gets checked in both parser and printer
 * mode and in case it evaluates to false, fails with the specified `failure`.
 *
 * @tsplus fluent effect/parser/Syntax filter
 */
export function filter_<Error, Input, Output, Value, Error2, Value2 extends Value>(
  self: Syntax<Error, Input, Output, Value>,
  f: Refinement<Value, Value2>,
  failure: Error2
): Syntax<Error2, Input, Output, Value2>
export function filter_<Error, Input, Output, Value, Error2>(
  self: Syntax<Error, Input, Output, Value>,
  f: Predicate<Value>,
  failure: Error2
): Syntax<Error2, Input, Output, Value>
export function filter_<Error, Input, Output, Value, Error2>(
  self: Syntax<Error, Input, Output, Value>,
  f: Predicate<Value>,
  failure: Error2
): Syntax<Error2, Input, Output, Value> {
  return self.transformEither(
    (value) => f(value) ? Either.right(value) : Either.left(failure),
    (value) => f(value) ? Either.right(value) : Either.left(failure)
  )
}

/**
 * Specifies a filter condition that gets checked in both parser and printer
 * mode and in case it evaluates to false, fails with the specified `failure`.
 *
 * @tsplus static effect/parser/Syntax.Aspects filter
 */
export function filter<Value, Error2, Value2 extends Value>(
  f: Refinement<Value, Value2>,
  failure: Error2
): <Error, Input, Output>(self: Syntax<Error, Input, Output, Value>) => Syntax<Error2, Input, Output, Value2>
export function filter<Value, Error2>(
  f: Predicate<Value>,
  failure: Error2
): <Error, Input, Output>(self: Syntax<Error, Input, Output, Value>) => Syntax<Error2, Input, Output, Value>
export function filter<Value, Error2>(
  f: Predicate<Value>,
  failure: Error2
) {
  return <Error, Input, Output>(self: Syntax<Error, Input, Output, Value>): Syntax<Error2, Input, Output, Value> =>
    self.filter(f, failure)
}
