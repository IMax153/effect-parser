/**
 * Ignores the success result of this parser and instead returns the specified
 * `result`.
 *
 * @tsplus fluent effect/parser/Parser as
 */
export function as_<Error, Input, Result, Result2>(
  self: Parser<Error, Input, Result>,
  result: LazyArg<Result2>
): Parser<Error, Input, Result2> {
  return self.map(result)
}

/**
 * Ignores the success result of this parser and instead returns the specified
 * `result`.
 *
 * @tsplus static effect/parser/Parser.Aspects as
 */
export const as = Pipeable(as_)
