import { Lazy } from "@effect/parser/Parser/definition/primitives"

/**
 * Lazily constructs a `Parser`.
 *
 * @tsplus static effect/parser/Parser.Ops lazy
 */
export function lazy<Error, Input, Result>(
  parser: LazyArg<Parser<Error, Input, Result>>
): Parser<Error, Input, Result> {
  return new Lazy(parser)
}
