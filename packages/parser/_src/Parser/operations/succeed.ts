import { Succeed } from "@effect/parser/Parser/definition/primitives"

/**
 * Constructs a `Parser` that does not consume any input and always succeeds
 * with the specified `value`.
 *
 * @tsplus static effect/parser/Parser.Ops succeed
 */
export function succeed<Result>(value: Result): Parser<never, unknown, Result> {
  return new Succeed(value)
}
