import type {
  Backtrack,
  CaptureString,
  End,
  Fail,
  Failed,
  FlatMap,
  Ignore,
  Index,
  Lazy,
  MapError,
  Named,
  Not,
  Optional,
  OrElse,
  OrElseEither,
  ParseRegex,
  ParseRegexLastChar,
  Repeat,
  SetAutoBacktrack,
  SkipRegex,
  Succeed,
  Transform,
  TransformEither,
  Zip,
  ZipLeft,
  ZipRight
} from "@effect/parser/Parser/definition/primitives"

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
