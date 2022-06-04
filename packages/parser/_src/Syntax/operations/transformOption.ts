/**
 * Maps the parser's successful result with the specified function `to`, and
 * maps the value to be printed with the specified function `from`. Both of the
 * mapping functions can fail the parser/printer. The failure is indicated in
 * the error channel by the value `None`.
 *
 * @tsplus fluent effect/parser/Syntax transformOption
 */
export function transformOption_<Error, Input, Output, Value, Value2>(
  self: Syntax<Error, Input, Output, Value>,
  to: (value: Value) => Option<Value2>,
  from: (value: Value2) => Option<Value>
): Syntax<Option<Error>, Input, Output, Value2> {
  return self.transformEither(
    (value) => Either.fromOption(to(value), Option.none),
    (value) => Either.fromOption(from(value), Option.none)
  )
}

/**
 * Maps the parser's successful result with the specified function `to`, and
 * maps the value to be printed with the specified function `from`. Both of the
 * mapping functions can fail the parser/printer. The failure is indicated in
 * the error channel by the value `None`.
 *
 * @tsplus static effect/parser/Syntax.Aspects transformOption
 */
export const transformOption = Pipeable(transformOption_)
