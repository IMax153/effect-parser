/**
 * Maps the result type of this parser to always return the unit value.
 *
 * @tsplus fluent effect/parser/Parser asUnit
 */
export function asUnit<Error, Input, Result>(
  self: Parser<Error, Input, Result>
): Parser<Error, Input, void> {
  return self.as(undefined)
}
