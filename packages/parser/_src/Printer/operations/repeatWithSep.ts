/**
 * Repeats this printer for each element of the input chunk, separated by the
 * `sep` printer (which gets the unit value to be printed).
 *
 * @tsplus fluent effect/parser/Printer repeatWithSep
 */
export function repeatWithSep_<Error, Output, Value, Error2, Output2>(
  self: Printer<Error, Output, Value>,
  sep: Printer<Error2, Output2, void>
): Printer<Error | Error2, Output & Output2, Chunk<Value>> {
  return self
    .zip(sep.zipRight(self).repeat0())
    .contramap((chunk: Chunk<Value>) => Tuple(chunk.unsafeHead(), chunk.unsafeTail()))
}

/**
 * Repeats this printer for each element of the input chunk, separated by the
 * `sep` printer (which gets the unit value to be printed).
 *
 * @tsplus static effect/parser/Printer.Aspects repeatWithSep
 */
export const repeatWithSep = Pipeable(repeatWithSep_)
