/**
 * Maps the result of the printer with the specified partial function. It the
 * partial function is not defined on the value, the printer fails with the
 * specified `failure`.
 *
 * This can be used to define separate syntaxes for subtypes, that can be later
 * combined.
 *
 * @tsplus fluent effect/parser/Printer contramapTo
 */
export function contramapTo_<Error, Output, Value, Error2, Value2>(
  self: Printer<Error, Output, Value>,
  f: (value: Value2) => Option<Value>,
  failure: Error2
): Printer<Error2, Output, Value2> {
  return self.contramapEither((value) => f(value).fold(Either.left(failure), Either.right))
}

/**
 * Maps the result of the printer with the specified partial function. It the
 * partial function is not defined on the value, the printer fails with the
 * specified `failure`.
 *
 * This can be used to define separate syntaxes for subtypes, that can be later
 * combined.
 *
 * @tsplus fluent effect/parser/Printer contramapTo
 */
export const contramapTo = Pipeable(contramapTo_)
