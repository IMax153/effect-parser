/**
 * @tsplus fluent effect/parser/ParserError map
 */
export function map_<Error, Error2>(self: ParserError<Error>, f: (error: Error) => Error2): ParserError<Error2> {
  switch (self._tag) {
    case "Failure": {
      return ParserError.Failure(self.nameStack, self.position, f(self.failure))
    }
    case "UnknownFailure": {
      return self
    }
    case "UnexpectedEndOfInput": {
      return self
    }
    case "NotConsumedAll": {
      return ParserError.NotConsumedAll(self.lastFailure.map((error) => error.map(f)))
    }
    case "AllBranchesFailed": {
      return ParserError.AllBranchesFailed(self.left.map(f), self.right.map(f))
    }
  }
}

/**
 * @tsplus static effect/parser/ParserError.Aspects map
 */
export const map = Pipeable(map_)
