import type { Instruction } from "@effect/parser/Printer/definition/instruction"
import { instruction } from "@effect/parser/Printer/definition/instruction"
import { Fail, Failed, Succeed } from "@effect/parser/Printer/definition/primitives"
import { constVoid } from "@tsplus/stdlib/data/Function"
import { Tuple } from "@tsplus/stdlib/data/Tuple"

/**
 * Print the specified `value` to the specified `target` implementation.
 *
 * @tsplus fluent effect/parser/Printer print
 */
export function print_<Error, Output, Value, T extends Target<any, Output>>(
  self: Printer<Error, Output, Value>,
  value: Value,
  target: T
): Either<Error, void> {
  const printer = new PrinterInterpreter(self)
  return printer.run(value, target)
}

/**
 * Print the specified `value` to the specified `target` implementation.
 *
 * @tsplus static effect/parser/Printer.Aspects print
 */
export const print = Pipeable(print_)

type Cont = (either: Either<unknown, unknown>) => Tuple<[Instruction, unknown, Option<Cont>]>

class PrinterInterpreter<Error, Output, Value> {
  private input: unknown
  private current: Instruction | undefined
  private result: Either<unknown, unknown> = Either.right(undefined)
  private stack: Stack<Cont> | undefined = undefined

  constructor(printer: Printer<Error, Output, Value>) {
    this.current = instruction(printer)
  }

  run<T extends Target<any, any>>(value: Value, output: T): Either<Error, void> {
    this.input = value
    while (this.current != null) {
      switch (this.current._tag) {
        case "Lazy": {
          this.current = instruction(this.current.memoized.value)
          break
        }
        case "Succeed": {
          this.finish(Either.right(undefined))
          break
        }
        case "Fail": {
          this.finish(Either.left(this.current.failure))
          break
        }
        case "FlatMapValue": {
          this.current = instruction(this.current.f(this.input))
          break
        }
        case "ProvideValue": {
          const oldInput = this.input
          this.input = this.current.value
          this.current = instruction(this.current.printer)
          this.pushContinuation((either) => {
            switch (either._tag) {
              case "Left": {
                return Tuple(new Fail(either.left), oldInput, Option.none)
              }
              case "Right": {
                return Tuple(new Succeed(undefined), oldInput, Option.none)
              }
            }
          })
          break
        }
        case "Passthrough": {
          output.write(this.input)
          this.finish(Either.right(undefined))
          break
        }
        case "ParseRegex": {
          const chunk = this.input as Chunk<string>
          if (this.current.onFailure._tag === "Some") {
            if (this.current.compiledRegex.value.test(0, chunk.join("")) >= 0) {
              this.finish(Either.right(undefined))
            } else {
              this.finish(Either.left(this.current.onFailure.value))
            }
          } else {
            for (const out of chunk) {
              output.write(out)
            }
            this.finish(Either.right(undefined))
          }
          break
        }
        case "SkipRegex": {
          for (const out of this.current.printAs) {
            output.write(out)
          }
          this.finish(Either.right(undefined))
          break
        }
        case "ParseRegexLastChar": {
          const char = this.input as string
          if (this.current.onFailure._tag === "Some") {
            if (this.current.compiledRegex.value.test(0, char) > 0) {
              output.write(char)
              this.finish(Either.right(undefined))
            } else {
              this.finish(Either.left(this.current.onFailure.value))
            }
          } else {
            output.write(char)
            this.finish(Either.right(undefined))
          }
          break
        }
        case "MapError": {
          const current = this.current
          this.current = instruction(current)
          this.pushContinuation((either) => {
            switch (either._tag) {
              case "Left": {
                return Tuple(new Fail(current.mapPrinterError(either.left)), this.input, Option.none)
              }
              case "Right": {
                return Tuple(new Succeed(undefined), this.input, Option.none)
              }
            }
          })
          break
        }
        case "Ignore": {
          if (Equals.equals(this.input, this.current.matches)) {
            const oldInput = this.input
            this.input = this.current.from
            this.current = instruction(this.current.printer)
            this.pushContinuation((either) => {
              switch (either._tag) {
                case "Left": {
                  return Tuple(new Fail(either.left), oldInput, Option.none)
                }
                case "Right": {
                  return Tuple(new Succeed(undefined), oldInput, Option.none)
                }
              }
            })
          } else {
            // TODO
            this.finish(Either.left(new Failed(ParserError.UnknownFailure(List.nil(), 0))))
          }
          break
        }
        case "Contramap": {
          const oldInput = this.input
          this.input = this.current.from
          this.current = instruction(this.current.printer)
          this.pushContinuation((either) => {
            switch (either._tag) {
              case "Left": {
                return Tuple(new Fail(either.left), oldInput, Option.none)
              }
              case "Right": {
                return Tuple(new Succeed(undefined), oldInput, Option.none)
              }
            }
          })
          break
        }
        case "ContramapEither": {
          const oldInput = this.input
          const either = this.current.from(this.input)
          switch (either._tag) {
            case "Left": {
              this.finish(either)
              break
            }
            case "Right": {
              this.input = either.right
              this.current = instruction(this.current.printer)
              this.pushContinuation((either) => {
                switch (either._tag) {
                  case "Left": {
                    return Tuple(new Fail(either.left), oldInput, Option.none)
                  }
                  case "Right": {
                    return Tuple(new Succeed(undefined), oldInput, Option.none)
                  }
                }
              })
              break
            }
          }
          break
        }
        case "Zip": {
          const oldInput = this.input
          const left = this.current.left
          const right = this.current.right
          const { tuple: [valueA, valueB] } = this.current.unzipValue(this.input as any)
          this.current = instruction(left)
          this.input = valueA
          const k1: Cont = (leftResult) => {
            switch (leftResult._tag) {
              case "Left": {
                return Tuple(new Fail(leftResult.left), oldInput, Option.none)
              }
              case "Right": {
                const k2: Cont = (rightResult) => {
                  switch (rightResult._tag) {
                    case "Left": {
                      return Tuple(new Fail(rightResult.left), oldInput, Option.none)
                    }
                    case "Right": {
                      return Tuple(new Succeed(undefined), oldInput, Option.none)
                    }
                  }
                }
                return Tuple(instruction(right), valueB, Option.some(k2))
              }
            }
          }
          this.pushContinuation(k1)
          break
        }
        case "ZipLeft": {
          const oldInput = this.input
          const valueA = this.input
          const valueB = undefined
          const left = this.current.left
          const right = this.current.right
          this.current = instruction(left)
          this.input = valueA
          const k1: Cont = (leftResult) => {
            switch (leftResult._tag) {
              case "Left": {
                return Tuple(new Fail(leftResult.left), oldInput, Option.none)
              }
              case "Right": {
                const k2: Cont = (rightResult) => {
                  switch (rightResult._tag) {
                    case "Left": {
                      return Tuple(new Fail(rightResult.left), oldInput, Option.none)
                    }
                    case "Right": {
                      return Tuple(new Succeed(undefined), oldInput, Option.none)
                    }
                  }
                }
                return Tuple(instruction(right), valueB, Option.some(k2))
              }
            }
          }
          this.pushContinuation(k1)
          break
        }
        case "ZipRight": {
          const oldInput = this.input
          const valueA = undefined
          const valueB = this.input
          const left = this.current.left
          const right = this.current.right
          this.current = instruction(left)
          this.input = valueA
          const k1: Cont = (leftResult) => {
            switch (leftResult._tag) {
              case "Left": {
                return Tuple(new Fail(leftResult.left), oldInput, Option.none)
              }
              case "Right": {
                const k2: Cont = (rightResult) => {
                  switch (rightResult._tag) {
                    case "Left": {
                      return Tuple(new Fail(rightResult.left), oldInput, Option.none)
                    }
                    case "Right": {
                      return Tuple(new Succeed(undefined), oldInput, Option.none)
                    }
                  }
                }
                return Tuple(instruction(right), valueB, Option.some(k2))
              }
            }
          }
          this.pushContinuation(k1)
          break
        }
        case "OrElseEither": {
          const oldInput = this.input
          const left = this.current.left
          const right = this.current.right
          const eitherInput = this.input as Either<any, any>
          switch (eitherInput._tag) {
            case "Left": {
              this.input = eitherInput.left
              this.current = instruction(left)
              this.pushContinuation((either) => {
                switch (either._tag) {
                  case "Left": {
                    return Tuple(new Fail(either.left), oldInput, Option.none)
                  }
                  case "Right": {
                    return Tuple(new Succeed(undefined), oldInput, Option.none)
                  }
                }
              })
              break
            }
            case "Right": {
              this.input = eitherInput.right
              this.current = instruction(right)
              this.pushContinuation((either) => {
                switch (either._tag) {
                  case "Left": {
                    return Tuple(new Fail(either.left), oldInput, Option.none)
                  }
                  case "Right": {
                    return Tuple(new Succeed(undefined), oldInput, Option.none)
                  }
                }
              })
              break
            }
          }
          break
        }
        case "OrElse": {
          const left = this.current.left
          const right = this.current.right
          this.current = instruction(left)
          const capture = output.capture()
          this.pushContinuation((either) => {
            switch (either._tag) {
              case "Left": {
                output.drop(capture)
                return Tuple(instruction(right), this.input, Option.none)
              }
              case "Right": {
                output.emit(capture)
                return Tuple(new Succeed(undefined), this.input, Option.none)
              }
            }
          })
          break
        }
        case "Optional": {
          const oldInput = this.input
          const optInput = this.input as Option<any>
          switch (optInput._tag) {
            case "Some": {
              this.input = optInput.value
              this.current = instruction(this.current.printer)
              this.pushContinuation((either) => {
                switch (either._tag) {
                  case "Left": {
                    return Tuple(new Fail(either.left), oldInput, Option.none)
                  }
                  case "Right": {
                    return Tuple(new Succeed(undefined), oldInput, Option.none)
                  }
                }
              })
              break
            }
            case "None": {
              this.finish(Either.right(undefined))
              break
            }
          }
          break
        }
        case "Repeat": {
          const current = this.current
          const inputChunk = this.input as Chunk<any>
          if (inputChunk.length === 0) {
            this.finish(Either.right(undefined))
          } else {
            const head = inputChunk.unsafeHead()!
            const tail = inputChunk.unsafeTail()
            this.current = instruction(this.current.printer)
            this.input = head
            this.pushContinuation((either) => {
              switch (either._tag) {
                case "Left": {
                  return Tuple(new Fail(either.left), inputChunk, Option.none)
                }
                case "Right": {
                  const k: Cont = (either) => {
                    switch (either._tag) {
                      case "Left": {
                        return Tuple(new Fail(either.left), inputChunk, Option.none)
                      }
                      case "Right": {
                        return Tuple(new Succeed(undefined), inputChunk, Option.none)
                      }
                    }
                  }
                  return Tuple(current, tail, Option.some(k))
                }
              }
            })
          }
          break
        }
      }
    }
    return this.result.map(constVoid) as Either<Error, void>
  }

  private finish(result: Either<unknown, void>): void {
    if (this.isStackEmpty()) {
      this.result = result
      this.current = undefined
    } else {
      const k = this.popContinuation()!
      const { tuple: [next, nextI, nextK] } = k(result)
      this.current = next
      this.input = nextI
      if (nextK._tag === "Some") {
        this.pushContinuation(nextK.value)
      }
    }
  }

  private isStackEmpty(): boolean {
    return this.stack == null
  }

  private popContinuation(): Cont | undefined {
    if (this.stack != null) {
      const current = this.stack.value
      this.stack = this.stack.previous
      return current
    }
    return undefined
  }

  pushContinuation(k: Cont): void {
    this.stack = new Stack(k, this.stack)
  }
}
