/**
 * Represents the available parser implementations.
 *
 * The default parser implementation is `Recursive`. There is an alternative
 * implementation available which is stack-safe but slower.
 *
 * @tsplus type effect/parser/Parser.Implementation
 */
export type ParserImplementation = StackSafe | Recursive

/**
 * @tsplus type effect/parser/Parser.Implementation.Ops
 */
export interface ParserImplementationOps {}

export interface StackSafe {
  readonly _tag: "StackSafe"
}

export interface Recursive {
  readonly _tag: "Recursive"
}

/**
 * Represents a stack-safe parser implementation.
 *
 * @tsplus static effect/parser/Parser.Implementation.Ops StackSafe
 */
export const StackSafe: ParserImplementation = {
  _tag: "StackSafe"
}

/**
 * Represents a recursive parser implementation.
 *
 * @tsplus static effect/parser/Parser.Implementation.Ops Recursive
 */
export const Recursive: ParserImplementation = {
  _tag: "Recursive"
}
