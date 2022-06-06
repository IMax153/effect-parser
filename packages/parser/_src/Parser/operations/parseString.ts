import { ParserState } from "@effect/parser/Parser/_internal/ParserState"
import { instruction } from "@effect/parser/Parser/definition/instruction"

/**
 * Run this parser on the specified `input` string using a specific parser
 * implementation.
 *
 * @tsplus fluent effect/parser/Parser parseString
 */
export function parseString<Error, Result>(
  self: Parser<Error, string, Result>,
  input: string,
  parserImplementation: Parser.Implementation = Parser.Implementation.Recursive
): Either<ParserError<Error>, Result> {
  switch (parserImplementation._tag) {
    case "StackSafe": {
      return self.parseStackSafe(input)
    }
    case "Recursive": {
      const state = new ParserState(input)
      const result = instruction(self.optimized()).parseRecursive(state)
      if (state.error != null) {
        return Either.left(state.error as ParserError<Error>)
      }
      return Either.right(result)
    }
  }
}
