import { CompilerState } from "@effect/parser/Parser/_internal/CompilerState"
import { PairTransformation } from "@effect/parser/Parser/_internal/PairTransformation"
import type { ParserOp } from "@effect/parser/Parser/_internal/ParserOp"
import {
  BacktrackOnFailure,
  CheckEnd,
  Lazy,
  MatchRegex,
  PopName,
  PopResultPushOp,
  ProcessRepeatedElement,
  PushCapturedResult,
  PushChunkBuilder,
  PushCurrentPosition,
  PushName,
  PushOp2,
  PushOp3,
  PushOp4,
  PushResult,
  SkipOnFailure2,
  SkipOnSuccess2,
  TransformLast2Results,
  TransformResult,
  TransformResultEither,
  TransformResultFlipped,
  TransformResultToOption
} from "@effect/parser/Parser/_internal/ParserOp"
import { RegexResultPush } from "@effect/parser/Parser/_internal/RegexResultPush"
import type { Instruction } from "@effect/parser/Parser/definition/instruction"
import { instruction } from "@effect/parser/Parser/definition/instruction"
import { constVoid } from "@tsplus/stdlib/data/Function"

export class InitialParser {
  constructor(
    readonly op: ParserOp,
    readonly initialStack: Stack<ParserOp> | undefined,
    readonly initialPositions: Array<number>,
    readonly initialPositionIndex: number,
    readonly initialNames: List<string>,
    readonly initialBuilders: number
  ) {}
}

/**
 * @tsplus fluent effect/parser/Parser compile
 */
export function compile<Error, Input, Result>(parser: Parser<Error, Input, Result>): InitialParser {
  return toInitialParser(compileInternal(instruction(parser.optimized()), CompilerState.initial()))
}

function compileInternal(parser: Instruction, state: CompilerState): ParserOp {
  const alreadyOptimized = state.optimized.get(parser)
  if (alreadyOptimized != null) {
    return alreadyOptimized
  }
  state.visited.add(parser)
  const compiled = compileParserNode(parser, state)
  state.optimized.set(parser, compiled)
  return compiled
}

function compileParserNode(parser: Instruction, state: CompilerState): ParserOp {
  switch (parser._tag) {
    case "Lazy": {
      if (state.visited.has(instruction(parser.memoized.value))) {
        return new Lazy(() => state.optimized.get(instruction(parser.memoized.value))!)
      }
      return compileInternal(instruction(parser.memoized.value), state)
    }
    case "Succeed": {
      return new PushResult(parser.value, undefined, false)
    }
    case "Fail": {
      return new PushResult(
        undefined,
        ParserError.Failure(List.nil(), -1, parser.failure),
        false
      )
    }
    case "Failed": {
      return new PushResult(undefined, parser.failure, false)
    }
    case "Named": {
      return new PushOp3(
        new PopName(),
        compileInternal(instruction(parser.parser), state),
        new PushName(parser.name)
      )
    }
    case "SkipRegex": {
      return new MatchRegex(
        parser.compiledRegex.value,
        RegexResultPush.Ignored,
        parser.onFailure
      )
    }
    case "ParseRegex": {
      return new MatchRegex(
        parser.compiledRegex.value,
        RegexResultPush.MatchedChunk,
        parser.onFailure
      )
    }
    case "ParseRegexLastChar": {
      return new MatchRegex(
        parser.compiledRegex.value,
        RegexResultPush.SingleChar,
        parser.onFailure
      )
    }
    case "TransformEither": {
      return new PushOp2(
        new TransformResultEither(parser.to),
        compileInternal(instruction(parser.parser), state),
        false
      )
    }
    case "Transform": {
      return new PushOp2(
        new TransformResult(parser.to, undefined),
        compileInternal(instruction(parser.parser), state),
        false
      )
    }
    case "Ignore": {
      return new PushOp2(
        new PushResult(parser.to, undefined, true),
        compileInternal(instruction(parser.parser), state),
        false
      )
    }
    case "CaptureString": {
      return new PushOp2(
        new PushCapturedResult(),
        compileInternal(instruction(parser.parser), state),
        true
      )
    }
    case "MapError": {
      return new PushOp2(
        new TransformResult(undefined, parser.mapParserError),
        compileInternal(instruction(parser.parser), state),
        false
      )
    }
    case "Zip": {
      const compiledLeft = compileInternal(instruction(parser.left), state)
      const compiledRight = compileInternal(instruction(parser.right), state)
      return new PushOp4(
        new TransformLast2Results(PairTransformation.Zip(parser.zip)),
        compiledRight,
        new SkipOnFailure2(),
        compiledLeft,
        false
      )
    }
    case "ZipLeft": {
      const compiledLeft = compileInternal(instruction(parser.left), state)
      const compiledRight = compileInternal(instruction(parser.right), state)
      return new PushOp4(
        new TransformLast2Results(PairTransformation.KeepFirst),
        compiledRight,
        new SkipOnFailure2(),
        compiledLeft,
        false
      )
    }
    case "ZipRight": {
      const compiledLeft = compileInternal(instruction(parser.left), state)
      const compiledRight = compileInternal(instruction(parser.right), state)
      return new PushOp4(
        new TransformLast2Results(PairTransformation.KeepSecond),
        compiledRight,
        new SkipOnFailure2(),
        compiledLeft,
        false
      )
    }
    case "FlatMap": {
      return new PushOp2(
        new PopResultPushOp((value) => compileInternal(instruction(parser.f(value)), state)),
        compileInternal(instruction(parser.parser), state),
        false
      )
    }
    case "OrElseEither": {
      return new PushOp4(
        new TransformLast2Results(PairTransformation.IgnoreFirstWrapSecondAsRight),
        compileInternal(instruction(parser.right), state),
        new SkipOnSuccess2(true, Either.left),
        compileInternal(instruction(parser.left), state),
        true
      )
    }
    case "OrElse": {
      return new PushOp4(
        new TransformLast2Results(PairTransformation.IgnoreFirstKeepSecond),
        compileInternal(instruction(parser.right), state),
        new SkipOnSuccess2(true, undefined),
        compileInternal(instruction(parser.left), state),
        true
      )
    }
    case "Optional": {
      return new PushOp2(
        new TransformResultToOption(true),
        compileInternal(instruction(parser.parser), state),
        true
      )
    }
    case "Repeat": {
      const parseElement = compileInternal(instruction(parser.parser), state)
      return new PushOp3(
        new ProcessRepeatedElement(parseElement, parser.min, parser.max),
        parseElement,
        new PushChunkBuilder()
      )
    }
    case "Not": {
      const inner = compileInternal(instruction(parser.parser), state)
      return new PushOp2(
        new TransformResultFlipped(
          (pos, _) => ParserError.Failure(List.nil(), pos, parser.failure),
          constVoid
        ),
        inner,
        false
      )
    }
    case "Backtrack": {
      return new PushOp2(
        new BacktrackOnFailure(),
        compileInternal(instruction(parser.parser), state),
        true
      )
    }
    case "SetAutoBacktrack": {
      // This node is removed by the optimization phase so we can ignore it
      return compileInternal(instruction(parser.parser), state)
    }
    case "Index": {
      return new PushCurrentPosition()
    }
    case "End": {
      return new CheckEnd()
    }
  }
}

function toInitialParser(op: ParserOp): InitialParser {
  return collect(op, List.nil(), 0, List.nil(), 0)
}

/**
 * @tsplus tailRec
 */
function collect(
  op: ParserOp,
  opStack: List<ParserOp>,
  posCount: number,
  names: List<string>,
  builders: number
): InitialParser {
  function finish(): InitialParser {
    let ops: Stack<ParserOp> | undefined
    opStack.reverse().forEach((op) => {
      ops = ops == null ? new Stack(op) : new Stack(op, ops)
    })
    const pss = Array.from({ length: 1024 }, () => -1)
    for (let i = 0; i < posCount; i++) {
      pss[i] = 0
    }
    return new InitialParser(op, ops, pss, posCount, names, builders)
  }
  switch (op._tag) {
    case "PushOp2": {
      return collect(
        op.b,
        opStack.prepend(op.a),
        op.pushBranchPosition ? posCount + 1 : posCount,
        names,
        builders
      )
    }
    case "PushOp3": {
      return collect(
        op.c,
        opStack.prepend(op.a).prepend(op.b),
        posCount,
        names,
        builders
      )
    }
    case "PushOp4": {
      return collect(
        op.d,
        opStack.prepend(op.a).prepend(op.b).prepend(op.c),
        op.pushBranchPosition ? posCount + 1 : posCount,
        names,
        builders
      )
    }
    case "Lazy": {
      return collect(op.memoized.value, opStack, posCount, names, builders)
    }
    case "PushName": {
      return collect(
        opStack.unsafeHead()!,
        opStack.unsafeTail()!,
        posCount,
        names.prepend(op.name),
        builders
      )
    }
    case "PopName": {
      return collect(
        opStack.unsafeHead()!,
        opStack.unsafeTail()!,
        posCount,
        names.isNil() ? names : names.tail,
        builders
      )
    }
    case "PushChunkBuilder": {
      return collect(
        opStack.unsafeHead()!,
        opStack.unsafeTail()!,
        posCount,
        names,
        builders + 1
      )
    }
    case "PushResult":
    case "PushCapturedResult":
    case "ReadInputToResult":
    case "MatchSeq":
    case "MatchRegex":
    case "TransformResultEither":
    case "TransformResult":
    case "TransformResultFlipped":
    case "TransformLast2Results":
    case "TransformResultToOption":
    case "PopResultPushOp":
    case "SkipOnFailure2":
    case "SkipOnSuccess2":
    case "ProcessRepeatedElement":
    case "Cut":
    case "BacktrackOnFailure":
    case "PushCurrentPosition":
    case "CheckEnd": {
      return finish()
    }
  }
}
