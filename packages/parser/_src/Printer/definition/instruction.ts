import type {
  Contramap,
  ContramapEither,
  Fail,
  Failed,
  FlatMapValue,
  Ignore,
  Lazy,
  MapError,
  Optional,
  OrElse,
  OrElseEither,
  ParseRegex,
  ParseRegexLastChar,
  Passthrough,
  ProvideValue,
  Repeat,
  SkipRegex,
  Succeed,
  Zip,
  ZipLeft,
  ZipRight
} from "@effect/parser/Printer/definition/primitives"

export type Instruction =
  | Lazy<any, any, any>
  | Succeed
  | Fail<any>
  | Failed<any>
  | ProvideValue<any, any, any>
  | Passthrough<any, any>
  | SkipRegex
  | ParseRegex<any>
  | ParseRegexLastChar<any>
  | ContramapEither<any, any, any, any, any>
  | Contramap<any, any, any, any, any>
  | Ignore<any, any, any, any>
  | Zip<any, any, any, any, any, any>
  | ZipLeft<any, any, any, any, any, any>
  | ZipRight<any, any, any, any, any, any>
  | FlatMapValue<any, any, any, any>
  | OrElseEither<any, any, any, any, any, any>
  | OrElse<any, any, any, any, any, any>
  | Optional<any, any, any>
  | Repeat<any, any, any>
  | MapError<any, any, any, any>

/**
 * @tsplus macro identity
 */
export function instruction<Error, Output, Value>(self: Printer<Error, Output, Value>): Instruction {
  // @ts-expect-error
  return self
}
