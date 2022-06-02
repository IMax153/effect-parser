import { Named } from "@effect/parser/Parser/definition/primitives"

/**
 * Associates a name with this parser. The chain of named parsers are reported
 * in case of failure to help debugging parser issues.
 *
 * @tsplus fluent effect/parser/Parser named
 */
export function named_<Error, Input, Result>(
  self: Parser<Error, Input, Result>,
  name: string
): Parser<Error, Input, Result> {
  return new Named(self, name)
}

/**
 * Associates a name with this parser. The chain of named parsers are reported
 * in case of failure to help debugging parser issues.
 *
 * @tsplus static effect/parser/Parser.Aspects named
 */
export const named = Pipeable(named_)
