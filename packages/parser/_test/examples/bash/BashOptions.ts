/**
 * @tsplus type effect/parser/test/BashOption
 */
export type BashOption =
  | AllExport
  | BraceExpand
  | Emacs
  | ErrExit
  | ErrTrace
  | FuncTrace
  | HashAll
  | HistExpand
  | History
  | IgnoreEof
  | Keyword
  | Monitor
  | NoClobber
  | NoExec
  | NoGlob
  | NoLog
  | Notify
  | NoUnset
  | OneCmd
  | Physical
  | PipeFail
  | Posix
  | Privileged
  | Verbose
  | Vi
  | Xtrace

/**
 * @tsplus type effect/parser/test/BashOption.Ops
 */
export interface BashOptionOps {}
export const BashOption: BashOptionOps = {}

export interface AllExport {
  readonly _tag: "AllExport"
}

export interface BraceExpand {
  readonly _tag: "BraceExpand"
}

export interface Emacs {
  readonly _tag: "Emacs"
}

export interface ErrExit {
  readonly _tag: "ErrExit"
}

export interface ErrTrace {
  readonly _tag: "ErrTrace"
}

export interface FuncTrace {
  readonly _tag: "FuncTrace"
}

export interface HashAll {
  readonly _tag: "HashAll"
}

export interface HistExpand {
  readonly _tag: "HistExpand"
}

export interface History {
  readonly _tag: "History"
}

export interface IgnoreEof {
  readonly _tag: "IgnoreEof"
}

export interface Keyword {
  readonly _tag: "Keyword"
}

export interface Monitor {
  readonly _tag: "Monitor"
}

export interface NoClobber {
  readonly _tag: "NoClobber"
}

export interface NoExec {
  readonly _tag: "NoExec"
}

export interface NoGlob {
  readonly _tag: "NoGlob"
}

export interface NoLog {
  readonly _tag: "NoLog"
}

export interface Notify {
  readonly _tag: "Notify"
}

export interface NoUnset {
  readonly _tag: "NoUnset"
}

export interface OneCmd {
  readonly _tag: "OneCmd"
}

export interface Physical {
  readonly _tag: "Physical"
}

export interface PipeFail {
  readonly _tag: "PipeFail"
}

export interface Posix {
  readonly _tag: "Posix"
}

export interface Privileged {
  readonly _tag: "Privileged"
}

export interface Verbose {
  readonly _tag: "Verbose"
}

export interface Vi {
  readonly _tag: "Vi"
}

export interface Xtrace {
  readonly _tag: "Xtrace"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops AllExport
 */
export const allExport: BashOption = {
  _tag: "AllExport"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops BraceExpand
 */
export const braceExpand: BashOption = {
  _tag: "BraceExpand"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops Emacs
 */
export const emacs: BashOption = {
  _tag: "Emacs"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops ErrExit
 */
export const errExit: BashOption = {
  _tag: "ErrExit"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops ErrTrace
 */
export const errTrace: BashOption = {
  _tag: "ErrTrace"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops FuncTrace
 */
export const funcTrace: BashOption = {
  _tag: "FuncTrace"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops HashAll
 */
export const hashAll: BashOption = {
  _tag: "HashAll"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops HistExpand
 */
export const histExpand: BashOption = {
  _tag: "HistExpand"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops History
 */
export const history: BashOption = {
  _tag: "History"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops IgnoreEof
 */
export const ignoreEof: BashOption = {
  _tag: "IgnoreEof"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops Keyword
 */
export const keyword: BashOption = {
  _tag: "Keyword"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops Monitor
 */
export const monitor: BashOption = {
  _tag: "Monitor"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops NoClobber
 */
export const noClobber: BashOption = {
  _tag: "NoClobber"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops NoExec
 */
export const noExec: BashOption = {
  _tag: "NoExec"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops NoGlob
 */
export const noGlob: BashOption = {
  _tag: "NoGlob"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops NoLog
 */
export const noLog: BashOption = {
  _tag: "NoLog"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops Notify
 */
export const notify: BashOption = {
  _tag: "Notify"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops NoUnset
 */
export const noUnset: BashOption = {
  _tag: "NoUnset"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops OneCmd
 */
export const oneCmd: BashOption = {
  _tag: "OneCmd"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops Physical
 */
export const physical: BashOption = {
  _tag: "Physical"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops PipeFail
 */
export const pipeFail: BashOption = {
  _tag: "PipeFail"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops Posix
 */
export const posix: BashOption = {
  _tag: "Posix"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops Privileged
 */
export const privileged: BashOption = {
  _tag: "Privileged"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops Verbose
 */
export const verbose: BashOption = {
  _tag: "Verbose"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops Vi
 */
export const vi: BashOption = {
  _tag: "Vi"
}

/**
 * @tsplus static effect/parser/test/BashOption.Ops Xtrace
 */
export const xtrace: BashOption = {
  _tag: "Xtrace"
}
