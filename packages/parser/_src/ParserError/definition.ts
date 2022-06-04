export const ParserErrorSym = Symbol.for("@effect/parser/ParserError")
export type ParserErrorSym = typeof ParserErrorSym

/**
 * A type representing an error that occurred during parsing.
 *
 * @tsplus type effect/parser/ParserError
 */
export type ParserError<Error> =
  | Failure<Error>
  | UnknownFailure
  | UnexpectedEndOfInput
  | NotConsumedAll<Error>
  | AllBranchesFailed<Error>

/**
 * @tsplus type effect/parser/ParserError.Ops
 */
export interface ParserErrorOps {
  readonly $: ParserErrorAspects
}
export const ParserError: ParserErrorOps = {
  $: {}
}

/**
 * @tsplus type effect/parser/ParserError.Aspects
 */
export interface ParserErrorAspects {}

/**
 * @tsplus unify effect/parser/ParserError
 * @tsplus unify effect/parser/ParserError.Failure
 * @tsplus unify effect/parser/ParserError.UnknownFailure
 * @tsplus unify effect/parser/ParserError.UnexpectedEndOfInput
 * @tsplus unify effect/parser/ParserError.NotConsumedAll
 * @tsplus unify effect/parser/ParserError.AllBranchesFailed
 */
export function unifyParserError<X extends ParserError<any>>(
  self: X
): ParserError<
  [X] extends [ParserError<infer Err>] ? Err : never
> {
  return self
}

/**
 * Represents a user-defined parser error containing a failure of type `Error`.
 *
 * @tsplus type effect/parser/ParserError.Failure
 */
export class Failure<Error> implements Equals {
  readonly _tag = "Failure"

  readonly [ParserErrorSym]: ParserErrorSym = ParserErrorSym

  constructor(
    /**
     * Stack of named parsers until reaching the failure.
     */
    readonly nameStack: List<string>,
    /**
     * Input stream position.
     */
    readonly position: number,
    /**
     * The custom failure.
     */
    readonly failure: Error
  ) {}

  [Hash.sym](): number {
    return Hash.combine(
      Hash.string(this._tag),
      Hash.combine(
        Hash.unknown(this.nameStack),
        Hash.combine(Hash.number(this.position), Hash.unknown(this.failure))
      )
    )
  }

  [Equals.sym](that: unknown): boolean {
    return ParserError.is(that) &&
      that.isFailure() &&
      this.nameStack == that.nameStack &&
      this.position === that.position &&
      Equals.equals(this.failure, that.failure)
  }
}

/**
 * Represents an unknown parser error.
 *
 * This is only produced in exceptional cases that should not happen, for
 * example if the unsafe regex variants encounter an error.
 *
 * @tsplus type effect/parser/ParserError.UnknownFailure
 */
export class UnknownFailure implements Equals {
  readonly _tag = "UnknownFailure"

  readonly [ParserErrorSym]: ParserErrorSym = ParserErrorSym

  constructor(
    /**
     * Stack of named parsers until reaching the failure.
     */
    readonly nameStack: List<string>,
    /**
     * Input stream position.
     */
    readonly position: number
  ) {}

  [Hash.sym](): number {
    return Hash.combine(
      Hash.string(this._tag),
      Hash.combine(
        Hash.unknown(this.nameStack),
        Hash.number(this.position)
      )
    )
  }

  [Equals.sym](that: unknown): boolean {
    return ParserError.is(that) &&
      that.isUnknownFailure() &&
      this.nameStack == that.nameStack &&
      this.position === that.position
  }
}

/**
 * Represents an error that occurred due to the input stream ending prior to
 * completion of parsing.
 *
 * @tsplus type effect/parser/ParserError.UnexpectedEndOfInput
 */
export class UnexpectedEndOfInput implements Equals {
  readonly _tag = "UnexpectedEndOfInput"

  readonly [ParserErrorSym]: ParserErrorSym = ParserErrorSym;

  [Hash.sym](): number {
    return Hash.string(this._tag)
  }

  [Equals.sym](that: unknown): boolean {
    return ParserError.is(that) && that.isUnexpectedEndOfInput()
  }
}

/**
 * Represents an error that occurred due to the parser failing to consume all
 * input tokens.
 *
 * @tsplus type effect/parser/ParserError.NotConsumedAll
 */
export class NotConsumedAll<Error> implements Equals {
  readonly _tag = "NotConsumedAll"

  readonly [ParserErrorSym]: ParserErrorSym = ParserErrorSym

  constructor(
    /**
     * The last encountered failure, if any.
     */
    readonly lastFailure: Option<ParserError<Error>>
  ) {}

  [Hash.sym](): number {
    return Hash.combine(
      Hash.string(this._tag),
      Hash.unknown(this.lastFailure)
    )
  }

  [Equals.sym](that: unknown): boolean {
    return ParserError.is(that) &&
      that.isNotConsumedAll() &&
      this.lastFailure == that.lastFailure
  }
}

/**
 * Represents an error in which all branches in a sequence of `orElse` or
 * `orElseEither` parsers failed.
 *
 * This error preserves the failure of all branches.
 *
 * @tsplus type effect/parser/ParserError.NotConsumedAll
 */
export class AllBranchesFailed<Error> implements Equals {
  readonly _tag = "AllBranchesFailed"

  readonly [ParserErrorSym]: ParserErrorSym = ParserErrorSym

  constructor(
    readonly left: ParserError<Error>,
    readonly right: ParserError<Error>
  ) {}

  [Hash.sym](): number {
    return Hash.combine(
      Hash.string(this._tag),
      Hash.combine(
        Hash.unknown(this.left),
        Hash.unknown(this.right)
      )
    )
  }

  [Equals.sym](that: unknown): boolean {
    return ParserError.is(that) &&
      that.isAllBranchesFailed() &&
      this.left == that.left &&
      this.right == that.right
  }
}

/**
 * @tsplus static effect/parser/ParserError.Ops Failure
 */
export function failure<Error>(nameStack: List<string>, position: number, failure: Error): ParserError<Error> {
  return new Failure(nameStack, position, failure)
}

/**
 * @tsplus static effect/parser/ParserError.Ops UnknownFailure
 */
export function unknownFailure(nameStack: List<string>, position: number): ParserError<never> {
  return new UnknownFailure(nameStack, position)
}

/**
 * @tsplus static effect/parser/ParserError.Ops UnexpectedEndOfInput
 */
export const unexpectedEndOfInput: ParserError<never> = new UnexpectedEndOfInput()

/**
 * @tsplus static effect/parser/ParserError.Ops NotConsumedAll
 */
export function notConsumedAll<Error>(lastFailure: Option<ParserError<Error>>): ParserError<Error> {
  return new NotConsumedAll(lastFailure)
}

/**
 * @tsplus static effect/parser/ParserError.Ops AllBranchesFailed
 */
export function allBranchedFailed<Error>(left: ParserError<Error>, right: ParserError<Error>): ParserError<Error> {
  return new AllBranchesFailed(left, right)
}

/**
 * @tsplus static effect/parser/ParserError.Ops is
 */
export function isParserError(u: unknown): u is ParserError<unknown> {
  return typeof u === "object" && u != null && ParserErrorSym in u
}

/**
 * @tsplus fluent effect/parser/ParserError isFailure
 */
export function isFailure<Error>(self: ParserError<Error>): self is Failure<Error> {
  return isParserError(self) && self._tag === "Failure"
}

/**
 * @tsplus fluent effect/parser/ParserError isUnknownFailure
 */
export function isUnknownFailure<Error>(self: ParserError<Error>): self is UnknownFailure {
  return isParserError(self) && self._tag === "UnknownFailure"
}

/**
 * @tsplus fluent effect/parser/ParserError isUnexpectedEndOfInput
 */
export function isUnexpectedEndOfInput<Error>(self: ParserError<Error>): self is UnexpectedEndOfInput {
  return isParserError(self) && self._tag === "UnexpectedEndOfInput"
}

/**
 * @tsplus fluent effect/parser/ParserError isNotConsumedAll
 */
export function isNotConsumedAll<Error>(self: ParserError<Error>): self is NotConsumedAll<Error> {
  return isParserError(self) && self._tag === "NotConsumedAll"
}

/**
 * @tsplus fluent effect/parser/ParserError isAllBranchesFailed
 */
export function isAllBranchesFailed<Error>(self: ParserError<Error>): self is AllBranchesFailed<Error> {
  return isParserError(self) && self._tag === "AllBranchesFailed"
}
