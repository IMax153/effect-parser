/**
 * Surrounds the `self` syntax with the `other` syntax.
 *
 * All three must succeed. The result is this syntax's result.
 *
 * Note that the `other` syntax must have a `Value` type of unit. Otherwise the
 * printer could not produce an arbitrary input value for them as the result is
 * discarded.
 *
 * @tsplus fluent effect/parser/Syntax surroundedBy
 */
export function surroundedBy_<Error, Input, Output, Value, Error2, Input2, Output2>(
  self: Syntax<Error, Input, Output, Value>,
  other: Syntax<Error2, Input2, Output2, void>
) {
  return self.between(other, other)
}

/**
 * Surrounds the `self` syntax with the `other` syntax.
 *
 * All three must succeed. The result is this syntax's result.
 *
 * Note that the `other` syntax must have a `Value` type of unit. Otherwise the
 * printer could not produce an arbitrary input value for them as the result is
 * discarded.
 *
 * @tsplus static effect/parser/Syntax.Aspects surroundedBy
 */
export const surroundedBy = Pipeable(surroundedBy_)
