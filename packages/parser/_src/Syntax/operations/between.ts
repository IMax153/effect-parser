/**
 * Concatenates the syntaxes `left`, then `self`, then `right`.
 *
 * All three must succeed. The result is this syntax's result.
 *
 * Note that the `left` and `right` syntaxes must have a `Value` type of unit.
 * Otherwise the printer could not produce an arbitrary input value for them as
 * their result is discarded.
 *
 * @tsplus fluent effect/parser/Syntax between
 */
export function between_<Error, Input, Output, Value, Error2, Input2, Output2, Error3, Input3, Output3>(
  self: Syntax<Error, Input, Output, Value>,
  left: Syntax<Error2, Input2, Output2, void>,
  right: Syntax<Error3, Input3, Output3, void>
) {
  return left > self < right
}

/**
 * Concatenates the syntaxes `left`, then `self`, then `right`.
 *
 * All three must succeed. The result is this syntax's result.
 *
 * Note that the `left` and `right` syntaxes must have a `Value` type of unit.
 * Otherwise the printer could not produce an arbitrary input value for them as
 * their result is discarded.
 *
 * @tsplus static effect/parser/Syntax.Aspects between
 */
export const between = Pipeable(between_)
