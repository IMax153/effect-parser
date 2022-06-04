/**
 * Repeats this printer for each element of the input chunk, separated by the
 * `sep` printer (which gets the unit value to be printed).
 *
 * @tsplus fluent effect/parser/Printer repeatWithSep0
 */
export function repeatWithSep0_<Error, Output, Value, Error2, Output2>(
  self: Printer<Error, Output, Value>,
  sep: Printer<Error2, Output2, void>
): Printer<Error | Error2, Output & Output2, Chunk<Value>> {
  return self
    .zip(sep.zipRight(self).repeat0())
    .optional()
    .contramap((chunk: Chunk<Value>) => chunk.head.map((head) => Tuple(head, chunk.unsafeTail())))
}

/**
 * Repeats this printer for each element of the input chunk, separated by the
 * `sep` printer (which gets the unit value to be printed).
 *
 * @tsplus static effect/parser/Printer.Aspects repeatWithSep0
 */
export const repeatWithSep0 = Pipeable(repeatWithSep0_)
