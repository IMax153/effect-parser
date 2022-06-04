export const PrinterErrorSym = Symbol.for("@effect/parser/Printer.Error")
export type PrinterErrorSym = typeof PrinterErrorSym

export const PrinterOutputSym = Symbol.for("@effect/parser/Printer.Output")
export type PrinterOutputSym = typeof PrinterOutputSym

export const PrinterValueSym = Symbol.for("@effect/parser/Printer.Value")
export type PrinterValueSym = typeof PrinterValueSym

/**
 * A `Printer` takes a value of type `Value` and either produces a stream of
 * `Output` elements and a result value of type `Value`, or fails with a custom
 * error of type `Error`.
 *
 * `Parser`s can be combined with `Printer`s to get `Syntax`, or a `Parser` and
 * a `Printer` can be built simultaneously by using the combinators of `Syntax`.
 *
 * @tsplus type effect/parser/Printer
 * @template Error - The custom error type.
 * @template Output - The type of elements produced to the output stream.
 * @template Value - The type of value that can be printed.
 */
export interface Printer<Error, Output, Value> {
  readonly [PrinterErrorSym]: () => Error
  readonly [PrinterOutputSym]: () => Output
  readonly [PrinterValueSym]: (value: Value) => void
}

/**
 * @tsplus type effect/parser/Printer.Ops
 */
export interface PrinterOps {
  readonly $: PrinterAspects
}
export const Printer: PrinterOps = {
  $: {}
}

/**
 * @tsplus type effect/parser/Printer.Aspects
 */
export interface PrinterAspects {}

/**
 * @tsplus unify effect/parser/Printer
 */
export function unifyPrinter<X extends Printer<any, any, any>>(
  self: X
): Printer<
  [X] extends [{ [PrinterErrorSym]: () => infer Error }] ? Error : never,
  [X] extends [{ [PrinterOutputSym]: () => infer Output }] ? Output : never,
  [X] extends [{ [PrinterOutputSym]: (value: infer Value) => void }] ? Value : never
> {
  return self
}

export abstract class BasePrinter<Error, Output, Value> implements Printer<Error, Output, Value> {
  readonly [PrinterErrorSym]!: () => Error
  readonly [PrinterOutputSym]!: () => Output
  readonly [PrinterValueSym]!: (value: Value) => void
}
