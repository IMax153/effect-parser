import type { OptimizerState } from "@effect/parser/Parser/_internal/OptimizerState"
import type { ParserState } from "@effect/parser/Parser/_internal/ParserState"
import type { ParserImplementation, ParserImplementationOps } from "@effect/parser/Parser/definition/implementation"

export const ParserErrorSym = Symbol.for("@effect/parser/Parser/Error")
export type ParserErrorSym = typeof ParserErrorSym

export const ParserInputSym = Symbol.for("@effect/parser/Parser/Input")
export type ParserInputSym = typeof ParserInputSym

export const ParserResultSym = Symbol.for("@effect/parser/Parser/Result")
export type ParserResultSym = typeof ParserResultSym

/**
 * A `Parser` consumes a stream of 'Input's and either fails with a
 * `ParserError`, possibly holding a custom error of type 'Error' or succeeds
 * with a result of type `Result`
 *
 * `Parser`s can be combined with `Printer`s to get `Syntax`, or a `Parser` and
 * a `Printer` can be built simultaneously by using the combinators of `Syntax`.
 *
 * Recursive parsers can be expressed directly by recursing in one of the
 * zipping or or-else combinators.
 *
 * By default a parser backtracks automatically. This behavior can be changed
 * with the 'manualBacktracking' operator.
 *
 * Parsers trees get optimized automatically before running the parser. This
 * optimized tree can be examined by using the 'optimized' combinator. For the
 * full list of transformations performed in the optimization phase check each
 * parser node's 'optimizeNode' method.
 *
 * @tsplus type effect/parser/Parser
 * @template Error - The custom error type.
 * @template Input - The type of elements contained in the input stream.
 * @template Result - The type of the parsed result.
 */
export interface Parser<Error, Input, Result> {
  readonly [ParserErrorSym]: () => Error
  readonly [ParserInputSym]: (input: Input) => void
  readonly [ParserResultSym]: () => Result
}

export declare namespace Parser {
  export type Implementation = ParserImplementation
}

/**
 * @tsplus type effect/parser/Parser.Ops
 */
export interface ParserOps {
  readonly $: ParserAspects
  readonly Implementation: ParserImplementationOps
}
export const Parser: ParserOps = {
  $: {},
  Implementation: {}
}

/**
 * @tsplus type effect/parser/Parser.Aspects
 */
export interface ParserAspects {}

/**
 * @tsplus unify effect/parser/Parser
 */
export function unifyParser<X extends Parser<any, any, any>>(
  self: X
): Parser<
  [X] extends [{ [ParserErrorSym]: () => infer Error }] ? Error : never,
  [X] extends [{ [ParserInputSym]: (input: infer Input) => void }] ? Input : never,
  [X] extends [{ [ParserResultSym]: () => infer Result }] ? Result : never
> {
  return self
}

export abstract class BaseParser<Error, Input, Result> implements Parser<Error, Input, Result> {
  readonly [ParserErrorSym]!: () => Error
  readonly [ParserInputSym]!: (input: Input) => void
  readonly [ParserResultSym]!: () => Result
  abstract needsBacktrack: boolean
  abstract optimizeNode(state: OptimizerState): Parser<Error, Input, Result>
  abstract stripNode(state: OptimizerState): Parser<Error, Input, Result>
  abstract parseRecursive(state: ParserState): Result
}
