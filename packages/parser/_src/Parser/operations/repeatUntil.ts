/**
 * Repeats this parser until the given `stopCondition` parser succeeds.
 *
 * @tsplus fluent effect/parser/Parser repeatUntil
 */
export function repeatUntil_<Error, Input, Result, Error2, Input2, Result2>(
  self: Parser<Error, Input, Result>,
  stopCondition: Parser<Error2, Input2, Result2>
): Parser<Error | Error2, Input & Input2, Chunk<Result>> {
  return stopCondition
    .not(undefined as any as Error2)
    .zipRight(self)
    .repeat0()
    .manualBacktracking()
}

/**
 * Repeats this parser until the given `stopCondition` parser succeeds.
 *
 * @tsplus static effect/parser/Parser.Aspects repeatUntil
 */
export const repeatUntil = Pipeable(repeatUntil_)
