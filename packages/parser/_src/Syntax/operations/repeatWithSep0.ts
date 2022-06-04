/**
 * Repeats this syntax zero or more times and with `sep` injected between each
 * element.
 *
 * @tsplus fluent effect/parser/Syntax repeatWithSep0
 */
export function repeatWithSep0_<Error, Input, Output, Value, Error2, Input2, Output2>(
  self: Syntax<Error, Input, Output, Value>,
  sep: Syntax<Error2, Input2, Output2, void>
): Syntax<Error | Error2, Input & Input2, Output & Output2, Chunk<Value>> {
  return (self & (sep > self).repeat0()).optional()
    .transform(
      (option) => option.fold(Chunk.empty(), ({ tuple: [head, tail] }) => tail.prepend(head)),
      (chunk) => chunk.head.map((head) => Tuple(head, chunk.unsafeTail()))
    )
}
