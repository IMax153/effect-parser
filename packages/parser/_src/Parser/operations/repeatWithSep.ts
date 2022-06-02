/**
 * Repeats this parser at least once, and requires that between each parsed
 * element, the `sep` parser must succeed.
 *
 * @tsplus fluent effect/parser/Parser repeatWithSep
 */
export function repeatWithSep_<Error, Input, Result, Error2, Input2, Result2>(
  self: Parser<Error, Input, Result>,
  sep: Parser<Error2, Input2, Result2>
): Parser<Error | Error2, Input & Input2, Chunk<Result>> {
  return self.zip(sep.zipRight(self).repeat0()).map(({ tuple: [head, tail] }) => tail.prepend(head))
}

/**
 * Repeats this parser at least once, and requires that between each parsed
 * element, the `sep` parser must succeed.
 *
 * @tsplus static effect/parser/Parser.Aspects repeatWithSep
 */
export const repeatWithSep = Pipeable(repeatWithSep_)
