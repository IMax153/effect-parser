/**
 * @tsplus fluent effect/parser/ParserError addFailedBranch
 */
export function addFailedBranch_<Error, Error2>(
  self: ParserError<Error>,
  error: ParserError<Error2>
): ParserError<Error | Error2> {
  return ParserError.AllBranchesFailed<Error | Error2>(self, error)
}

/**
 * @tsplus static effect/parser/ParserError.Aspects addFailedBranch
 */
export const addFailedBranch = Pipeable(addFailedBranch_)
