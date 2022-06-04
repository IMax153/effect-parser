/**
 * Maps the printer's result with the specified function. A failure is indicated
 * by the presence of `None` in the error channel.
 *
 * @tsplus fluent effect/parser/Printer transformOption
 */
export function transformOption_<Error, Output, Value, Value2>(
  self: Printer<Error, Output, Value>,
  f: (value: Value2) => Option<Value>
): Printer<Option<Error>, Output, Value2> {
  return self.contramapEither((value) => Either.fromOption(f(value), Option.none))
}

/**
 * Maps the printer's input value with the specified function.
 *
 * @tsplus static effect/parser/Printer.Aspects transformOption
 */
export const transformOption = Pipeable(transformOption_)
