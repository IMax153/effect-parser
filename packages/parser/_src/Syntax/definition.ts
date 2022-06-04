export const SyntaxErrorSym = Symbol.for("@effect/parser/Syntax.Error")
export type SyntaxErrorSym = typeof SyntaxErrorSym

export const SyntaxInputSym = Symbol.for("@effect/parser/Syntax.Input")
export type SyntaxInputSym = typeof SyntaxInputSym

export const SyntaxOutputSym = Symbol.for("@effect/parser/Syntax.Output")
export type SyntaxOutputSym = typeof SyntaxOutputSym

export const SyntaxValueSym = Symbol.for("@effect/parser/Syntax.Value")
export type SyntaxValueSym = typeof SyntaxValueSym

/**
 * A `Syntax` defines a `Parser` and a `Printer` together and provides
 * combinators to simultaneously build them up from smaller syntax fragments.
 *
 * @tsplus type effect/parser/Syntax
 * @tsplus companion effect/parser/Syntax.Ops
 * @template Error - The custom error type.
 * @template Input - The type of elements contained in the input stream.
 * @template Output - The type of elements produced to the output stream.
 * @template Value - The type of the value to be parsed or printed.
 */
export class Syntax<Error, Input, Output, Value> {
  readonly [SyntaxErrorSym]!: () => Error
  readonly [SyntaxInputSym]!: (input: Input) => Input
  readonly [SyntaxOutputSym]!: () => Output
  readonly [SyntaxValueSym]!: () => Value
  constructor(
    readonly asParser: Parser<Error, Input, Value>,
    readonly asPrinter: Printer<Error, Output, Value>
  ) {}
}

/**
 * @tsplus type effect/parser/Syntax.Aspects
 */
export interface SyntaxAspects {}
/**
 * @tsplus static effect/parser/Syntax.Ops $
 */
export const $: SyntaxAspects = {}
