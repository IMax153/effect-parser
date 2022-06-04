import { Fail } from "@effect/parser/Printer/definition/primitives"

/**
 * Printer that does not print anything and fails with `failure`.
 *
 * @tsplus static effect/parser/Printer.Ops fail
 */
export function fail<Error>(failure: Error): Printer<Error, never, never> {
  return new Fail(failure)
}
