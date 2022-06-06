import type { PairTransformation } from "@effect/parser/Parser/_internal/PairTransformation"
import type { RegexResultPush } from "@effect/parser/Parser/_internal/RegexResultPush"

/**
 * Represents a `Parser` operation, the language a Parser is precompiled to for
 * parsing.
 *
 * @tsplus type effect/parser/Parser/ParserOp
 */
export type ParserOp =
  | PushOp2
  | PushOp3
  | PushOp4
  | Lazy
  | PushResult
  | PushCapturedResult
  | PushCurrentPosition
  | CheckEnd
  | PushName
  | PopName
  | ReadInputToResult
  | MatchSeq
  | MatchRegex
  | TransformResultEither
  | TransformResult
  | TransformResultFlipped
  | TransformLast2Results
  | TransformResultToOption
  | PopResultPushOp
  | SkipOnFailure2
  | SkipOnSuccess2
  | PushChunkBuilder
  | ProcessRepeatedElement
  | Cut
  | BacktrackOnFailure

/**
 * Push `a` and then `b` to the operation stack.
 */
export class PushOp2 {
  readonly _tag = "PushOp2"
  constructor(
    readonly a: ParserOp,
    readonly b: ParserOp,
    readonly pushBranchPosition: boolean
  ) {}
}

/**
 * Push `a`, `b`, and then `c` to the operation stack.
 */
export class PushOp3 {
  readonly _tag = "PushOp3"
  constructor(
    readonly a: ParserOp,
    readonly b: ParserOp,
    readonly c: ParserOp
  ) {}
}

/**
 * Push `a`, `b`, `c`, and then `d` to the operation stack.
 */
export class PushOp4 {
  readonly _tag = "PushOp4"
  constructor(
    readonly a: ParserOp,
    readonly b: ParserOp,
    readonly c: ParserOp,
    readonly d: ParserOp,
    readonly pushBranchPosition: boolean
  ) {}
}

/**
 * A deferred parser operation, useful for recursive operations.
 */
export class Lazy {
  readonly _tag = "Lazy"
  readonly memoized: LazyValue<ParserOp>
  constructor(op: () => ParserOp) {
    this.memoized = LazyValue.make(op)
  }
}

/**
 * Store a result. One of success or failure must be `undefined`. If `popFirst`
 * is `true`, the last result will be replaced but only if it was a success.
 */
export class PushResult {
  readonly _tag = "PushResult"
  constructor(
    readonly success: unknown | undefined,
    readonly failure: ParserError<unknown> | undefined,
    readonly popFirst: boolean
  ) {}
}

/**
 * Pops the last stored branch position and the last result, and replaces it
 * with the captured string as a result.
 */
export class PushCapturedResult {
  readonly _tag = "PushCapturedResult"
}

/**
 * Pushes the current input position as a result.
 */
export class PushCurrentPosition {
  readonly _tag = "PushCurrentPosition"
}

/**
 * Pushes a failure if the current position is not at the end.
 */
export class CheckEnd {
  readonly _tag = "CheckEnd"
}

/**
 * Store a name in the name stack.
 */
export class PushName {
  readonly _tag = "PushName"
  constructor(readonly name: string) {}
}

/**
 * Pop the last pushed name from the name stack.
 */
export class PopName {
  readonly _tag = "PopName"
}

/**
 * Read an item from the input and push it to the result stack.
 */
export class ReadInputToResult {
  readonly _tag = "ReadInputToResult"
}

/**
 * Match a sequence on the input, and push the given value or failure on the
 * result stack.
 */
export class MatchSeq {
  readonly _tag = "MatchSeq"
  constructor(
    readonly sequence: Chunk<unknown>,
    readonly as: unknown,
    readonly createParserFailure: (position: number, value: unknown) => unknown
  ) {
  }
}

/**
 * Match a compiled regex on the input, and push a result with the given
 * strategy or failure on the result stack.
 */
export class MatchRegex {
  readonly _tag = "MatchRegex"
  constructor(
    readonly regex: Regex.Compiled,
    readonly pushAs: RegexResultPush,
    readonly failAs: Option<unknown>
  ) {}
}

/**
 * Pop the last result from the stack, transform it to either a success or a
 * failure and push back.
 */
export class TransformResultEither {
  readonly _tag = "TransformResultEither"
  constructor(
    readonly f: (value: unknown) => Either<unknown, unknown>
  ) {}
}

/**
 * Pop the last result from the stack, transform it and with one of the
 * functions and push back. It is possible to pass `undefined` to `onSuccess` or
 * `onFailure` in which case it does not touch the result.
 */
export class TransformResult {
  readonly _tag = "TransformResult"
  constructor(
    readonly onSuccess: ((value: unknown) => unknown) | undefined,
    readonly onFailure: ((error: ParserError<unknown>) => ParserError<unknown>) | undefined
  ) {}
}

/**
 * Pop the last result from the stack, transform it and with one of the
 * functions and push back. It converts success to failure and failure to
 * success.
 */
export class TransformResultFlipped {
  readonly _tag = "TransformResultFlipped"
  constructor(
    readonly onSuccess: (position: number, value: unknown) => ParserError<unknown>,
    readonly onFailure: (position: number, error: ParserError<unknown>) => unknown
  ) {}
}

/**
 * Pop the last two results from the stack and if both were success, create a
 * single value based on the given strategy and push it back. If any of them
 * failed, push back a single failure.
 */
export class TransformLast2Results {
  readonly _tag = "TransformLast2Results"
  constructor(readonly strategy: PairTransformation) {}
}

/**
 * Pop the last result from the stack and if it was success, respush wrapped in
 * `Some`, if it was failure, repush as a successful `None`. When
 * `checkBranchPosition` is `true`, if position was moved compared to the last
 * branch position then keep the failure.
 */
export class TransformResultToOption {
  readonly _tag = "TransformResultToOption"
  constructor(readonly checkBranchPosition: boolean) {}
}

/**
 * Pop the last result and use the function to push it as parser operation
 * (i.e. `flatMap`).
 */
export class PopResultPushOp {
  readonly _tag = "PopResultPushOp"
  constructor(readonly f: (value: unknown) => ParserOp) {}
}

/**
 * If the result is failure, skip the next two parser operations. This can be
 * used to shortcut the right side of a zip operation.
 */
export class SkipOnFailure2 {
  readonly _tag = "SkipOnFailure2"
}

/**
 * If the result is success, skip the next two parser operations. Optionally if
 * the transform is not `undefined`, it replaces the result with the transform
 * function applied to it. This can be used to shortcut the right side of an
 * or operation. If `checkBranchPosition` is `true`, the last branch position
 * will be popped and checked and if the position was moved the left failure is
 * kept and the next operations get skipped.
 */
export class SkipOnSuccess2 {
  readonly _tag = "SkipOnSuccess2"
  constructor(
    readonly checkBranchPosition: boolean,
    readonly transform: ((value: unknown) => unknown) | undefined
  ) {}
}

/**
 * Creates a chunk builder and pushes on the chunk builder stack.
 */
export class PushChunkBuilder {
  readonly _tag = "PushChunkBuilder"
}

/**
 * Pushes the last result to the top chunk builder. If the last result was
 * successful, repush the element parser and itself. If the last result is a
 * failure, finish building the result and check the min/max constraints.
 */
export class ProcessRepeatedElement {
  readonly _tag = "ProcessRepeatedElement"
  constructor(
    readonly parseElement: ParserOp,
    readonly min: number,
    readonly max: Option<number>
  ) {}
}

/**
 * Cut stored bookmarks if result is a success.
 */
export class Cut {
  readonly _tag = "Cut"
}

/**
 * Pop the last branch position, and in case of failure, reset the position to
 * it.
 */
export class BacktrackOnFailure {
  readonly _tag = "BacktrackOnFailure"
}

/**
 * @tsplus fluent effect/parser/Parser/ParserOp needsEmptyResultSlot
 */
export function needsEmptyResultSlot(self: ParserOp): boolean {
  switch (self._tag) {
    case "PushOp2":
    case "PushOp3":
    case "PushOp4":
    case "Lazy":
    case "PushCapturedResult":
    case "PushName":
    case "PopName":
    case "TransformResultEither":
    case "TransformResult":
    case "TransformResultFlipped":
    case "TransformLast2Results":
    case "TransformResultToOption":
    case "PopResultPushOp":
    case "SkipOnFailure2":
    case "SkipOnSuccess2":
    case "PushChunkBuilder":
    case "ProcessRepeatedElement":
    case "Cut":
    case "BacktrackOnFailure": {
      return false
    }
    case "PushCurrentPosition":
    case "CheckEnd":
    case "ReadInputToResult":
    case "MatchSeq":
    case "MatchRegex": {
      return true
    }
    case "PushResult": {
      return !self.popFirst
    }
  }
}
