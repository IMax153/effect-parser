export function toLiteralChars(self: Regex): Option<Chunk<string>> {
  switch (self._tag) {
    case "Succeed": {
      return Option.some(Chunk.empty())
    }
    case "OneOf": {
      return self.bitset.size === 1 ? Option.some(Chunk(String.fromCharCode(Array.from(self.bitset)[0]!))) : Option.none
    }
    case "Sequence": {
      return toLiteralChars(self.first).flatMap((first) => toLiteralChars(self.second).map((second) => first + second))
    }
    default: {
      return Option.none
    }
  }
}
