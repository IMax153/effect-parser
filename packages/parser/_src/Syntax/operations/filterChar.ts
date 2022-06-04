/**
 * A `Syntax` that parses/prints a single character that matches the specified
 * filter function, or fails with the specified `failure`.
 *
 * @tsplus static effect/parser/Syntax.Ops filterChar
 */
export function filterChar<Error, Result extends string>(
  filter: Refinement<string, Result>,
  failure: Error
): Syntax<Error, string, string, Result>
export function filterChar<Error>(
  filter: Predicate<string>,
  failure: Error
): Syntax<Error, string, string, string>
export function filterChar<Error>(
  filter: Predicate<string>,
  failure: Error
): Syntax<Error, string, string, string> {
  return Syntax.regexChar(Regex.filter(filter), failure)
}
