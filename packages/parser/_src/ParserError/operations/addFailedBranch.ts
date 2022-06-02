/**
 * @tsplus fluent effect/parser/Parser addFailedBranch
 */
export function addFailedBranch_<Error, Error2>(
  self: ParserError<Error>,
  error: ParserError<Error2>
): ParserError<Error | Error2> {
  return ParserError.AllBranchesFailed<Error | Error2>(self, error)
}

/**
 * @tsplus static effect/parser/Parser.Aspects addFailedBranch
 */
export const addFailedBranch = Pipeable(addFailedBranch_)
