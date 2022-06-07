/**
 * @tsplus type effect/parser/Parser/RegexResultPush
 */
export type RegexResultPush = MatchedChunk | SingleChar | Ignored

/**
 * @tsplus type effect/parser/Parser/RegexResultPush.Ops
 */
export interface RegexResultPushOps {}
export const RegexResultPush: RegexResultPushOps = {}

export interface MatchedChunk {
  readonly _tag: "MatchedChunk"
}

export interface SingleChar {
  readonly _tag: "SingleChar"
}

export interface Ignored {
  readonly _tag: "Ignored"
}

/**
 * @tsplus static effect/parser/Parser/RegexResultPush.Ops MatchedChunk
 */
export const matchedChunk: RegexResultPush = {
  _tag: "MatchedChunk"
}

/**
 * @tsplus static effect/parser/Parser/RegexResultPush.Ops SingleChar
 */
export const singleChar: RegexResultPush = {
  _tag: "SingleChar"
}

/**
 * @tsplus static effect/parser/Parser/RegexResultPush.Ops Ignored
 */
export const ignored: RegexResultPush = {
  _tag: "Ignored"
}
