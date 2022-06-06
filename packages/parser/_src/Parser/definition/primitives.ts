import type { OptimizerState } from "@effect/parser/Parser/_internal/OptimizerState"
import type { ParserState } from "@effect/parser/Parser/_internal/ParserState"
import { runOptimizeNode } from "@effect/parser/Parser/_internal/runOptimizeNode"
import { runStripNode } from "@effect/parser/Parser/_internal/runStripNode"
import { BaseParser } from "@effect/parser/Parser/definition/base"
import { instruction } from "@effect/parser/Parser/definition/instruction"

export class Lazy<Error, Input, Result> extends BaseParser<Error, Input, Result> {
  readonly _tag = "Lazy"

  readonly memoized: LazyValue<Parser<Error, Input, Result>>

  readonly needsBacktrack: boolean = true

  constructor(readonly inner: () => Parser<Error, Input, Result>) {
    super()
    this.memoized = LazyValue.make(inner)
  }

  optimizeNode(state: OptimizerState): Parser<Error, Input, Result> {
    const visited = state.visited.get(this)
    if (visited != null && visited > 1) {
      return new Lazy(() => state.optimized.get(this)!)
    }
    return runOptimizeNode(this.memoized.value, state)
  }

  stripNode(state: OptimizerState): Parser<Error, Input, Result> {
    const visited = state.visited.get(this)
    if (visited != null && visited > 1) {
      return new Lazy(() => state.optimized.get(this.memoized.value)!)
    }
    return runStripNode(this.memoized.value, state)
  }

  parseRecursive(state: ParserState): Result {
    return instruction(this.memoized.value).parseRecursive(state)
  }
}

export class Succeed<Result> extends BaseParser<never, unknown, Result> {
  readonly _tag = "Succeed"

  readonly needsBacktrack: boolean = false

  constructor(readonly value: Result) {
    super()
  }

  optimizeNode(_state: OptimizerState): Parser<never, unknown, Result> {
    return this
  }

  stripNode(_state: OptimizerState): Parser<never, unknown, Result> {
    return this
  }

  parseRecursive(_state: ParserState): Result {
    return this.value
  }
}

export class Fail<Error> extends BaseParser<Error, unknown, never> {
  readonly _tag = "Fail"

  readonly needsBacktrack: boolean = false

  constructor(readonly failure: Error) {
    super()
  }

  stripNode(_state: OptimizerState): Parser<Error, unknown, never> {
    return this
  }

  optimizeNode(_state: OptimizerState): Parser<Error, unknown, never> {
    return this
  }

  parseRecursive(state: ParserState): never {
    state.error = ParserError.Failure(state.nameStack, state.position, this.failure)
    return undefined as never
  }
}

export class Failed<Error> extends BaseParser<Error, unknown, never> {
  readonly _tag = "Failed"

  readonly needsBacktrack: boolean = false

  constructor(readonly failure: ParserError<Error>) {
    super()
  }

  stripNode(_state: OptimizerState): Parser<Error, unknown, never> {
    return this
  }

  optimizeNode(_state: OptimizerState): Parser<Error, unknown, never> {
    return this
  }

  parseRecursive(state: ParserState): never {
    state.error = this.failure
    return undefined as never
  }
}

export class Named<Error, Input, Result> extends BaseParser<Error, Input, Result> {
  readonly _tag = "Named"

  readonly needsBacktrack: boolean = instruction(this.parser).needsBacktrack

  constructor(readonly parser: Parser<Error, Input, Result>, readonly name: string) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error, Input, Result> {
    return runStripNode(this.parser, state)
  }

  optimizeNode(state: OptimizerState): Parser<Error, Input, Result> {
    return new Named(runOptimizeNode(this.parser, state), this.name)
  }

  parseRecursive(state: ParserState): Result {
    state.pushName(this.name)
    const result = instruction(this.parser).parseRecursive(state)
    state.popName()
    return result
  }
}

export class SkipRegex<Error> extends BaseParser<Error, string, void> {
  readonly _tag = "SkipRegex"

  readonly needsBacktrack: boolean = false

  readonly compiledRegex: LazyValue<Regex.Compiled>

  constructor(readonly regex: Regex, readonly onFailure: Option<Error>) {
    super()
    this.compiledRegex = LazyValue.make(() => this.regex.compile())
  }

  stripNode(_state: OptimizerState): Parser<Error, string, void> {
    return this
  }

  optimizeNode(_state: OptimizerState): Parser<Error, string, void> {
    this.compiledRegex.value.test(0, "")
    return this
  }

  parseRecursive(state: ParserState): void {
    const position = state.position
    const result = this.compiledRegex.value.test(position, state.source)
    if (result === Regex.NeedMoreInput) {
      state.error = ParserError.UnexpectedEndOfInput
    } else if (result === Regex.NotMatched) {
      switch (this.onFailure._tag) {
        case "Some": {
          state.error = ParserError.Failure(state.nameStack, position, this.onFailure.value)
          break
        }
        case "None": {
          state.error = ParserError.UnknownFailure(state.nameStack, position)
          break
        }
      }
    } else {
      state.position = result
    }
  }
}

export class ParseRegex<Error> extends BaseParser<Error, string, Chunk<string>> {
  readonly _tag = "ParseRegex"

  readonly needsBacktrack: boolean = false

  readonly compiledRegex: LazyValue<Regex.Compiled>

  constructor(readonly regex: Regex, readonly onFailure: Option<Error>) {
    super()
    this.compiledRegex = LazyValue.make(() => this.regex.compile())
  }

  stripNode(_state: OptimizerState): Parser<Error, string, Chunk<string>> {
    return this
  }

  optimizeNode(_state: OptimizerState): Parser<Error, string, Chunk<string>> {
    this.compiledRegex.value.test(0, "")
    return this
  }

  parseRecursive(state: ParserState): Chunk<string> {
    const position = state.position
    const result = this.compiledRegex.value.test(position, state.source)
    if (result === Regex.NeedMoreInput) {
      state.error = ParserError.UnexpectedEndOfInput
      return undefined as unknown as Chunk<string>
    }
    if (result === Regex.NotMatched) {
      state.error = this.getFailure(position, state.nameStack)
      return undefined as unknown as Chunk<string>
    }
    state.position = result
    if (!state.discard) {
      return Chunk.from(state.source.slice(position, result).split(""))
    }
    return undefined as unknown as Chunk<string>
  }

  private getFailure(position: number, nameStack: List<string>): ParserError<Error> {
    switch (this.onFailure._tag) {
      case "Some": {
        return ParserError.Failure(nameStack, position, this.onFailure.value)
      }
      case "None": {
        return ParserError.UnknownFailure(nameStack, position)
      }
    }
  }
}

export class ParseRegexLastChar<Error> extends BaseParser<Error, string, string> {
  readonly _tag = "ParseRegexLastChar"

  readonly needsBacktrack: boolean = false

  readonly compiledRegex: LazyValue<Regex.Compiled>

  constructor(readonly regex: Regex, readonly onFailure: Option<Error>) {
    super()
    this.compiledRegex = LazyValue.make(() => this.regex.compile())
  }

  stripNode(_state: OptimizerState): Parser<Error, string, string> {
    return this
  }

  optimizeNode(_state: OptimizerState): Parser<Error, string, string> {
    this.compiledRegex.value.test(0, "")
    return this
  }

  parseRecursive(state: ParserState): string {
    const position = state.position
    const result = this.compiledRegex.value.test(position, state.source)
    if (result === Regex.NeedMoreInput) {
      state.error = ParserError.UnexpectedEndOfInput
      return undefined as unknown as string
    }
    if (result === Regex.NotMatched) {
      state.error = this.getFailure(position, state.nameStack)
      return undefined as unknown as string
    }
    state.position = result
    if (!state.discard) {
      return state.source[result - 1]!
    }
    return undefined as unknown as string
  }

  private getFailure(position: number, nameStack: List<string>): ParserError<Error> {
    switch (this.onFailure._tag) {
      case "Some": {
        return ParserError.Failure(nameStack, position, this.onFailure.value)
      }
      case "None": {
        return ParserError.UnknownFailure(nameStack, position)
      }
    }
  }
}

export class TransformEither<Error, Error2, Input, Result, Result2> extends BaseParser<Error2, Input, Result2> {
  readonly _tag = "TransformEither"

  readonly needsBacktrack: boolean = true

  constructor(
    readonly parser: Parser<Error, Input, Result>,
    readonly to: (result: Result) => Either<Error2, Result2>
  ) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error2, Input, Result2> {
    const inner = runStripNode(this.parser, state)
    return new TransformEither(inner, this.to)
  }

  optimizeNode(state: OptimizerState): Parser<Error2, Input, Result2> {
    const inner = runOptimizeNode(this.parser, state)
    const frame = instruction(inner)
    switch (frame._tag) {
      case "TransformEither": {
        return new TransformEither(frame.parser, (a: any) => frame.to(a).flatMap((b: any) => this.to(b)))
      }
      case "Transform": {
        return new TransformEither(frame.parser, (a: any) => this.to(frame.to(a)))
      }
      default: {
        return new TransformEither(inner, this.to)
      }
    }
  }

  parseRecursive(state: ParserState): Result2 {
    // NOTE: cannot skip in discard mode, we need to detect failures
    const discard = state.discard
    state.discard = false
    const innerResult = instruction(this.parser).parseRecursive(state)
    state.discard = discard
    if (state.error == null) {
      const either = this.to(innerResult)
      switch (either._tag) {
        case "Left": {
          state.error = ParserError.Failure(state.nameStack, state.position, either.left)
          return undefined as unknown as Result2
        }
        case "Right": {
          return either.right
        }
      }
    }
    return undefined as unknown as Result2
  }
}

export class Transform<Error, Input, Result, Result2> extends BaseParser<Error, Input, Result2> {
  readonly _tag = "Transform"

  readonly needsBacktrack: boolean = instruction(this.parser).needsBacktrack

  constructor(
    readonly parser: Parser<Error, Input, Result>,
    readonly to: (result: Result) => Result2
  ) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error, Input, Result2> {
    const inner = runStripNode(this.parser, state)
    return new Transform(inner, this.to)
  }

  optimizeNode(state: OptimizerState): Parser<Error, Input, Result2> {
    const inner = runOptimizeNode(this.parser, state)
    const frame = instruction(inner)
    switch (frame._tag) {
      case "TransformEither": {
        return new TransformEither(frame.parser, (a: any) => frame.to(a).map((b: any) => this.to(b)))
      }
      case "Transform": {
        return new Transform(frame.parser, (a: any) => this.to(frame.to(a)))
      }
      default: {
        return new Transform(inner, this.to)
      }
    }
  }

  parseRecursive(state: ParserState): Result2 {
    const result = instruction(this.parser).parseRecursive(state)
    if (!state.discard && state.error == null) {
      return this.to(result)
    }
    return undefined as unknown as Result2
  }
}

export class Ignore<Error, Input, Result, Result2> extends BaseParser<Error, Input, Result2> {
  readonly _tag = "Ignore"

  readonly needsBacktrack: boolean = instruction(this.parser).needsBacktrack

  constructor(
    readonly parser: Parser<Error, Input, Result>,
    readonly to: Result2
  ) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error, Input, Result2> {
    const inner = runStripNode(this.parser, state)
    return new Ignore(inner, this.to)
  }

  optimizeNode(state: OptimizerState): Parser<Error, Input, Result2> {
    const inner = runOptimizeNode(this.parser, state)
    const frame = instruction(inner)
    switch (frame._tag) {
      case "TransformEither": {
        return new TransformEither(frame.parser, (a: any) => frame.to(a).map(() => this.to))
      }
      case "Transform": {
        return new Ignore(frame.parser, this.to)
      }
      case "Ignore": {
        return new Ignore(frame.parser, this.to)
      }
      case "CaptureString": {
        return new Ignore(frame.parser, this.to) as Parser<Error, Input, Result2>
      }
      case "ParseRegex":
      case "ParseRegexLastChar": {
        return new Ignore(new SkipRegex(frame.regex, frame.onFailure), this.to) as Parser<Error, Input, Result2>
      }
      default: {
        return new Ignore(inner, this.to)
      }
    }
  }

  parseRecursive(state: ParserState): Result2 {
    const discard = state.discard
    state.discard = true
    instruction(this.parser).parseRecursive(state)
    state.discard = discard
    return this.to
  }
}

export class CaptureString<Error> extends BaseParser<Error, string, string> {
  readonly _tag = "CaptureString"

  readonly needsBacktrack: boolean = instruction(this.parser).needsBacktrack

  constructor(readonly parser: Parser<Error, string, unknown>) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error, string, string> {
    return new CaptureString(instruction(this.parser).stripNode(state))
  }

  optimizeNode(state: OptimizerState): Parser<Error, string, string> {
    const inner = runOptimizeNode(this.parser, state)
    const frame = instruction(inner)
    switch (frame._tag) {
      case "Transform":
      case "Ignore":
      case "CaptureString": {
        return new CaptureString(frame.parser)
      }
      case "ParseRegex":
      case "ParseRegexLastChar": {
        return new CaptureString(new SkipRegex(frame.regex, frame.onFailure))
      }
      default: {
        return new CaptureString(inner)
      }
    }
  }

  parseRecursive(state: ParserState): string {
    const discard = state.discard
    const startPosition = state.position
    state.discard = true
    instruction(this.parser).parseRecursive(state)
    state.discard = discard
    if (!discard && state.error == null) {
      const endPosition = state.position
      return state.source.slice(startPosition, endPosition)
    }
    return undefined as unknown as string
  }
}

export class Zip<Error, Error2, Input, Input2, Result, Result2, ZippedResult>
  extends BaseParser<Error | Error2, Input & Input2, ZippedResult>
{
  readonly _tag = "Zip"

  readonly needsBacktrack: boolean = true

  constructor(
    readonly left: Parser<Error, Input, Result>,
    readonly right: Parser<Error2, Input2, Result2>,
    readonly zip: (result: Result, result2: Result2) => ZippedResult
  ) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error | Error2, Input & Input2, ZippedResult> {
    return new Zip(runStripNode(this.left, state), runStripNode(this.right, state), this.zip)
  }

  optimizeNode(state: OptimizerState): Parser<Error | Error2, Input & Input2, ZippedResult> {
    return new Zip(runOptimizeNode(this.left, state), runOptimizeNode(this.right, state), this.zip)
  }

  parseRecursive(state: ParserState): ZippedResult {
    const left = instruction(this.left).parseRecursive(state)
    if (state.error == null) {
      const right = instruction(this.right).parseRecursive(state)
      if (!state.discard && state.error == null) {
        return this.zip(left, right)
      }
    }
    return undefined as unknown as ZippedResult
  }
}

export class ZipLeft<Error, Error2, Input, Input2, Result> extends BaseParser<Error | Error2, Input & Input2, Result> {
  readonly _tag = "ZipLeft"

  readonly needsBacktrack: boolean = true

  constructor(
    readonly left: Parser<Error, Input, Result>,
    readonly right: Parser<Error2, Input2, unknown>
  ) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error | Error2, Input & Input2, Result> {
    return new ZipLeft(runStripNode(this.left, state), runStripNode(this.right, state))
  }

  optimizeNode(state: OptimizerState): Parser<Error | Error2, Input & Input2, Result> {
    return new ZipLeft(runOptimizeNode(this.left, state), runOptimizeNode(this.right, state))
  }

  parseRecursive(state: ParserState): Result {
    const left = instruction(this.left).parseRecursive(state)
    if (state.error == null) {
      const discard = state.discard
      state.discard = true
      instruction(this.right).parseRecursive(state)
      state.discard = discard
      if (state.error == null) {
        return left
      }
    }
    return undefined as unknown as Result
  }
}

export class ZipRight<Error, Error2, Input, Input2, Result2>
  extends BaseParser<Error | Error2, Input & Input2, Result2>
{
  readonly _tag = "ZipRight"

  readonly needsBacktrack: boolean = true

  constructor(
    readonly left: Parser<Error, Input, unknown>,
    readonly right: Parser<Error2, Input2, Result2>
  ) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error | Error2, Input & Input2, Result2> {
    return new ZipRight(runStripNode(this.left, state), runStripNode(this.right, state))
  }

  optimizeNode(state: OptimizerState): Parser<Error | Error2, Input & Input2, Result2> {
    return new ZipRight(runOptimizeNode(this.left, state), runOptimizeNode(this.right, state))
  }

  parseRecursive(state: ParserState): Result2 {
    const discard = state.discard
    state.discard = true
    instruction(this.left).parseRecursive(state)
    state.discard = discard
    if (state.error == null) {
      const right = instruction(this.right).parseRecursive(state)
      if (state.error == null) {
        return right
      }
    }
    return undefined as unknown as Result2
  }
}

export class FlatMap<Error, Error2, Input, Input2, Result, Result2>
  extends BaseParser<Error | Error2, Input & Input2, Result2>
{
  readonly _tag = "FlatMap"

  readonly needsBacktrack: boolean = true

  constructor(
    readonly parser: Parser<Error, Input, Result>,
    readonly f: (result: Result) => Parser<Error2, Input2, Result2>
  ) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error | Error2, Input & Input2, Result2> {
    return new FlatMap(runStripNode(this.parser, state), this.f)
  }

  optimizeNode(state: OptimizerState): Parser<Error | Error2, Input & Input2, Result2> {
    return new FlatMap(runOptimizeNode(this.parser, state), this.f)
  }

  parseRecursive(state: ParserState): Result2 {
    const discard = state.discard
    state.discard = false
    const value = instruction(this.parser).parseRecursive(state)
    state.discard = discard
    if (state.error == null) {
      const next = this.f(value)
      return instruction(next).parseRecursive(state)
    }
    return undefined as unknown as Result2
  }
}

export class OrElseEither<Error, Error2, Input, Input2, Result, Result2>
  extends BaseParser<Error2, Input & Input2, Either<Result, Result2>>
{
  readonly _tag = "OrElseEither"

  readonly needsBacktrack: boolean = instruction(this.left).needsBacktrack || instruction(this.right).needsBacktrack

  constructor(
    readonly left: Parser<Error, Input, Result>,
    readonly right: Parser<Error2, Input2, Result2>
  ) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error2, Input & Input2, Either<Result, Result2>> {
    return new OrElseEither(runStripNode(this.left, state), runStripNode(this.right, state))
  }

  optimizeNode(state: OptimizerState): Parser<Error2, Input & Input2, Either<Result, Result2>> {
    return new OrElseEither(
      runOptimizeNode(state.autoBacktrack ? new Backtrack(this.left) : this.left, state),
      runOptimizeNode(this.right, state)
    )
  }

  parseRecursive(state: ParserState): Either<Result, Result2> {
    const startPosition = state.position
    const leftResult = instruction(this.left).parseRecursive(state)
    if (state.error == null) {
      if (!state.discard) {
        return Either.left(leftResult)
      }
      return undefined as unknown as Either<Result, Result2>
    }
    if (state.position === startPosition) {
      const leftFailure = state.error
      state.error = undefined
      const rightResult = instruction(this.right).parseRecursive(state)
      if (state.error == null) {
        if (!state.discard) {
          return Either.right(rightResult)
        }
        return undefined as unknown as Either<Result, Result2>
      }
      state.error = leftFailure.addFailedBranch(state.error)
      return undefined as unknown as Either<Result, Result2>
    }
    return undefined as unknown as Either<Result, Result2>
  }
}

export class OrElse<Error, Error2, Input, Input2, Result, Result2>
  extends BaseParser<Error2, Input & Input2, Result | Result2>
{
  readonly _tag = "OrElse"

  readonly needsBacktrack: boolean = instruction(this.left).needsBacktrack || instruction(this.right).needsBacktrack

  constructor(
    readonly left: Parser<Error, Input, Result>,
    readonly right: Parser<Error2, Input2, Result2>
  ) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error2, Input & Input2, Result | Result2> {
    return new OrElse(runStripNode(this.left, state), runStripNode(this.right, state))
  }

  optimizeNode(state: OptimizerState): Parser<Error2, Input & Input2, Result | Result2> {
    const optimizedLeft = runOptimizeNode(state.autoBacktrack ? new Backtrack(this.left) : this.left, state)
    const optimizedRight = runOptimizeNode(this.right, state)
    const frameLeft = instruction(optimizedLeft)
    const frameRight = instruction(optimizedRight)
    if (frameLeft._tag === "CaptureString" && frameRight._tag === "CaptureString") {
      const leftParserFrame = instruction(frameLeft.parser)
      const rightParserFrame = instruction(frameRight.parser)
      if (leftParserFrame._tag === "SkipRegex" && rightParserFrame._tag === "SkipRegex") {
        return new CaptureString(
          new SkipRegex(
            leftParserFrame.regex | rightParserFrame.regex,
            rightParserFrame.onFailure.orElse(leftParserFrame.onFailure)
          )
        ) as unknown as Parser<Error2, Input & Input2, Result | Result2>
      }
    }
    return new OrElse(optimizedLeft, optimizedRight)
  }

  parseRecursive(state: ParserState): Result | Result2 {
    const startPosition = state.position
    const leftResult = instruction(this.left).parseRecursive(state)
    if (state.error == null) {
      return leftResult
    }
    if (state.position === startPosition) {
      const leftFailure = state.error
      state.error = undefined
      const rightResult = instruction(this.right).parseRecursive(state)
      if (state.error == null) {
        return rightResult
      }
      state.error = leftFailure.addFailedBranch(state.error)
    }
    return undefined as unknown as Result | Result2
  }
}

export class Optional<Error, Input, Result> extends BaseParser<Error, Input, Option<Result>> {
  readonly _tag = "Optional"

  readonly needsBacktrack: boolean = instruction(this.parser).needsBacktrack

  constructor(readonly parser: Parser<Error, Input, Result>) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error, Input, Option<Result>> {
    return new Optional(runStripNode(this.parser, state))
  }

  optimizeNode(state: OptimizerState): Parser<Error, Input, Option<Result>> {
    return new Optional(
      runOptimizeNode(state.autoBacktrack ? new Backtrack(this.parser) : this.parser, state)
    )
  }

  parseRecursive(state: ParserState): Option<Result> {
    console.log(this.parser)
    const startPos = state.position
    const result = instruction(this.parser).parseRecursive(state)
    if (state.error == null) {
      if (!state.discard) {
        return Option.some(result)
      }
      return undefined as unknown as Option<Result>
    }
    if (state.position !== startPos) {
      return undefined as unknown as Option<Result>
    }
    state.error = undefined
    return Option.none
  }
}

export class Repeat<Error, Input, Result> extends BaseParser<Error, Input, Chunk<Result>> {
  readonly _tag = "Repeat"

  readonly needsBacktrack: boolean = true

  constructor(
    readonly parser: Parser<Error, Input, Result>,
    readonly min: number,
    readonly max: Option<number>
  ) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error, Input, Chunk<Result>> {
    return new Repeat(runStripNode(this.parser, state), this.min, this.max)
  }

  optimizeNode(state: OptimizerState): Parser<Error, Input, Chunk<Result>> {
    const inner = runOptimizeNode(state.autoBacktrack ? new Backtrack(this.parser) : this.parser, state)
    const frame = instruction(inner)
    switch (frame._tag) {
      case "ParseRegexLastChar": {
        switch (this.max._tag) {
          case "Some": {
            return new ParseRegex(
              frame.regex.between(this.min, this.max.value),
              frame.onFailure
            ) as unknown as Parser<Error, Input, Chunk<Result>>
          }
          case "None": {
            return new ParseRegex(
              frame.regex.atLeast(this.min),
              frame.onFailure
            ) as unknown as Parser<Error, Input, Chunk<Result>>
          }
        }
      }
      default: {
        return new Repeat(inner, this.min, this.max)
      }
    }
  }

  parseRecursive(state: ParserState): Chunk<Result> {
    const discard = state.discard
    const maxCount = this.max.getOrElse(Number.MAX_SAFE_INTEGER)
    const builder = discard ? undefined : Chunk.builder<Result>()
    let count = 0
    let lastItemStart = -1
    const sourceLength = state.source.length
    while (state.error == null && count < maxCount && lastItemStart < sourceLength) {
      lastItemStart = state.position
      const item = instruction(this.parser).parseRecursive(state)
      if (state.error == null) {
        count = count + 1
        if (!discard && builder != null) {
          builder.append(item)
        }
      }
    }
    if (count < this.min) {
      state.error = ParserError.UnexpectedEndOfInput
    } else {
      state.error = undefined
    }
    if (!discard && state.error == null && builder != null) {
      return builder.build()
    }
    return undefined as unknown as Chunk<Result>
  }
}

export class Not<Error, Error2, Input> extends BaseParser<Error2, Input, void> {
  readonly _tag = "Not"

  readonly needsBacktrack: boolean = instruction(this.parser).needsBacktrack

  constructor(readonly parser: Parser<Error, Input, unknown>, readonly failure: Error2) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error2, Input, void> {
    return new Not(runStripNode(this.parser, state), this.failure)
  }

  optimizeNode(state: OptimizerState): Parser<Error2, Input, void> {
    return new Not(runOptimizeNode(this.parser, state), this.failure)
  }

  parseRecursive(state: ParserState): void {
    const discard = state.discard
    state.discard = true
    instruction(this.parser).parseRecursive(state)
    state.discard = discard
    if (state.error == null) {
      state.error = ParserError.Failure(state.nameStack, state.position, this.failure)
    } else {
      state.error = undefined
    }
  }
}

export class Backtrack<Error, Input, Result> extends BaseParser<Error, Input, Result> {
  readonly _tag = "Backtrack"

  readonly needsBacktrack: boolean = false

  constructor(readonly parser: Parser<Error, Input, Result>) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error, Input, Result> {
    return new Backtrack(runStripNode(this.parser, state))
  }

  optimizeNode(state: OptimizerState): Parser<Error, Input, Result> {
    const inner = runOptimizeNode(this.parser, state)
    if (instruction(inner).needsBacktrack) {
      return new Backtrack(inner)
    }
    return inner
  }

  parseRecursive(state: ParserState): Result {
    const position = state.position
    const result = instruction(this.parser).parseRecursive(state)
    if (state.error != null) {
      state.position = position
    }
    return result
  }
}

export class SetAutoBacktrack<Error, Input, Result> extends BaseParser<Error, Input, Result> {
  readonly _tag = "SetAutoBacktrack"

  readonly needsBacktrack: boolean = instruction(this.parser).needsBacktrack

  constructor(
    readonly parser: Parser<Error, Input, Result>,
    readonly enabled: boolean
  ) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error, Input, Result> {
    return new SetAutoBacktrack(runStripNode(this.parser, state), this.enabled)
  }

  optimizeNode(state: OptimizerState): Parser<Error, Input, Result> {
    return runOptimizeNode(this.parser, { ...state, autoBacktrack: this.enabled })
  }

  parseRecursive(_state: ParserState): Result {
    // Optimize always removes this node, so we can ignore it
    return undefined as unknown as Result
  }
}

export class MapError<Error, Error2, Input, Result> extends BaseParser<Error2, Input, Result> {
  readonly _tag = "MapError"

  readonly needsBacktrack: boolean = instruction(this.parser).needsBacktrack

  constructor(
    readonly parser: Parser<Error, Input, Result>,
    readonly mapParserError: (error: ParserError<Error>) => ParserError<Error2>
  ) {
    super()
  }

  stripNode(state: OptimizerState): Parser<Error2, Input, Result> {
    return new MapError(runStripNode(this.parser, state), this.mapParserError)
  }

  optimizeNode(state: OptimizerState): Parser<Error2, Input, Result> {
    return new MapError(runOptimizeNode(this.parser, state), this.mapParserError)
  }

  parseRecursive(state: ParserState): Result {
    const result = instruction(this.parser).parseRecursive(state)
    if (state.error != null) {
      state.error = this.mapParserError(state.error as ParserError<Error>)
    }
    return result
  }
}

export class Index extends BaseParser<never, unknown, number> {
  readonly _tag = "Index"

  readonly needsBacktrack: boolean = false

  stripNode(_state: OptimizerState): Parser<never, unknown, number> {
    return this
  }

  optimizeNode(_state: OptimizerState): Parser<never, unknown, number> {
    return this
  }

  parseRecursive(state: ParserState): number {
    return state.position
  }
}

export class End extends BaseParser<never, unknown, void> {
  readonly _tag = "End"

  readonly needsBacktrack: boolean = false

  stripNode(_state: OptimizerState): Parser<never, unknown, void> {
    return this
  }

  optimizeNode(_state: OptimizerState): Parser<never, unknown, void> {
    return this
  }

  parseRecursive(state: ParserState): void {
    if (state.position < state.source.length) {
      state.error = ParserError.NotConsumedAll(Option.none)
    }
  }
}
