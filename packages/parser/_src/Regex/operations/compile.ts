import { compileToTabular } from "@effect/parser/Regex/operations/_internal/compileToTabular"

/**
 * @tsplus fluent effect/parser/Regex compile
 */
export function compile(self: Regex): Regex.Compiled {
  const test = compileInternal(self)
  return {
    test,
    matches: (value) => {
      return test(0, value) >= 0
    }
  }
}

function compileInternal(self: Regex) {
  return (index: number, chars: string): number => {
    return compileToTabular(self).map((compiled) => compiled.test(index, chars)).getOrElse(() => {
      switch (self._tag) {
        case "Succeed": {
          return index
        }
        case "OneOf": {
          if (index >= chars.length) {
            return Regex.NeedMoreInput
          }
          if (self.bitset.has(chars[index]!.charCodeAt(0))) {
            return index + 1
          }
          return Regex.NotMatched
        }
        case "Sequence": {
          const compiled = Chunk.from(sequence(self).map(compileInternal))
          let i = 0
          let idx = index
          while (i < compiled.length) {
            const current = compiled.unsafeGet(i)
            idx = current(idx, chars)
            if (idx < 0) {
              // Terminate the loop because the current parser did not match
              i = compiled.length
            } else {
              i = i + 1
            }
          }
          return idx
        }
        case "Repeat": {
          const min = self.min.getOrElse(0)
          const max = self.max.getOrElse(Number.MAX_SAFE_INTEGER)
          const compiled = compileInternal(self.regex)

          let idx = index
          let lastIdx = index
          let matched = 0
          while (idx >= 0 && idx < chars.length && matched < max) {
            idx = compiled(idx, chars)
            if (idx >= 0) {
              lastIdx = idx
              matched = matched + 1
            }
          }

          return matched < min ? Regex.NeedMoreInput : lastIdx
        }
        case "Or": {
          const left = compileInternal(self.left)
          const right = compileInternal(self.right)
          const result = left(index, chars)
          if (result === Regex.NotMatched || result === Regex.NeedMoreInput) {
            return right(index, chars)
          }
          return index
        }
        case "And": {
          const left = compileInternal(self.left)
          const right = compileInternal(self.right)
          const result = left(index, chars)
          if (result === Regex.NotMatched || result === Regex.NeedMoreInput) {
            return result
          }
          return right(index, chars)
        }
      }
    })
  }
}

function sequence(self: Regex): List<Regex> {
  return self._tag === "Sequence" ?
    sequence(self.first) + sequence(self.second) :
    List.cons(self, List.nil())
}
