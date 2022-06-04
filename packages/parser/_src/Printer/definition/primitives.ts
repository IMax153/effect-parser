import { BasePrinter } from "@effect/parser/Printer/definition/base"
import type { MergeTuple } from "@tsplus/stdlib/data/Tuple"

export type Unzip<A> = A extends Tuple<[...infer TA, infer TB]> ? Tuple<[...TA, TB]> : Tuple<[undefined, A]>

export class Lazy<Error, Output, Value> extends BasePrinter<Error, Output, Value> {
  readonly _tag = "Lazy"

  readonly memoized: LazyValue<Printer<Error, Output, Value>>

  constructor(readonly inner: () => Printer<Error, Output, Value>) {
    super()
    this.memoized = LazyValue.make(inner)
  }
}

export class Succeed extends BasePrinter<never, never, unknown> {
  readonly _tag = "Succeed"

  constructor(readonly value: unknown) {
    super()
  }
}

export class Fail<Error> extends BasePrinter<Error, never, unknown> {
  readonly _tag = "Fail"

  constructor(readonly failure: Error) {
    super()
  }
}

export class Failed<Error> extends BasePrinter<Error, never, unknown> {
  readonly _tag = "Failed"

  constructor(readonly failure: ParserError<Error>) {
    super()
  }
}

export class ProvideValue<Error, Output, Value> extends BasePrinter<Error, Output, unknown> {
  readonly _tag = "ProvideValue"

  constructor(readonly printer: Printer<Error, Output, Value>, readonly value: Value) {
    super()
  }
}

export class Passthrough<Output, Value> extends BasePrinter<never, Output, Value> {
  readonly _tag = "Passthrough"
}

export class SkipRegex extends BasePrinter<never, string, void> {
  readonly _tag = "SkipRegex"

  readonly compiledRegex: LazyValue<Regex.Compiled>

  constructor(readonly regex: Regex, readonly printAs: Chunk<string>) {
    super()
    this.compiledRegex = LazyValue.make(() => this.regex.compile())
  }
}

export class ParseRegex<Error> extends BasePrinter<Error, string, Chunk<string>> {
  readonly _tag = "ParseRegex"

  readonly compiledRegex: LazyValue<Regex.Compiled>

  constructor(readonly regex: Regex, readonly onFailure: Option<Error>) {
    super()
    this.compiledRegex = LazyValue.make(() => this.regex.compile())
  }
}

export class ParseRegexLastChar<Error> extends BasePrinter<Error, string, string> {
  readonly _tag = "ParseRegexLastChar"

  readonly compiledRegex: LazyValue<Regex.Compiled>

  constructor(readonly regex: Regex, readonly onFailure: Option<Error>) {
    super()
    this.compiledRegex = LazyValue.make(() => this.regex.compile())
  }
}

export class ContramapEither<Error, Error2, Output, Value, Value2> extends BasePrinter<Error2, Output, Value2> {
  readonly _tag = "ContramapEither"

  constructor(
    readonly printer: Printer<Error, Output, Value>,
    readonly from: (value: Value2) => Either<Error2, Value>
  ) {
    super()
  }
}

export class Contramap<Error, Error2, Output, Value, Value2> extends BasePrinter<Error2, Output, Value2> {
  readonly _tag = "Contramap"

  constructor(
    readonly printer: Printer<Error, Output, Value>,
    readonly from: (value: Value2) => Value
  ) {
    super()
  }
}

export class Ignore<Error, Output, Value, Value2> extends BasePrinter<Error, Output, Value2> {
  readonly _tag = "Ignore"

  constructor(
    readonly printer: Printer<Error, Output, Value>,
    readonly matches: Value2,
    readonly from: Value
  ) {
    super()
  }
}

export class Zip<Error, Error2, Output, Output2, Value, Value2>
  extends BasePrinter<Error | Error2, Output & Output2, MergeTuple<Value, Value2>>
{
  readonly _tag = "Zip"

  constructor(
    readonly left: Printer<Error, Output, Value>,
    readonly right: Printer<Error2, Output2, Value2>,
    readonly unzipValue: (zipped: MergeTuple<Value, Value2>) => Tuple<[Value, Value2]>
  ) {
    super()
  }
}

export class ZipLeft<Error, Error2, Output, Output2, Value, Value2>
  extends BasePrinter<Error | Error2, Output & Output2, Value>
{
  readonly _tag = "ZipLeft"

  constructor(
    readonly left: Printer<Error, Output, Value>,
    readonly right: Printer<Error2, Output2, Value2>
  ) {
    super()
  }
}

export class ZipRight<Error, Error2, Output, Output2, Value, Value2>
  extends BasePrinter<Error | Error2, Output & Output2, Value2>
{
  readonly _tag = "ZipRight"

  constructor(
    readonly left: Printer<Error, Output, Value>,
    readonly right: Printer<Error2, Output2, Value2>
  ) {
    super()
  }
}

export class FlatMapValue<Error, Output, Value, Value2> extends BasePrinter<Error, Output, Value> {
  readonly _tag = "FlatMapValue"

  constructor(readonly f: (value: Value) => Printer<Error, Output, Value2>) {
    super()
  }
}

export class OrElseEither<Error, Error2, Output, Output2, Value, Value2>
  extends BasePrinter<Error2, Output & Output2, Either<Value, Value2>>
{
  readonly _tag = "OrElseEither"

  constructor(
    readonly left: Printer<Error, Output, Value>,
    readonly right: Printer<Error2, Output2, Value2>
  ) {
    super()
  }
}

export class OrElse<Error, Error2, Output, Output2, Value, Value2>
  extends BasePrinter<Error2, Output & Output2, Value | Value2>
{
  readonly _tag = "OrElse"

  constructor(
    readonly left: Printer<Error, Output, Value>,
    readonly right: Printer<Error2, Output2, Value2>
  ) {
    super()
  }
}

export class Optional<Error, Output, Value> extends BasePrinter<Error, Output, Option<Value>> {
  readonly _tag = "Optional"

  constructor(readonly printer: Printer<Error, Output, Value>) {
    super()
  }
}

export class Repeat<Error, Output, Value> extends BasePrinter<Error, Output, Chunk<Value>> {
  readonly _tag = "Repeat"

  constructor(
    readonly printer: Printer<Error, Output, Value>,
    readonly min: number,
    readonly max: Option<number>
  ) {
    super()
  }
}

export class MapError<Error, Error2, Output, Value> extends BasePrinter<Error2, Output, Value> {
  readonly _tag = "MapError"

  constructor(
    readonly printer: Printer<Error, Output, Value>,
    readonly mapPrinterError: (error: Error) => Error2
  ) {
    super()
  }
}
