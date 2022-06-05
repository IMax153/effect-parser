const charA = Syntax.char("a").as("a")
const charB = Syntax.char("b").as("b")

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

    it("anyChar.filter(isDigit)", () => {
      const syntax = Syntax.anyChar
        .filter((char) => /^\d$/.test(char), "not a digit")
        .repeat()
        .asString()

      const result = syntax.parseString("123abc")

      assert.isTrue(result == Either.right("123"))
    })

    it("string < string", () => {
      const syntax = Syntax.anyChar < Syntax.anyChar.asPrinted(undefined as void, "?")

      const result = syntax.parseString("he")

      assert.isTrue(result == Either.right("h"))
    })

    it("string > string", () => {
      const syntax = Syntax.anyChar.asPrinted(undefined as void, "?") > Syntax.anyChar

      const result = syntax.parseString("he")

      assert.isTrue(result == Either.right("e"))
    })

    it("string | string, left passing", () => {
      const syntax = charA | charB

      const result = syntax.parseString("a")

      assert.isTrue(result == Either.right("a"))
    })

    it("string | string, right passing", () => {
      const syntax = charA | charB

      const result = syntax.parseString("b")

      assert.isTrue(result == Either.right("b"))
    })

    it("captured string | string, right passing", () => {
      const syntax = Syntax.char("a") | Syntax.char("b").asString()

      const result = syntax.parseString("b")

      assert.isTrue(result == Either.right("b"))
    })

    it("string | string, failing", () => {
      const syntax = Syntax.char("a") | Syntax.char("b")

      const result = syntax.parseString("c")

      assert.isTrue(
        result == Either.left(
          ParserError.AllBranchesFailed(
            ParserError.Failure(List.nil(), 0, "not 'a'"),
            ParserError.Failure(List.nil(), 0, "not 'b'")
          )
        )
      )
    })

    it("string.orElseEither(string), right passing", () => {
      const syntax = charA.orElseEither(charB)

      const result = syntax.parseString("b")

      assert.isTrue(result == Either.right(Either.right("b")))
    })

    it("string.orElseEither(string), failing", () => {
      const syntax = charA.orElseEither(charB)

      const result = syntax.parseString("c")

      assert.isTrue(
        result == Either.left(
          ParserError.AllBranchesFailed(
            ParserError.Failure(List.nil(), 0, "not 'a'"),
            ParserError.Failure(List.nil(), 0, "not 'b'")
          )
        )
      )
    })

    it("string.optional(), passing", () => {
      const syntax = (charA & charB).optional()

      const result = syntax.parseString("ab")

      assert.isTrue(result == Either.right(Option.some(Tuple("a", "b"))))
    })

    it("string.optional(), not passing", () => {
      const syntax = (charA & charB).optional()

      const result = syntax.parseString("aa")

      assert.isTrue(result == Either.right(Option.none))
    })

    it("string.optional(), terminating early", () => {
      const syntax = (charA & charB).optional()

      const result = syntax.parseString("a")

      assert.isTrue(result == Either.right(Option.none))
    })

    it("string, passing", () => {
      const syntax = Syntax.string("test", 1)

      const result = syntax.parseString("test")

      assert.isTrue(result == Either.right(1))
    })

    it("string, not passing", () => {
      const syntax = Syntax.string("test", 1)

      const result = syntax.parseString("tess")

      assert.isTrue(
        result == Either.left(
          ParserError.Failure(List.nil(), 0, "not 'test'")
        )
      )
    })

    it("asString", () => {
      const syntax = (charA | charB)
        .repeatWithSep(Syntax.char(","))
        .asString()
        .zipLeft(Syntax.char("!"))

      const result = syntax.parseString("a,a,b,a,b,b!")

      assert.isTrue(result == Either.right("a,a,b,a,b,b"))
    })

    it("not, inner failing", () => {
      const syntax = Syntax.string("hello", undefined).not("it was hello")

      const result = syntax.parseString("world")

      assert.isTrue(result == Either.right(undefined))
    })

    it("not, inner passing", () => {
      const syntax = Syntax.string("hello", undefined).not("it was hello")

      const result = syntax.parseString("hello")

      assert.isTrue(
        result ==
          Either.left(ParserError.Failure(List.nil(), 5, "it was hello"))
      )
    })
  })

  describe.concurrent("repeat", () => {
    // TODO: discuss - with compiling to Regex it fails with `UnexpectedEndOfInput`
    it("repeat immediate mismatch", () => {
      const syntax = charA.repeat()

      const result = syntax.parseString("bc")

      assert.isTrue(result == Either.left(ParserError.UnexpectedEndOfInput))
    })

    it("repeat immediate end of stream", () => {
      const syntax = charA.repeat()

      const result = syntax.parseString("")

      assert.isTrue(result == Either.left(ParserError.UnexpectedEndOfInput))
    })

    it("repeat 1", () => {
      const syntax = charA.repeat()

      const result = syntax.parseString("abc")

      assert.isTrue(result == Either.right(Chunk("a")))
    })

    it("repeat 3", () => {
      const syntax = charA.repeat()

      const result = syntax.parseString("aaabc")

      assert.isTrue(result == Either.right(Chunk("a", "a", "a")))
    })

    it("repeat until end", () => {
      const syntax = charA.repeat()

      const result = syntax.parseString("aaa")

      assert.isTrue(result == Either.right(Chunk("a", "a", "a")))
    })
  })

  describe.concurrent("repeat0", () => {
    it("repeat0 immediate mismatch", () => {
      const syntax = charA.repeat0()

      const result = syntax.parseString("bc")

      assert.isTrue(result == Either.right(Chunk.empty()))
    })

    it("repeat0 immediate end of stream", () => {
      const syntax = charA.repeat0()

      const result = syntax.parseString("")

      assert.isTrue(result == Either.right(Chunk.empty()))
    })

    it("repeat0 1", () => {
      const syntax = charA.repeat0()

      const result = syntax.parseString("abc")

      assert.isTrue(result == Either.right(Chunk("a")))
    })

    it("repeat0 3", () => {
      const syntax = charA.repeat0()

      const result = syntax.parseString("aaabc")

      assert.isTrue(result == Either.right(Chunk("a", "a", "a")))
    })

    it("repeat0 until end", () => {
      const syntax = charA.repeat0()

      const result = syntax.parseString("aaa")

      assert.isTrue(result == Either.right(Chunk("a", "a", "a")))
    })
  })

  describe.concurrent("repeatWithSep", () => {
    it("repeatWithSep 3", () => {
      const syntax = Syntax.anyChar.repeatWithSep(Syntax.char("-"))

      const result = syntax.parseString("a-b-c")

      assert.isTrue(result == Either.right(Chunk("a", "b", "c")))
    })
  })

  describe.concurrent("repeatUntil", () => {
    it("repeatUntil 1", () => {
      const syntax = Syntax.anyChar.repeatUntil(Syntax.char("x") | Syntax.char("y"))

      const result = syntax.parseString("abcdy")

      assert.isTrue(result == Either.right(Chunk("a", "b", "c", "d")))
    })

    it("repeatUntil 2", () => {
      const syntax = Syntax.anyChar.repeatUntil(Syntax.string("!!!", undefined as void))

      const result = syntax.parseString("abc!!!")

      assert.isTrue(result == Either.right(Chunk("a", "b", "c")))
    })
  })

  describe.concurrent("atLeast", () => {
    it("atLeast 3, passing", () => {
      const syntax = charA.atLeast(3)

      const result = syntax.parseString("aaabc")

      assert.isTrue(result == Either.right(Chunk("a", "a", "a")))
    })

    it("atLeast 3, failing", () => {
      const syntax = charA.atLeast(3)

      const result = syntax.parseString("aabc")

      assert.isTrue(result == Either.left(ParserError.UnexpectedEndOfInput))
    })
  })

  describe.concurrent("optional", () => {
    it("optional on empty", () => {
      const syntax = Syntax.anyChar.optional()

      const result = syntax.parseString("")

      assert.isTrue(result == Either.right(Option.none))
    })

    it("optional on mismatch", () => {
      const syntax = charA.optional()

      const result = syntax.parseString("b")

      assert.isTrue(result == Either.right(Option.none))
    })

    it("optional consumes", () => {
      const syntax = Syntax.anyChar.optional()

      const result = syntax.parseString("a")

      assert.isTrue(result == Either.right(Option.some("a")))
    })

    it("optional backtracks with auto-backtrack", () => {
      const syntax = (
        (Syntax.anyChar & charA).optional() & Syntax.anyChar
      ).autoBacktracking()

      const result = syntax.parseString("xy")

      assert.isTrue(result == Either.right(Tuple(Option.none, "x")))
    })
  })

  describe.concurrent("named", () => {
    it("name passed in failure", () => {
      const syntax = Syntax.anyChar.filter((char) => char === "a", "not 'a'").named("A")

      const result = syntax.parseString("hello")

      assert.isTrue(result == Either.left(ParserError.Failure(List("A"), 1, "not 'a'")))
    })

    it("name scoped in sequence", () => {
      const syntax = Syntax
        .anyChar
        .named("A")
        .zip(Syntax.anyChar.filter((char) => char === "a", "not 'a'").named("B"))

      const result = syntax.parseString("hello")

      assert.isTrue(
        result == Either.left(
          ParserError.Failure(List("B"), 2, "not 'a'")
        )
      )
    })

    it("nested names", () => {
      const syntax = Syntax
        .anyChar
        .named("A")
        .zip(
          Syntax
            .anyChar
            .filter((char) => char === "a", "not 'a'")
            .named("B")
            .named("C")
        )
        .named("D")

      const result = syntax.parseString("hello")

      assert.isTrue(
        result == Either.left(
          ParserError.Failure(List("B", "C", "D"), 2, "not 'a'")
        )
      )
    })

    it("named | named", () => {
      const syntax = (charA.named("A") | charB.named("B")).named("C")

      const result = syntax.parseString("c")

      assert.isTrue(
        result == Either.left(
          ParserError.AllBranchesFailed(
            ParserError.Failure(List("A", "C"), 0, "not 'a'"),
            ParserError.Failure(List("B", "C"), 0, "not 'b'")
          )
        )
      )
    })

    it("named.orElseEither(named)", () => {
      const syntax = (charA.named("A").orElseEither(charB.named("B"))).named("C")

      const result = syntax.parseString("c")

      assert.isTrue(
        result == Either.left(
          ParserError.AllBranchesFailed(
            ParserError.Failure(List("A", "C"), 0, "not 'a'"),
            ParserError.Failure(List("B", "C"), 0, "not 'b'")
          )
        )
      )
    })

    it("string.optional() & string.optional() & string", () => {
      const syntax = charA
        .named("A")
        .optional()
        .zip(Syntax.anyChar.named("B").optional())
        .zip(Syntax.char("c").named("C"))

      const result = syntax.parseString("abd")

      assert.isTrue(result == Either.left(ParserError.Failure(List("C"), 2, "not 'c'")))
    })
  })

  describe.concurrent("manual backtracking", () => {
    it("auto backtrack can be turned off for orElseEither", () => {
      const syntax = (charA & charB).orElseEither(Syntax.anyChar).manualBacktracking()

      const result = syntax.parseString("ac")

      assert.isTrue(result == Either.left(ParserError.Failure(List.nil(), 1, "not 'b'")))
    })

    it("manual backtrack works with orElseEither", () => {
      const syntax = (charA & charB)
        .backtrack()
        .orElseEither(Syntax.anyChar)
        .manualBacktracking()

      const result = syntax.parseString("ac")

      assert.isTrue(result == Either.right(Either.right("a")))
    })

    it("auto backtrack can be turned off for orElse", () => {
      const syntax = charA
        .zipRight(charB)
        .orElse(Syntax.anyChar)
        .manualBacktracking()

      const result = syntax.parseString("ac")

      assert.isTrue(result == Either.left(ParserError.Failure(List.nil(), 1, "not 'b'")))
    })

    it("manual backtrack works with orElse", () => {
      const syntax = charA
        .zipRight(charB)
        .backtrack()
        .orElse(Syntax.anyChar)
        .manualBacktracking()

      const result = syntax.parseString("ac")

      assert.isTrue(result == Either.right("a"))
    })

    it("optional with manual backtrack", () => {
      const syntax = Syntax.anyChar
        .zip(charA)
        .backtrack()
        .optional()
        .zip(Syntax.anyChar)
        .manualBacktracking()

      const result = syntax.parseString("xy")

      assert.isTrue(result == Either.right(Tuple(Option.none, "x")))
    })

    it("optional with backtrack off", () => {
      const syntax = Syntax.anyChar
        .zip(charA)
        .optional()
        .zip(Syntax.anyChar)
        .manualBacktracking()

      const result = syntax.parseString("xy")

      assert.isTrue(result == Either.left(ParserError.Failure(List.nil(), 1, "not 'a'")))
    })
  })

  describe.concurrent("Regex Constructors", () => {
    it("digit, passing", () => {
      const syntax = Syntax.digit

      const result = syntax.parseString("1")

      assert.isTrue(result == Either.right("1"))
    })

    it("digits, passing #1", () => {
      const syntax = Syntax.digit.repeat().asString()

      const result = syntax.parseString("12345")

      assert.isTrue(result == Either.right("12345"))
    })

    it("digits, passing #2", () => {
      const syntax = Syntax.digit.repeat().asString()

      const result = syntax.parseString("123abc")

      assert.isTrue(result == Either.right("123"))
    })

    it("digits, failing", () => {
      const syntax = Syntax.digit.repeat().asString()

      const result = syntax.parseString("abc123")

      assert.isTrue(result == Either.left(ParserError.UnexpectedEndOfInput))
    })

    it("digits & letters", () => {
      const syntax = Syntax
        .digit
        .repeat()
        .asString()
        .zip(Syntax.letter.repeat().asString())

      const result = syntax.parseString("12345abcd")

      assert.isTrue(result == Either.right(Tuple("12345", "abcd")))
    })
  })
})
