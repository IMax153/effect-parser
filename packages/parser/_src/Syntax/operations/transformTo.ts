/**
 * Maps the parsed value with the specified function `to`, and the value to be
 * printed with the specifiedj partial function `from`. If the partial function
 * is not defined on the value, the printer fails with the specified `failure`.
 *
 * This can be used to define separate syntaxes for subtypes, that can be later
 * combined.
 *
 * @tsplus fluent effect/parser/Syntax transformTo
 */
export function transformTo_<Error, Input, Output, Value, Error2, Value2>(
  self: Syntax<Error, Input, Output, Value>,
  to: (value: Value) => Value2,
  from: (value: Value2) => Option<Value>,
  failure: Error2
): Syntax<Error2, Input, Output, Value2> {
  return self.transformEither(
    (value) => Either.right(to(value)),
    (value) => from(value).fold(Either.left(failure), Either.right)
  )
}

/**
 * Maps the parsed value with the specified function `to`, and the value to be
 * printed with the specifiedj partial function `from`. If the partial function
 * is not defined on the value, the printer fails with the specified `failure`.
 *
 * This can be used to define separate syntaxes for subtypes, that can be later
 * combined.
 *
 * @tsplus static effect/parser/Syntax.Aspects transformTo
 */
export const transformTo = Pipeable(transformTo_)
