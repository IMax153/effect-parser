import { IllegalArgumentException, isIllegalArgumentException } from "@effect/core/io/Cause/errors"
import { Tuple } from "@tsplus/stdlib/data/Tuple"

/**
 * A regex compiler that uses tables to do all the lifting.
 */
export function compileToTabular(self: Regex): Option<Regex.Compiled> {
  try {
    const lookupFunction = compileLookupFunction(self)
    const test = compileTest(lookupFunction)
    const compiled: Regex.Compiled = {
      test,
      matches: (value) => {
        return test(0, value) >= 0
      }
    }
    return Option.some(compiled)
  } catch (error) {
    if (isIllegalArgumentException(error)) {
      return Option.none
    }
    throw error
  }
}

function compileTest(self: LookupFunction) {
  return (index: number, chars: string): number => {
    let curLookup = self
    let curIdx = index
    const inputLen = chars.length
    let returnV = Regex.NeedMoreInput
    while (curIdx < inputLen) {
      const char = chars[curIdx]!.charCodeAt(0)
      curIdx = curIdx + 1
      const step = curLookup.lookup(char)
      switch (step._tag) {
        case "LookupError": {
          if (returnV === Regex.NeedMoreInput) {
            returnV = Regex.NotMatched
          }
          curIdx = inputLen
          break
        }
        case "Matched": {
          returnV = curIdx
          curIdx = inputLen
          break
        }
        case "MatchedOrJump": {
          returnV = curIdx
          curLookup = step.lookupFunction
          break
        }
        case "Jump": {
          curLookup = step.lookupFunction
          break
        }
      }
    }
    if ((returnV === Regex.NeedMoreInput || returnV === Regex.NotMatched) && self.supportsEmpty()) {
      return index
    }
    return returnV
  }
}

function compileLookupFunction(regex: Regex): LookupFunction {
  switch (regex._tag) {
    case "Succeed": {
      return new Empty()
    }
    case "OneOf": {
      if (regex.bitset == BitSet.AllChars) {
        return new AcceptAll()
      }
      const array = Array.from(
        { length: regex.bitset.forAny((n) => n >= 256) ? 65536 : 256 },
        () => LookupFunction.Step.LookupError
      )
      regex.bitset.forEach((n) => {
        array[n] = LookupFunction.Step.Matched
      })
      return new Table(Chunk.from(array))
    }
    case "Sequence": {
      return compileLookupFunction(regex.first) > compileLookupFunction(regex.second)
    }
    case "Repeat": {
      if (regex.max.isSome()) {
        const min = regex.min.getOrElse(0)
        const regex0 = compileLookupFunction(regex.regex)
        const start = min === 0 ?
          compileLookupFunction(Regex.empty) :
          List.from(Array.from({ length: min - 1 }, () => regex0)).reduce(regex0, (a, b) => a > b)
        const regexes = Chunk.range(min, regex.max.value - 1).reduce(
          Tuple(HashSet(start), start),
          ({ tuple: [choices, current] }, _) => {
            const next = current > regex0
            return Tuple(choices + next, next)
          }
        ).get(0).asImmutableArray()
        const head = regexes.array[0]!
        const tail = regexes.array.slice(1)
        return tail.reduce((a, b) => a.or(b), head)
      }
      throw new IllegalArgumentException("Cannot compile to a DFA unbounded repetition")
    }
    case "Or": {
      return compileLookupFunction(regex.left) | compileLookupFunction(regex.right)
    }
    case "And": {
      return compileLookupFunction(regex.left) & compileLookupFunction(regex.right)
    }
  }
}

// =============================================================================
// LookupFunction
// =============================================================================

export const LookupFunctionSym = Symbol.for("@effect/parser/Regex/LookupFunction")
export type LookupFunctionSym = typeof LookupFunctionSym

/**
 * @tsplus type effect/parser/Regex/LookupFunction
 */
export type LookupFunction = AcceptAll | And | Or | Sequence | Empty | Table

/**
 * @tsplus type effect/parser/Regex/LookupFunction.Ops
 */
export interface LookupFunctionOps {
  readonly Step: LookupFunction.StepOps
}
export const LookupFunction: LookupFunctionOps = {
  Step: {}
}

export declare namespace LookupFunction {
  /**
   * @tsplus type effect/parser/Regex/LookupFunction.Step
   */
  export type Step = LookupFunctionStep

  /**
   * @tsplus type effect/parser/Regex/LookupFunction.Step.Ops
   */
  export interface StepOps {}
}

export class Empty implements Hash, Equals {
  readonly _tag = "Empty"

  readonly [LookupFunctionSym]: LookupFunctionSym = LookupFunctionSym;

  [Hash.sym](): number {
    return Hash.string("@effect/parser/Regex/LookupFunction.Empty")
  }

  [Equals.sym](that: unknown): boolean {
    return LookupFunction.is(that) && that._tag === "Empty"
  }
}

export class AcceptAll implements Hash, Equals {
  readonly _tag = "AcceptAll"

  readonly [LookupFunctionSym]: LookupFunctionSym = LookupFunctionSym;

  [Hash.sym](): number {
    return Hash.string("@effect/parser/Regex/LookupFunction.AcceptAll")
  }

  [Equals.sym](that: unknown): boolean {
    return LookupFunction.is(that) && that._tag === "AcceptAll"
  }
}

export class And implements Hash, Equals {
  readonly _tag = "And"

  readonly [LookupFunctionSym]: LookupFunctionSym = LookupFunctionSym

  constructor(readonly left: LookupFunction, readonly right: LookupFunction) {}

  [Hash.sym](): number {
    return Hash.combine(Hash.unknown(this.left), Hash.unknown(this.right))
  }

  [Equals.sym](that: unknown): boolean {
    return LookupFunction.is(that) &&
      that._tag === "And" &&
      this.left == that.left &&
      this.right == that.right
  }
}

export class Or implements Hash, Equals {
  readonly _tag = "Or"

  readonly [LookupFunctionSym]: LookupFunctionSym = LookupFunctionSym

  constructor(readonly left: LookupFunction, readonly right: LookupFunction) {}

  [Hash.sym](): number {
    return Hash.combine(Hash.unknown(this.left), Hash.unknown(this.right))
  }

  [Equals.sym](that: unknown): boolean {
    return LookupFunction.is(that) &&
      that._tag === "Or" &&
      this.left == that.left &&
      this.right == that.right
  }
}

export class Sequence implements Hash, Equals {
  readonly _tag = "Sequence"

  readonly [LookupFunctionSym]: LookupFunctionSym = LookupFunctionSym

  constructor(readonly first: LookupFunction, readonly second: LookupFunction) {}

  [Hash.sym](): number {
    return Hash.combine(Hash.unknown(this.first), Hash.unknown(this.second))
  }

  [Equals.sym](that: unknown): boolean {
    return LookupFunction.is(that) &&
      that._tag === "Sequence" &&
      this.first == that.first &&
      this.second == that.second
  }
}

export class Table implements Hash, Equals {
  readonly _tag = "Table"

  readonly [LookupFunctionSym]: LookupFunctionSym = LookupFunctionSym

  constructor(readonly parseChar: Chunk<LookupFunction.Step>) {}

  [Hash.sym](): number {
    return Hash.unknown(this.parseChar)
  }

  [Equals.sym](that: unknown): boolean {
    return LookupFunction.is(that) &&
      that._tag === "Table" &&
      this.parseChar == that.parseChar
  }
}

/**
 * @tsplus static effect/parser/Regex/LookupFunction.Ops Empty
 */
export const empty: LookupFunction = new Empty()

/**
 * @tsplus static effect/parser/Regex/LookupFunction.Ops AcceptAll
 */
export const acceptAll: LookupFunction = new AcceptAll()

/**
 * @tsplus operator effect/parser/Regex/LookupFunction >
 * @tsplus fluent effect/parser/Regex/LookupFunction sequence
 * @tsplus static effect/parser/Regex/LookupFunction.Ops Sequence
 */
export function sequence(self: LookupFunction, that: LookupFunction): LookupFunction {
  switch (self._tag) {
    case "Empty": {
      return that
    }
    case "AcceptAll":
    case "And":
    case "Or":
    case "Sequence": {
      return that._tag === "Empty" ? self : new Sequence(self, that)
    }
    case "Table": {
      return that.supportsEmpty() ?
        new Table(self.parseChar.map((step) => step > LookupFunction.Step.MatchedOrJump(that))) :
        new Table(self.parseChar.map((step) => step > LookupFunction.Step.Jump(that)))
    }
  }
}

/**
 * @tsplus operator effect/parser/Regex/LookupFunction &
 * @tsplus fluent effect/parser/Regex/LookupFunction and
 * @tsplus static effect/parser/Regex/LookupFunction.Ops And
 */
export function and(self: LookupFunction, that: LookupFunction): LookupFunction {
  switch (self._tag) {
    case "Empty": {
      return that
    }
    case "AcceptAll":
    case "And":
    case "Or":
    case "Sequence": {
      return that._tag === "Empty" ? self : new And(self, that)
    }
    case "Table": {
      return that._tag === "Table" ?
        combineWith(self, that, (a, b) => a & b) :
        new And(self, that)
    }
  }
}

/**
 * @tsplus operator effect/parser/Regex/LookupFunction |
 * @tsplus fluent effect/parser/Regex/LookupFunction or
 * @tsplus static effect/parser/Regex/LookupFunction.Ops Or
 */
export function or(self: LookupFunction, that: LookupFunction): LookupFunction {
  switch (self._tag) {
    case "Empty":
    case "AcceptAll":
    case "And":
    case "Or":
    case "Sequence": {
      return new Or(self, that)
    }
    case "Table": {
      return that._tag === "Table" ?
        combineWith(self, that, (a, b) => a | b) :
        new Or(self, that)
    }
  }
}

/**
 * @tsplus static effect/parser/Regex/LookupFunction.Ops Table
 */
export function table(parseChar: Chunk<LookupFunction.Step>): LookupFunction {
  return new Table(parseChar)
}

/**
 * @tsplus static effect/parser/Regex/LookupFunction.Ops is
 */
export function isLookupFunction(u: unknown): u is LookupFunction {
  return typeof u === "object" && u != null && LookupFunctionSym in u
}

/**
 * @tsplus fluent effect/parser/Regex/LookupFunction supportsEmpty
 */
export function supportsEmpty(self: LookupFunction): boolean {
  switch (self._tag) {
    case "Empty": {
      return true
    }
    case "AcceptAll": {
      return false
    }
    case "And": {
      return supportsEmpty(self.left) && supportsEmpty(self.right)
    }
    case "Or": {
      return supportsEmpty(self.left) || supportsEmpty(self.right)
    }
    case "Sequence": {
      return supportsEmpty(self.first) && supportsEmpty(self.second)
    }
    case "Table": {
      return false
    }
  }
}

/**
 * @tsplus fluent effect/parser/Regex/LookupFunction lookup
 */
export function lookup(self: LookupFunction, char: number): LookupFunction.Step {
  switch (self._tag) {
    case "Empty": {
      return LookupFunction.Step.LookupError
    }
    case "AcceptAll": {
      return LookupFunction.Step.Matched
    }
    case "And": {
      return lookup(self.left, char) & lookup(self.right, char)
    }
    case "Or": {
      return lookup(self.left, char) | lookup(self.right, char)
    }
    case "Sequence": {
      return lookup(self.first, char) >
        (self.second.supportsEmpty() ?
          LookupFunction.Step.MatchedOrJump(self.second) :
          LookupFunction.Step.Jump(self.second))
    }
    case "Table": {
      return char >= self.parseChar.length ? LookupFunction.Step.LookupError : self.parseChar.unsafeGet(char)
    }
  }
}

function combineWith(
  self: Table,
  that: Table,
  f: (a: LookupFunction.Step, b: LookupFunction.Step) => LookupFunction.Step
): Table {
  const { tuple: [self1, that1] } = equalize(self, that)
  return new Table(self1.parseChar.zip(that1.parseChar).map(({ tuple: [a, b] }) => f(a, b)))
}

function equalize(self: Table, that: Table): Tuple<[Table, Table]> {
  if (that.parseChar.length > self.parseChar.length) {
    const extension = Chunk.fill(that.parseChar.length - self.parseChar.length, () => LookupFunction.Step.LookupError)
    return Tuple(new Table(self.parseChar + extension), that)
  }
  if (self.parseChar.length > that.parseChar.length) {
    const extension = Chunk.fill(self.parseChar.length - that.parseChar.length, () => LookupFunction.Step.LookupError)
    return Tuple(self, new Table(that.parseChar + extension))
  }
  return Tuple(self, that)
}

// =============================================================================
// LookupFunction.Step
// =============================================================================

export const LookupFunctionStepSym = Symbol.for("@effect/parser/Regex/LookupFunction.Step")
export type LookupFunctionStepSym = typeof LookupFunctionStepSym

export type LookupFunctionStep = LookupError | Matched | MatchedOrJump | Jump

export class LookupError implements Hash, Equals {
  readonly _tag = "LookupError"

  readonly [LookupFunctionStepSym]: LookupFunctionStepSym = LookupFunctionStepSym;

  [Hash.sym](): number {
    return Hash.string("@effect/parser/Regex/LookupFunction.Step.LookupError")
  }

  [Equals.sym](that: unknown): boolean {
    return LookupFunction.Step.is(that) && that.isLookupError()
  }
}

export class Matched implements Hash, Equals {
  readonly _tag = "Matched"

  readonly [LookupFunctionStepSym]: LookupFunctionStepSym = LookupFunctionStepSym;

  [Hash.sym](): number {
    return Hash.string("@effect/parser/Regex/LookupFunction.Step.Matched")
  }

  [Equals.sym](that: unknown): boolean {
    return LookupFunction.Step.is(that) && that.isMatched()
  }
}

export class MatchedOrJump implements Hash, Equals {
  readonly _tag = "MatchedOrJump"

  readonly [LookupFunctionStepSym]: LookupFunctionStepSym = LookupFunctionStepSym

  constructor(readonly lookupFunction: LookupFunction) {}

  [Hash.sym](): number {
    return Hash.unknown(this.lookupFunction)
  }

  [Equals.sym](that: unknown): boolean {
    return LookupFunction.Step.is(that)
      && that.isMatchedOrJump()
      && this.lookupFunction == that.lookupFunction
  }
}

export class Jump implements Hash, Equals {
  readonly _tag = "Jump"

  readonly [LookupFunctionStepSym]: LookupFunctionStepSym = LookupFunctionStepSym

  constructor(readonly lookupFunction: LookupFunction) {}

  [Hash.sym](): number {
    return Hash.unknown(this.lookupFunction)
  }

  [Equals.sym](that: unknown): boolean {
    return LookupFunction.Step.is(that)
      && that.isJump()
      && this.lookupFunction == that.lookupFunction
  }
}

/**
 * @tsplus static effect/parser/Regex/LookupFunction.Step.Ops LookupError
 */
export const lookupError: LookupFunctionStep = new LookupError()

/**
 * @tsplus static effect/parser/Regex/LookupFunction.Step.Ops Matched
 */
export const matched: LookupFunctionStep = new Matched()

/**
 * @tsplus static effect/parser/Regex/LookupFunction.Step.Ops MatchedOrJump
 */
export function matchedOrJump(lookupFunction: LookupFunction): LookupFunctionStep {
  return new MatchedOrJump(lookupFunction)
}

/**
 * @tsplus static effect/parser/Regex/LookupFunction.Step.Ops Jump
 */
export function jump(lookupFunction: LookupFunction): LookupFunctionStep {
  return new Jump(lookupFunction)
}

/**
 * @tsplus static effect/parser/Regex/LookupFunction.Step.Ops is
 */
export function isLookupFunctionStep(u: unknown): u is LookupFunction.Step {
  return typeof u === "object" && u != null && LookupFunctionStepSym in u
}

/**
 * @tsplus fluent effect/parser/Regex/LookupFunction.Step isLookupError
 */
export function isLookupError(self: LookupFunctionStep): self is LookupError {
  return self._tag === "LookupError"
}

/**
 * @tsplus fluent effect/parser/Regex/LookupFunction.Step isMatched
 */
export function isMatched(self: LookupFunctionStep): self is Matched {
  return self._tag === "Matched"
}

/**
 * @tsplus fluent effect/parser/Regex/LookupFunction.Step isMatchedOrJump
 */
export function isMatchedOrJump(self: LookupFunctionStep): self is MatchedOrJump {
  return self._tag === "MatchedOrJump"
}

/**
 * @tsplus fluent effect/parser/Regex/LookupFunction.Step isJump
 */
export function isJump(self: LookupFunctionStep): self is Jump {
  return self._tag === "Jump"
}

/**
 * @tsplus operator effect/parser/Regex/LookupFunction.Step &
 * @tsplus fluent effect/parser/Regex/LookupFunction.Step and
 */
export function andStep(self: LookupFunction.Step, that: LookupFunction.Step): LookupFunction.Step {
  if (self.isMatched() && that.isMatched()) {
    return LookupFunction.Step.Matched
  }
  if (self.isJump() && that.isJump()) {
    return LookupFunction.Step.Jump(self.lookupFunction & that.lookupFunction)
  }
  return LookupFunction.Step.LookupError
}

/**
 * @tsplus operator effect/parser/Regex/LookupFunction.Step >
 * @tsplus fluent effect/parser/Regex/LookupFunction.Step sequence
 */
export function sequenceStep(self: LookupFunction.Step, that: LookupFunction.Step): LookupFunction.Step {
  if (self.isMatched()) {
    return that
  }
  if (that.isMatched()) {
    return self
  }
  if (self.isJump() && that.isJump()) {
    return LookupFunction.Step.Jump(self.lookupFunction > that.lookupFunction)
  }
  if (self.isMatchedOrJump() && that.isJump()) {
    return LookupFunction.Step.Jump((self.lookupFunction > that.lookupFunction) | that.lookupFunction)
  }
  return LookupFunction.Step.LookupError
}

/**
 * @tsplus operator effect/parser/Regex/LookupFunction.Step |
 * @tsplus fluent effect/parser/Regex/LookupFunction.Step or
 */
export function orStep(self: LookupFunction.Step, that: LookupFunction.Step): LookupFunction.Step {
  if (self.isMatched() && that.isJump()) {
    return LookupFunction.Step.MatchedOrJump(that.lookupFunction)
  }
  if (self.isJump() && that.isMatched()) {
    return LookupFunction.Step.MatchedOrJump(self.lookupFunction)
  }
  if (self.isMatched() || that.isMatched()) {
    return LookupFunction.Step.Matched
  }
  if (that.isLookupError()) {
    return self
  }
  if (self.isLookupError()) {
    return that
  }
  if (self.isJump() && that.isJump()) {
    return LookupFunction.Step.Jump(self.lookupFunction | that.lookupFunction)
  }
  if (self.isMatchedOrJump() && that.isJump()) {
    return LookupFunction.Step.MatchedOrJump(self.lookupFunction | that.lookupFunction)
  }
  if (self.isJump() && that.isMatchedOrJump()) {
    return LookupFunction.Step.MatchedOrJump(self.lookupFunction | that.lookupFunction)
  }
  if (self.isMatchedOrJump() && that.isMatchedOrJump()) {
    return LookupFunction.Step.MatchedOrJump(self.lookupFunction | that.lookupFunction)
  }
  return LookupFunction.Step.LookupError
}
