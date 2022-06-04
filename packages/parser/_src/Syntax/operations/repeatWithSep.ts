/**
 * Repeats this syntax at least once and with `sep` injected between each
 * element.
 *
 * @tsplus fluent effect/parser/Syntax repeatWithSep
 */
export function repeatWithSep_<Error, Input, Output, Value, Error2, Input2, Output2>(
  self: Syntax<Error, Input, Output, Value>,
  sep: Syntax<Error2, Input2, Output2, void>
): Syntax<Error | Error2, Input & Input2, Output & Output2, Chunk<Value>> {
  return (self & (sep > self).repeat0()).transform(
    ({ tuple: [head, tail] }) => tail.prepend(head),
    (chunk) => Tuple(chunk.unsafeHead(), chunk.unsafeTail())
  )
}

/**
 * Repeats this syntax at least once and with `sep` injected between each
 * element.
 *
 * @tsplus static effect/parser/Syntax.Aspects repeatWithSep
 */
export const repeatWithSep = Pipeable(repeatWithSep_)
