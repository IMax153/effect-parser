import { BaseParser } from "@effect/parser/Parser/definition/base"

export type Instruction =
  | Lazy<any, any, any>
  | Succeed<any>
  | Fail<any>
  | Failed<any>
  | Named<any, any, any>
  | SkipRegex<any>
  | ParseRegex<any>
  | ParseRegexLastChar<any>
  | TransformEither<any, any, any, any, any>
  | Transform<any, any, any, any>
  | Ignore<any, any, any, any>
  | CaptureString<any>
  | Zip<any, any, any, any, any, any, any>
  | ZipLeft<any, any, any, any, any>
  | ZipRight<any, any, any, any, any>
  | FlatMap<any, any, any, any, any, any>
  | OrElseEither<any, any, any, any, any, any>
  | OrElse<any, any, any, any, any, any>
  | Optional<any, any, any>
  | Repeat<any, any, any>
  | Not<any, any, any>
  | Backtrack<any, any, any>
  | SetAutoBacktrack<any, any, any>
  | MapError<any, any, any, any>
  | Index
  | End

/**
 * @tsplus macro identity
 */
export function instruction<Error, Input, Result>(self: Parser<Error, Input, Result>): Instruction {
  // @ts-expect-error
  return self
}

export class Lazy<Error, Input, Result> extends BaseParser<Error, Input, Result> {
  readonly _tag = "Lazy"
  constructor(readonly inner: () => Parser<Error, Input, Result>) {
    super()
  }
}

export class Succeed<Result> extends BaseParser<never, unknown, Result> {
  readonly _tag = "Succeed"
  constructor(readonly value: Result) {
    super()
  }
}

export class Fail<Error> extends BaseParser<Error, unknown, never> {
  readonly _tag = "Fail"
  constructor(readonly failure: Error) {
    super()
  }
}

export class Failed<Error> extends BaseParser<Error, unknown, never> {
  readonly _tag = "Failed"
  constructor(readonly failure: ParserError<Error>) {
    super()
  }
}

export class Named<Error, Input, Result> extends BaseParser<Error, Input, Result> {
  readonly _tag = "Named"
  constructor(readonly parser: Parser<Error, Input, Result>, readonly name: string) {
    super()
  }
}

export class SkipRegex<Error> extends BaseParser<Error, string, void> {
  readonly _tag = "SkipRegex"
  constructor(readonly regex: Regex, readonly onFailure: Option<Error>) {
    super()
  }
}

export class ParseRegex<Error> extends BaseParser<Error, string, Chunk<string>> {
  readonly _tag = "ParseRegex"
  constructor(readonly regex: Regex, readonly onFailure: Option<Error>) {
    super()
  }
}

export class ParseRegexLastChar<Error> extends BaseParser<Error, string, string> {
  readonly _tag = "ParseRegexLastChar"
  constructor(readonly regex: Regex, readonly onFailure: Option<Error>) {
    super()
  }
}

export class TransformEither<Error, Error2, Input, Result, Result2> extends BaseParser<Error2, Input, Result2> {
  readonly _tag = "TransformEither"
  constructor(
    readonly parser: Parser<Error, Input, Result>,
    readonly to: (result: Result) => Either<Error2, Result2>
  ) {
    super()
  }
}

export class Transform<Error, Input, Result, Result2> extends BaseParser<Error, Input, Result2> {
  readonly _tag = "Transform"
  constructor(
    readonly parser: Parser<Error, Input, Result>,
    readonly to: (result: Result) => Result2
  ) {
    super()
  }
}

export class Ignore<Error, Input, Result, Result2> extends BaseParser<Error, Input, Result2> {
  readonly _tag = "Ignore"
  constructor(
    readonly parser: Parser<Error, Input, Result>,
    readonly to: Result2
  ) {
    super()
  }
}

export class CaptureString<Error> extends BaseParser<Error, string, string> {
  readonly _tag = "CaptureString"
  constructor(readonly parser: Parser<Error, string, unknown>) {
    super()
  }
}

export class Zip<Error, Error2, Input, Input2, Result, Result2, ZippedResult>
  extends BaseParser<Error | Error2, Input & Input2, ZippedResult>
{
  readonly _tag = "Zip"
  constructor(
    readonly left: Parser<Error, Input, Result>,
    readonly right: Parser<Error2, Input2, Result2>,
    readonly zip: (result: Result, result2: Result2) => ZippedResult
  ) {
    super()
  }
}

export class ZipLeft<Error, Error2, Input, Input2, Result> extends BaseParser<Error | Error2, Input & Input2, Result> {
  readonly _tag = "ZipLeft"
  constructor(
    readonly left: Parser<Error, Input, Result>,
    readonly right: Parser<Error2, Input2, unknown>
  ) {
    super()
  }
}

export class ZipRight<Error, Error2, Input, Input2, Result2>
  extends BaseParser<Error | Error2, Input & Input2, Result2>
{
  readonly _tag = "ZipRight"
  constructor(
    readonly left: Parser<Error, Input, unknown>,
    readonly right: Parser<Error2, Input2, Result2>
  ) {
    super()
  }
}

export class FlatMap<Error, Error2, Input, Input2, Result, Result2>
  extends BaseParser<Error | Error2, Input & Input2, Result2>
{
  readonly _tag = "FlatMap"
  constructor(
    readonly parser: Parser<Error, Input, Result>,
    readonly f: (result: Result) => Parser<Error2, Input2, Result2>
  ) {
    super()
  }
}

export class OrElseEither<Error, Error2, Input, Input2, Result, Result2>
  extends BaseParser<Error2, Input & Input2, Either<Result, Result2>>
{
  readonly _tag = "OrElseEither"
  constructor(
    readonly left: Parser<Error, Input, Result>,
    readonly right: Parser<Error2, Input2, Result2>
  ) {
    super()
  }
}

export class OrElse<Error, Error2, Input, Input2, Result, Result2>
  extends BaseParser<Error2, Input & Input2, Result | Result2>
{
  readonly _tag = "OrElse"
  constructor(
    readonly left: Parser<Error, Input, Result>,
    readonly right: Parser<Error2, Input2, Result2>
  ) {
    super()
  }
}

export class Optional<Error, Input, Result> extends BaseParser<Error, Input, Option<Result>> {
  readonly _tag = "Optional"
  constructor(readonly parser: Parser<Error, Input, Result>) {
    super()
  }
}

export class Repeat<Error, Input, Result> extends BaseParser<Error, Input, Chunk<Result>> {
  readonly _tag = "Repeat"
  constructor(
    readonly parser: Parser<Error, Input, Result>,
    readonly min: number,
    readonly max: Option<number>
  ) {
    super()
  }
}

export class Not<Error, Error2, Input> extends BaseParser<Error2, Input, void> {
  readonly _tag = "Not"
  constructor(readonly parser: Parser<Error, Input, unknown>, readonly failure: Error2) {
    super()
  }
}

export class Backtrack<Error, Input, Result> extends BaseParser<Error, Input, Result> {
  readonly _tag = "Backtrack"
  constructor(readonly parser: Parser<Error, Input, Result>) {
    super()
  }
}

export class SetAutoBacktrack<Error, Input, Result> extends BaseParser<Error, Input, Result> {
  readonly _tag = "SetAutoBacktrack"
  constructor(
    readonly parser: Parser<Error, Input, Result>,
    readonly enabled: boolean
  ) {
    super()
  }
}

export class MapError<Error, Error2, Input, Result> extends BaseParser<Error2, Input, Result> {
  readonly _tag = "MapError"
  constructor(
    readonly parser: Parser<Error, Input, Result>,
    readonly mapParserError: (error: ParserError<Error>) => ParserError<Error2>
  ) {
    super()
  }
}

export class Index extends BaseParser<never, unknown, number> {
  readonly _tag = "Index"
}

export class End extends BaseParser<never, unknown, void> {
  readonly _tag = "End"
}
