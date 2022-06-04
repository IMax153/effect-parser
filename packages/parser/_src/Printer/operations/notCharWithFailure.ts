/**
 * A `Printer` that prints the input character if it is not equal to the
 * specified `char`, otherwise fails with the specified `failure`.
 *
 * @tsplus static effect/parser/Printer.Ops notCharWithFailure
 */
export function notCharWithFailure<Error>(char: string, failure: Error): Printer<Error, string, string> {
  return Printer.regexChar(Regex.charNotIn(char), failure)
}
