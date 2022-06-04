/**
 * Parse or print a specified character `value` resulting in the unit value, or
 * fail with the specified `failure`.
 *
 * @tsplus static effect/parser/Syntax.Ops charWithFailure
 */
export function charWithFailure<Error>(
  value: string,
  failure: Error
): Syntax<Error, string, string, void> {
  return Syntax.regexDiscard(
    Regex.charIn(value),
    failure,
    Chunk(value)
  )
}
