import type { ParserOp } from "@effect/parser/Parser/_internal/ParserOp"
import type { InitialParser } from "@effect/parser/Parser/operations/compile"
import type { ChunkBuilder } from "@tsplus/stdlib/collections/Chunk"
// import * as util from "util"

/**
 * @tsplus fluent effect/parser/Parser parseStackSafe
 */
export function parseStackSafe_<Error, Result>(
  self: Parser<Error, string, Result>,
  source: string
): Either<ParserError<Error>, Result> {
  return parseStackSafeInternal(self.compile(), source) as Either<ParserError<Error>, Result>
}

/**
 * @tsplus static effect/parser/Parser.Aspects parseStackSafe
 */
export const parseStackSafe = Pipeable(parseStackSafe_)

function parseStackSafeInternal(
  parser: InitialParser,
  source: string
): Either<ParserError<unknown>, unknown> {
  // Operation Stack: the next operation is returned to the main loop as a
  // return value, further operations are stacked here
  // console.log(util.inspect(parser.initialStack, { depth: 10, colors: true }))
  let opStack: Stack<ParserOp> | undefined = parser.initialStack
  let op: ParserOp | undefined = parser.op
  // if (initialOpStack != null) {
  //   opStack = new Stack(initialOpStack.value, initialOpStack.previous)
  //   while (initialOpStack.previous != null) {
  //     opStack = new Stack(initialOpStack.previous.value, opStack)
  //     initialOpStack = initialOpStack.previous
  //   }
  // }
  // console.log(util.inspect(opStack, { depth: 10, colors: true }))
  // Result stacks and explicit variables for the top two results. If success
  // is undefined, a failure value must be pushed. If success is not undefined,
  // failure is not pushed The lastSuccess and lastFailure variables are either
  // both undefined (when no result yet) or one of them have value.
  let lastSuccess1: unknown | undefined = undefined
  let lastFailure1: ParserError<unknown> | undefined = undefined
  let lastSuccess2: unknown | undefined = undefined
  let lastFailure2: ParserError<unknown> | undefined = undefined
  let successResultStack: Stack<unknown | undefined> | undefined = undefined
  let failedResultStack: Stack<ParserError<unknown>> | undefined = undefined

  // TODO
  // @ts-expect-error
  let lastIgnoredError: ParserError<unknown> | undefined = undefined

  // Name stack for tracing
  let nameStack: List<string> = parser.initialNames

  // Stack of stored positions for branch verification / backtracking
  const storedPositions: Array<number> = parser.initialPositions.slice()
  let storedPositionIndex: number = parser.initialPositionIndex

  // Stack and top value of chunk builders used by the repeat operation
  let builderStack: Stack<ChunkBuilder<unknown>> | undefined = undefined
  let lastBuilder: ChunkBuilder<unknown> | undefined = undefined
  const builders = parser.initialBuilders
  if (builders > 0) {
    lastBuilder = Chunk.builder<unknown>()
    let idx = 1
    while (idx <= builders) {
      builderStack = new Stack(Chunk.builder<unknown>(), builderStack)
      idx = idx + 1
    }
  }

  // Position in the source stream
  let position = 0

  function pushOp(op: ParserOp): void {
    opStack = new Stack(op, opStack)
  }

  function popOp(): ParserOp | undefined {
    if (opStack != null) {
      const value = opStack.value
      opStack = opStack.previous
      return value
    }
    return undefined
  }

  function pushSuccessResult(result: unknown): void {
    successResultStack = new Stack(result, successResultStack)
  }

  function popSuccessResult(): unknown | undefined {
    if (successResultStack != null) {
      const value = successResultStack.value
      successResultStack = successResultStack.previous
      return value
    }
    return undefined
  }

  function pushFailedResult(result: ParserError<unknown>): void {
    failedResultStack = new Stack(result, failedResultStack)
  }

  function popFailedResult(): ParserError<unknown> | undefined {
    if (failedResultStack != null) {
      const value = failedResultStack.value
      failedResultStack = failedResultStack.previous
      return value
    }
    return undefined
  }

  while (op != null) {
    if (op.needsEmptyResultSlot()) {
      if (lastSuccess2 != null) {
        pushSuccessResult(lastSuccess2)
      } else if (lastFailure2 != null) {
        pushSuccessResult(undefined)
        pushFailedResult(lastFailure2)
      }
      lastSuccess2 = lastSuccess1
      lastFailure2 = lastFailure1
      lastSuccess1 = undefined
      lastFailure1 = undefined
    }

    console.log(op._tag)
    console.log("Last Success 1: ", JSON.stringify(lastSuccess1))
    console.log("Last Success 2: ", JSON.stringify(lastSuccess2))

    switch (op._tag) {
      case "PushOp2": {
        if (op.pushBranchPosition) {
          storedPositions[storedPositionIndex] = position
          storedPositionIndex = storedPositionIndex + 1
        }
        pushOp(op.a)
        op = op.b
        break
      }

      case "PushOp3": {
        pushOp(op.a)
        pushOp(op.b)
        op = op.c
        break
      }

      case "PushOp4": {
        if (op.pushBranchPosition) {
          storedPositions[storedPositionIndex] = position
          storedPositionIndex = storedPositionIndex + 1
        }
        pushOp(op.a)
        pushOp(op.b)
        pushOp(op.c)
        op = op.d
        break
      }

      case "Lazy": {
        op = op.memoized.value
        break
      }

      case "PushResult": {
        if (op.popFirst) {
          if (lastSuccess1 != null) {
            lastSuccess1 = op.success
            lastFailure1 = op.failure
          }
        } else {
          lastSuccess1 = op.success
          lastFailure1 = op.failure
        }
        op = popOp()
        break
      }

      case "PushCapturedResult": {
        if (lastSuccess1 != null) {
          const stored = storedPositions[storedPositionIndex - 1]
          lastSuccess1 = source.slice(stored, position)
        }
        storedPositionIndex = storedPositionIndex - 1
        op = popOp()
        break
      }

      case "PushCurrentPosition": {
        lastSuccess1 = position
        op = popOp()
        break
      }

      case "CheckEnd": {
        if (position < source.length) {
          lastSuccess1 = undefined
          lastFailure1 = ParserError.NotConsumedAll(Option.none)
        } else {
          lastSuccess1 = undefined // {}
          lastFailure1 = undefined
        }
        op = popOp()
        break
      }

      case "PushName": {
        nameStack = nameStack.prepend(op.name)
        op = popOp()
        break
      }

      case "PopName": {
        if (nameStack.isCons()) {
          nameStack = nameStack.tail
        }
        op = popOp()
        break
      }

      case "ReadInputToResult": {
        if (position < source.length) {
          position = position + 1
          lastSuccess1 = source[position - 1]
        } else {
          lastFailure1 = ParserError.UnexpectedEndOfInput
        }
        op = popOp()
        break
      }

      case "MatchSeq": {
        const pos0 = position
        let pos = 0
        let failure: ParserError<unknown> | undefined = undefined
        while (pos < op.sequence.length && failure == null) {
          if ((pos0 + pos) < source.length) {
            const item = source[pos0 + pos]
            if (!Equals.equals(item, op.sequence.unsafeGet(pos))) {
              failure = ParserError.Failure(
                nameStack,
                pos0 + pos,
                op.createParserFailure(pos, item)
              )
            }
          } else {
            failure = ParserError.UnexpectedEndOfInput
          }
          pos = pos + 1
        }
        if (failure != null) {
          position = pos0
          lastFailure1 = failure
        } else {
          position = position + pos
          lastSuccess1 = op.as
        }
        op = popOp()
        break
      }

      case "MatchRegex": {
        const result = op.regex.test(position, source)
        if (result === Regex.NeedMoreInput) {
          lastFailure1 = ParserError.UnexpectedEndOfInput
        } else if (result === Regex.NotMatched) {
          switch (op.failAs._tag) {
            case "Some": {
              lastFailure1 = ParserError.Failure(nameStack, position, op.failAs.value)
              break
            }
            case "None": {
              lastSuccess1 = Chunk.empty()
              break
            }
          }
        } else {
          const oldPosition = position
          position = result
          switch (op.pushAs._tag) {
            case "MatchedChunk": {
              lastSuccess1 = Chunk.from(source.slice(oldPosition, result).split(""))
              break
            }
            case "SingleChar": {
              lastSuccess1 = source[result - 1]
              break
            }
            case "Ignored": {
              lastSuccess1 = undefined // {}
              break
            }
          }
        }
        op = popOp()
        break
      }

      case "TransformResultEither": {
        if (lastSuccess1 != null) {
          const either = op.f(lastSuccess1)
          switch (either._tag) {
            case "Left": {
              lastSuccess1 = undefined
              lastFailure1 = ParserError.Failure(nameStack, position, either.left)
              break
            }
            case "Right": {
              lastSuccess1 = either.right
              break
            }
          }
        }
        op = popOp()
        break
      }

      case "TransformResult": {
        if (lastSuccess1 != null && op.onSuccess != null) {
          lastSuccess1 = op.onSuccess(lastSuccess1)
        } else if (op.onFailure != null) {
          lastFailure1 = op.onFailure(lastFailure1!)
        }
        op = popOp()
        break
      }

      case "TransformResultFlipped": {
        if (lastSuccess1 != null) {
          lastFailure1 = op.onSuccess(position, lastSuccess1)
          lastSuccess1 = undefined
        } else {
          lastSuccess1 = op.onFailure(position, lastFailure1!)
          lastFailure1 = undefined
        }
        op = popOp()
        break
      }

      case "TransformLast2Results": {
        console.log("Strategy: ", op.strategy._tag)
        if (
          lastSuccess1 != null &&
          (
            lastSuccess2 != null ||
            op.strategy._tag === "IgnoreFirstWrapSecondAsRight" ||
            op.strategy._tag === "IgnoreFirstKeepSecond"
          )
        ) {
          switch (op.strategy._tag) {
            case "Zip": {
              lastSuccess1 = op.strategy.zip(lastSuccess2, lastSuccess1)
              break
            }
            case "KeepFirst": {
              lastSuccess1 = lastSuccess2
              break
            }
            case "KeepSecond":
            case "IgnoreFirstKeepSecond":
            case "IgnoreFirstWrapSecondAsRight": {
              lastSuccess1 = Either.right(lastSuccess1)
              break
            }
          }
        } else {
          if (lastFailure2 != null) {
            if (lastFailure1 != null) {
              lastFailure1 = lastFailure2.addFailedBranch(lastFailure1)
            } else {
              lastFailure1 = lastFailure2
            }
          }
          lastSuccess1 = undefined
        }
        lastSuccess2 = popSuccessResult()
        if (lastSuccess2 == null) {
          lastFailure2 = popFailedResult()
        } else {
          lastFailure2 = undefined
        }
        op = popOp()
        break
      }

      case "TransformResultToOption": {
        const storedPosition = storedPositions[storedPositionIndex - 1]
        storedPositionIndex = storedPositionIndex - 1
        const transform = !op.checkBranchPosition || position === storedPosition
        if (transform || lastSuccess1 != null) {
          if (lastSuccess1 != null) {
            lastSuccess1 = Option.some(lastSuccess1)
          } else {
            lastSuccess1 = Option.none
            lastFailure1 = undefined
          }
        }
        op = popOp()
        break
      }

      case "PopResultPushOp": {
        if (lastSuccess1 != null) {
          const parserOp = op.f(lastSuccess1)
          // Pop result stack start...
          lastSuccess1 = lastSuccess2
          lastFailure1 = lastFailure2
          lastSuccess2 = popSuccessResult()
          if (lastSuccess2 == null) {
            lastFailure2 = popFailedResult()
          } else {
            lastFailure2 = undefined
          }
          // ...pop result stack finish
          op = parserOp
        } else {
          op = popOp()
        }
        break
      }

      case "SkipOnFailure2": {
        if (lastSuccess1 == null && lastFailure1 != null) {
          popOp()
          popOp()
        }
        op = popOp()
        break
      }

      case "SkipOnSuccess2": {
        if (lastSuccess1 != null) {
          popOp()
          popOp()

          if (op.checkBranchPosition) {
            storedPositionIndex = storedPositionIndex - 1
          }

          if (op.transform != null) {
            lastSuccess1 = op.transform(lastSuccess1)
          }
        } else {
          const storedPosition = storedPositions[storedPositionIndex - 1]
          storedPositionIndex = storedPositionIndex - 1
          const proceed = !op.checkBranchPosition || position === storedPosition
          if (!proceed) {
            popOp()
            popOp()
          }
        }
        op = popOp()
        break
      }

      case "PushChunkBuilder": {
        if (lastBuilder != null) {
          builderStack = new Stack(lastBuilder, builderStack)
        }
        lastBuilder = Chunk.builder()
        op = popOp()
        break
      }

      case "ProcessRepeatedElement": {
        if (lastSuccess1 != null) {
          // Parse an item
          lastBuilder!.append(lastSuccess1)
          // Pop result stack start..
          lastSuccess1 = lastSuccess2
          lastFailure1 = lastFailure2
          lastSuccess2 = popSuccessResult()
          if (lastSuccess2 == null) {
            lastFailure2 = popFailedResult()
          } else {
            lastFailure2 = undefined
          }
          // ...finish pop result stack
          pushOp(op)
          op = op.parseElement
        } else {
          const builder = lastBuilder
          if (builderStack != null) {
            lastBuilder = builderStack.value
            builderStack = builderStack.previous
          } else {
            lastBuilder = undefined
          }
          const result = builder!.build()
          if (result.length < op.min) {
            // Not enough elements
            lastFailure1 = ParserError.UnexpectedEndOfInput
            popOp()
          } else {
            lastIgnoredError = lastFailure1
            lastFailure1 = undefined
            lastSuccess1 = result
          }
          op = popOp()
        }
        break
      }

      case "Cut": {
        if (lastSuccess1 != null) {
          let idx = 0
          while (idx < storedPositionIndex) {
            storedPositions[idx] = -1
            idx = idx + 1
          }
        }
        op = popOp()
        break
      }

      case "BacktrackOnFailure": {
        const stored = storedPositions[storedPositionIndex - 1]!
        storedPositionIndex = storedPositionIndex - 1
        if (lastSuccess1 == null && stored >= 0) {
          position = stored
        }
        op = popOp()
        break
      }
    }
  }

  if (lastSuccess1 == null) {
    return Either.left(lastFailure1!)
  }

  return Either.right(lastSuccess1)
}
