const charA = Syntax.charIn("a")
const charB = Syntax.charIn("b")

describe.concurrent("Printer", () => {
  describe.concurrent("Invertible Syntax", () => {
    it("anyChar", () => {
      const syntax = Syntax.anyChar

      const result = syntax.printString("x")

      assert(result == Either.right("x"))
    })

    it("filtered char, passing", () => {
      const syntax = Syntax.anyChar.filter((char) => char === "h", "not 'h'")

      const result = syntax.printString("h")

      assert.isTrue(result == Either.right("h"))
    })

    it("filtered char, failing", () => {
      const syntax = Syntax.anyChar.filter((char) => char === "h", "not 'h'")

      const result = syntax.printString("e")

      assert.isTrue(result == Either.left("not 'h'"))
    })

    it("transform", () => {
      const syntax = Syntax.anyChar.transform(
        (s) => Number.parseInt(s),
        (n) => `${n}`
      )

      const result = syntax.printString(1)

      assert.isTrue(result == Either.right("1"))
    })

    it("transformEither, failing", () => {
      const syntax = Syntax.anyChar.transformEither(
        () => Either.left("bad") as Either<string, number>,
        () => Either.left("bad")
      )

      const result = syntax.printString(100)

      assert.isTrue(result == Either.left("bad"))
    })

    it("string & string", () => {
      const syntax = Syntax.anyChar & Syntax.anyChar

      const result = syntax.printString(Tuple("x", "y"))

      assert.isTrue(result == Either.right("xy"))
    })

    it("string & string, failing left", () => {
      const syntax = Syntax
        .anyChar
        .filter((char) => char === "a", "not 'a'")
        .zip(Syntax.anyChar)

      const result = syntax.printString(Tuple("b", "c"))

      assert.isTrue(result == Either.left("not 'a'"))
    })

    it("string & string, failing right", () => {
      const syntax = Syntax
        .anyChar
        .zip(Syntax.anyChar.filter((char) => char === "a", "not 'a'"))

      const result = syntax.printString(Tuple("b", "c"))

      assert.isTrue(result == Either.left("not 'a'"))
    })

    it("string < string", () => {
      const syntax = Syntax.anyChar < Syntax.anyChar.asPrinted(undefined as void, "?")

      const result = syntax.printString("x")

      assert.isTrue(result == Either.right("x?"))
    })

    it("string > string", () => {
      const syntax = Syntax.anyChar.asPrinted(undefined as void, "?") > Syntax.anyChar

      const result = syntax.printString("x")

      assert.isTrue(result == Either.right("?x"))
    })

    it("string | string, left passing", () => {
      const syntax = charA | charB

      const result = syntax.printString("a")

      assert.isTrue(result == Either.right("a"))
    })

    it("string | string, right passing", () => {
      const syntax = charA | charB

      const result = syntax.printString("b")

      assert.isTrue(result == Either.right("b"))
    })

    it("string | string, failing", () => {
      const syntax = charA | charB

      const result = syntax.printString("c")

      assert.isTrue(result == Either.left("not one of the expected characters (b)"))
    })

    it("string | string, left failing inside", () => {
      const hello = Syntax.string("hello", "h")
      const world = Syntax.string("world", "w")
      const all = Syntax.string("all", "a")
      const a = hello.zip(world)
      const b = hello.zip(all)
      const syntax = a | b

      const result = syntax.printString(Tuple("h", "a"))

      assert.isTrue(result == Either.right("helloall"))
    })

    it("string.orElseEither(string), left passing", () => {
      const syntax = charA.orElseEither(charB)

      const result = syntax.printString(Either.left("a"))

      assert.isTrue(result == Either.right("a"))
    })

    it("string.orElseEither(string), right passing", () => {
      const syntax = charA.orElseEither(charB)

      const result = syntax.printString(Either.right("b"))

      assert.isTrue(result == Either.right("b"))
    })

    it("string.orElseEither(string), failing", () => {
      const syntax = charA.orElseEither(charB)

      const result = syntax.printString(Either.right("c"))

      assert.isTrue(result == Either.left("not one of the expected characters (b)"))
    })

    it("string.optional(), passing", () => {
      const syntax = charA.zip(charB).optional()

      const result = syntax.printString(Option.some(Tuple("a", "b")))

      assert.isTrue(result == Either.right("ab"))
    })

    it("string.optional(), not passing", () => {
      const syntax = charA.zip(charB).optional()

      const result = syntax.printString(Option.none)

      assert.isTrue(result == Either.right(""))
    })
  })

  describe.concurrent("repeat", () => {
    it("repeat empty", () => {
      const syntax = charA.repeat()

      const result = syntax.printString(Chunk.empty())

      assert.isTrue(result == Either.right(""))
    })

    it("repeat 1", () => {
      const syntax = charA.repeat()

      const result = syntax.printString(Chunk("a"))

      assert.isTrue(result == Either.right("a"))
    })

    it("repeat 3", () => {
      const syntax = charA.repeat()

      const result = syntax.printString(Chunk("a", "a", "a"))

      assert.isTrue(result == Either.right("aaa"))
    })
  })

  describe.concurrent("repeat0", () => {
    it("repeat0 empty", () => {
      const syntax = charA.repeat0()

      const result = syntax.printString(Chunk.empty())

      assert.isTrue(result == Either.right(""))
    })

    it("repeat0 1", () => {
      const syntax = charA.repeat0()

      const result = syntax.printString(Chunk("a"))

      assert.isTrue(result == Either.right("a"))
    })

    it("repeat0 3", () => {
      const syntax = charA.repeat0()

      const result = syntax.printString(Chunk("a", "a", "a"))

      assert.isTrue(result == Either.right("aaa"))
    })
  })

  describe.concurrent("repeatWithSep", () => {
    it("repeatWithSep", () => {
      const syntax = Syntax.anyChar.repeatWithSep(Syntax.char("-"))

      const result = syntax.printString(Chunk("a", "b", "c"))

      assert.isTrue(result == Either.right("a-b-c"))
    })
  })
})
