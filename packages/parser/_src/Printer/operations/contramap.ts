/**
 * Maps the printer's input value with the specified function.
 *
 * @tsplus fluent effect/parser/Printer contramap
 */
export function contramap_<Error, Ouptut, Value, Value2>(
  self: Printer<Error, Ouptut, Value>,
  f: (value: Value2) => Value
): Printer<Error, Ouptut, Value2> {
  return self.contramapEither((value) => Either.right(f(value)))
}
