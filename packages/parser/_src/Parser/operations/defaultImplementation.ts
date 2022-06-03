/**
 * The default parser implementation (i.e. `Recursive`).
 *
 * @tsplus static effect/parser/Parser defaultImplementation
 */
export const defaultImplementation: Parser.Implementation =
  // NOTE: here we can analyse the parser tree to select an implementation
  // (for example check if it has FlatMap)
  Parser.Implementation.Recursive
