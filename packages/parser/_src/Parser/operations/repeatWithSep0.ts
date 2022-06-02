/**
 * Repeats this parser zero or more times, and requires that between each parsed
 * element, the `sep` parser must succeed.
 *
 * @tsplus fluent effect/parser/Parser repeatWithSep0
 */
export function repeatWithSep0_<Error, Input, Result, Error2, Input2, Result2>(
  self: Parser<Error, Input, Result>,
  sep: Parser<Error2, Input2, Result2>
): Parser<Error | Error2, Input & Input2, Chunk<Result>> {
  return self.zip(sep.zipRight(self).repeat0()).optional().map((option) =>
    option.fold(
      Chunk.empty<Result>(),
      ({ tuple: [head, tail] }) => tail.prepend(head)
    )
  )
}

/**
 * Repeats this parser zero or more times, and requires that between each parsed
 * element, the `sep` parser must succeed.
 *
 * @tsplus static effect/parser/Parser.Aspects repeatWithSep0
 */
export const repeatWithSep0 = Pipeable(repeatWithSep0_)
