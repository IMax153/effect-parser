/**
 * Associates a name with this syntax. The chain of named parsers are reported
 * in case of failure to help debugging parser issues.
 *
 * @tsplus fluent effect/parser/Syntax named
 */
export function named_<Error, Input, Output, Value>(
  self: Syntax<Error, Input, Output, Value>,
  name: string
): Syntax<Error, Input, Output, Value> {
  return Syntax(self.asParser.named(name), self.asPrinter)
}

/**
 * Associates a name with this syntax. The chain of named parsers are reported
 * in case of failure to help debugging parser issues.
 *
 * @tsplus static effect/parser/Syntax.Aspects named
 */
export const named = Pipeable(named_)
