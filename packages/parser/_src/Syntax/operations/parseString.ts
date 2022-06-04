/**
 * Run this parser on the given 'input' string using a specific parser
 * implementation.
 *
 * The parser implementation will default to `Recursive` if not specified.
 *
 * @tsplus fluent effect/parser/Syntax parseString
 */
export function parseString_<Error, Output, Value>(
  self: Syntax<Error, any, Output, Value>,
  input: string,
  implementation: Parser.Implementation = Parser.Implementation.Recursive
): Either<ParserError<Error>, Value> {
  return self.asParser.parseString(input, implementation)
}

/**
 * Run this parser on the given 'input' string using a specific parser
 * implementation.
 *
 * The parser implementation will default to `Recursive` if not specified.
 *
 * @tsplus static effect/parser/Syntax.Aspects parseString
 */
export function parseString(
  input: string,
  implementation: Parser.Implementation = Parser.Implementation.Recursive
) {
  return <Error, Output, Value>(
    self: Syntax<Error, any, Output, Value>
  ): Either<ParserError<Error>, Value> => self.parseString(input, implementation)
}
