// const charA = Syntax.charWithFailure("a", "not a").as("a")
// const charB = Syntax.charWithFailure("b", "not b").as("b")

describe.concurrent("Parser", () => {
  describe.concurrent("Invertible Syntax", () => {
    it("succeed", () => {
      const syntax = Syntax.succeed("test")

      const result = syntax.parseString("hello world")

      assert.isTrue(result == Either.right("test"))
    })

    it("end, passing", () => {
      const syntax = Syntax.anyChar.repeat0().asString().zipLeft(Syntax.end)

      const result = syntax.parseString("hello")

      assert.isTrue(result == Either.right("hello"))
    })

    it("end, failing", () => {
      const syntax = Syntax.digit.repeat0().asString().zipLeft(Syntax.end)

      const result = syntax.parseString("123!!!")

      assert.isTrue(result == Either.left(ParserError.NotConsumedAll(Option.none)))
    })

    it("char, passing", () => {
      const syntax = Syntax.char("x")

      const result = syntax.parseString("x")

      assert.isTrue(result == Either.right(undefined))
    })

    it("char, failing", () => {
      const syntax = Syntax.char("y")

      const result = syntax.parseString("x")

      assert.isTrue(result == Either.left(ParserError.Failure(List.nil(), 0, "not 'y'")))
    })

    it("charIn, passing #1", () => {
      const syntax = Syntax.charIn("ABC")

      const result = syntax.parseString("AZXY")

      assert.isTrue(result == Either.right("A"))
    })

    it("charIn, passing #2", () => {
      const syntax = Syntax.charIn("ABC")

      const result = syntax.parseString("BZXY")

      assert.isTrue(result == Either.right("B"))
    })

    it("charIn, passing #3", () => {
      const syntax = Syntax.charIn("ABC")

      const result = syntax.parseString("CZXY")

      assert.isTrue(result == Either.right("C"))
    })

    it("charIn, passing #4", () => {
      const syntax = Syntax.charIn("ABC")

      const result = syntax.parseString("ABCZXY")

      assert.isTrue(result == Either.right("A"))
    })

    it("charIn, failing", () => {
      const syntax = Syntax.charIn("AB")

      const result = syntax.parseString("ZABAB")

      assert.isTrue(
        result == Either.left(
          ParserError.Failure(List.nil(), 0, "not one of the expected characters (A, B)")
        )
      )
    })

    it("anyChar", () => {
      const syntax = Syntax.anyChar

      const result = syntax.parseString("h")

      assert.isTrue(result == Either.right("h"))
    })

    it("filterred char, passing", () => {
      const syntax = Syntax.anyChar.filter((char) => char === "h", "not 'h'")

      const result = syntax.parseString("h")

      assert.isTrue(result == Either.right("h"))
    })

    it("filterred char, failing", () => {
      const syntax = Syntax.anyChar.filter((char) => char === "h", "not 'h'")

      const result = syntax.parseString("e")

      assert.isTrue(result == Either.left(ParserError.Failure(List.nil(), 1, "not 'h'")))
    })

    it("transform", () => {
      const syntax = Syntax.anyChar.transform(
        (s) => Number.parseInt(s),
        (n) => `${n}`
      )

      const result = syntax.parseString("1")

      assert.isTrue(result == Either.right(1))
    })

    it("string & string", () => {
      const syntax = Syntax.anyChar & Syntax.anyChar

      const result = syntax.parseString("he")

      assert.isTrue(result == Either.right(Tuple("h", "e")))
    })

    it("string & string, failing left", () => {
      const syntax = Syntax.anyChar.filter((char) => char === "a", "not 'a'")
        .zip(Syntax.anyChar)

      const result = syntax.parseString("he")

      assert.isTrue(result == Either.left(ParserError.Failure(List.nil(), 1, "not 'a'")))
    })

    it("string & string, failing right", () => {
      const syntax = Syntax.anyChar.zip(
        Syntax.anyChar.filter((char) => char === "a", "not 'a'")
      )

      const result = syntax.parseString("he")

      assert.isTrue(result == Either.left(ParserError.Failure(List.nil(), 2, "not 'a'")))
    })
  })
})
