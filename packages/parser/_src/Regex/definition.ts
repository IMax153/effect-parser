/**
 * Represents a regular expression.
 *
 * @tsplus type effect/parser/Regex
 */
export type Regex = Succeed | OneOf | Sequence | Repeat | Or | And

/**
 * @tsplus type effect/parser/Regex.Ops
 */
export interface RegexOps {
  readonly $: RegexAspects
}
export const Regex: RegexOps = {
  $: {}
}

/**
 * @tsplus type effect/parser/Regex.Aspects
 */
export interface RegexAspects {}

export declare namespace Regex {
  /**
   * @tsplus type effect/parser/Regex.Compiled
   */
  export interface Compiled {
    /**
     * Tests the compiled regex against the specified character sequence.
     *
     * @returns The new index into the chunk.
     */
    readonly test: (index: number, chars: string) => number
    /**
     * Determines if the compiled regex matches the specified string.
     *
     * @returns `true` if the compiled regex matches the specified string,
     * `false` otherwise.
     */
    readonly matches: (value: string) => boolean
  }
}

/**
 * @tsplus static effect/parser/Regex.Ops NotMatched
 */
export const NotMatched = -1

/**
 * @tsplus static effect/parser/Regex.Ops NeedMoreInput
 */
export const NeedMoreInput = -2

export class Succeed {
  readonly _tag = "Succeed"
}

export class OneOf {
  readonly _tag = "OneOf"
  constructor(readonly bitset: BitSet) {}
}

export class Sequence {
  readonly _tag = "Sequence"
  constructor(readonly first: Regex, readonly second: Regex) {}
}

export class Repeat {
  readonly _tag = "Repeat"
  constructor(
    readonly regex: Regex,
    readonly min: Option<number>,
    readonly max: Option<number>
  ) {}
}

export class Or {
  readonly _tag = "Or"
  constructor(readonly left: Regex, readonly right: Regex) {}
}

export class And {
  readonly _tag = "And"
  constructor(readonly left: Regex, readonly right: Regex) {}
}
