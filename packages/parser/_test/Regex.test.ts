const keywordString = "abstract"
const keywordStrings: List<string> = List(
  "case",
  "catch",
  "class",
  "def",
  "do",
  "else",
  "extends",
  "false",
  "final",
  "finally",
  "for",
  "forSome",
  "if",
  "implicit",
  "import",
  "lazy",
  "match",
  "new",
  "null",
  "object",
  "override",
  "package",
  "private",
  "protected",
  "return",
  "sealed",
  "super",
  "this",
  "throw",
  "trait",
  "try",
  "true",
  "type",
  "val",
  "var",
  "while",
  "with",
  "yield"
)

export const keywordsChars: List.NonEmpty<ImmutableArray<string>> = List.cons(
  ImmutableArray(keywordString),
  List.from(keywordStrings.map((string) => ImmutableArray.from(string.split(""))))
)

export const keywordsRegex: Regex = keywordStrings.map(Regex.string).reduce(
  Regex.string(keywordString),
  (a, b) => a | b
)

const fooRegex: Regex.Compiled = Regex.string("foo").compile()

const aOrB: Regex.Compiled = (Regex.string("a") | Regex.string("b")).compile()

const fooOrBar: Regex.Compiled = (Regex.string("foo") | Regex.string("bar")).compile()

const keywords: Regex.Compiled = keywordsRegex.compile()

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

describe.concurrent("Regex", () => {
  describe("string", () => {
    it("positive matches", () => {
      assert.isTrue(fooRegex.matches("foo"))
    })

    it("negative matches", () => {
      assert.isFalse(fooRegex.matches("bar"))
    })

    it("single-letter positive or", () => {
      assert.isTrue(aOrB.matches("a"))
      assert.isTrue(aOrB.matches("b"))
    })

    it("word positive or", () => {
      assert.isTrue(fooOrBar.matches("foo"))
      assert.isTrue(fooOrBar.matches("bar"))
    })
  })

  describe("keywords", () => {
    it("matches all keywords", () => {
      assert.isTrue(keywordStrings.prepend(keywordString).forAll(keywords.matches))
    })
  })

  describe("digits", () => {
    it("matches all digits", () => {
      assert.isTrue(Regex.digits.compile().matches("123"))
    })

    it("matches the first few digits", () => {
      assert.isTrue(Regex.digits.compile().matches("123ABC"))
    })
  })

  describe("single-character constructors", () => {
    it("alphaNumeric", () => {
      const compiled = Regex.anyAlphaNumeric.compile()

      assert.isTrue(compiled.matches("a"))
      assert.isTrue(compiled.matches("1"))
      assert.isFalse(compiled.matches("_"))
    })

    it("digit", () => {
      const compiled = Regex.anyDigit.compile()

      assert.isTrue(compiled.matches("1"))
      assert.isFalse(compiled.matches("a"))
    })

    it("letter", () => {
      const compiled = Regex.anyLetter.compile()

      assert.isTrue(compiled.matches("a"))
      assert.isFalse(compiled.matches("1"))
    })

    it("whitespace", () => {
      const compiled = Regex.whitespace.compile()

      assert.isTrue(compiled.matches(" "))
      assert.isTrue(compiled.matches("\n"))
      // Matches 0 or more times
      assert.isTrue(compiled.matches("a"))
    })

    it("filter", () => {
      const compiled = Regex.filter((char) => char === "a" || char === "b").compile()

      assert.isTrue(compiled.matches("a"))
      assert.isTrue(compiled.matches("b"))
      assert.isFalse(compiled.matches("c"))
    })

    it("oneOf", () => {
      const compiled = Regex.charIn("ab").compile()

      assert.isTrue(compiled.matches("a"))
      assert.isTrue(compiled.matches("b"))
      assert.isFalse(compiled.matches("c"))
    })

    it("noneOf", () => {
      const compiled = Regex.charNotIn("ab").compile()

      assert.isFalse(compiled.matches("a"))
      assert.isFalse(compiled.matches("b"))
      assert.isTrue(compiled.matches("c"))
    })
  })

  describe("multi-character constructors", () => {
    it("alphaNumerics", () => {
      const compiled = Regex.alphaNumerics.compile()

      assert.isTrue(compiled.matches("abc123"))
      assert.isFalse(compiled.matches("!"))
    })

    it("digits", () => {
      const compiled = Regex.digits.compile()

      assert.isTrue(compiled.matches("123"))
      assert.isFalse(compiled.matches("a"))
    })

    it("letters", () => {
      const compiled = Regex.letters.compile()

      assert.isTrue(compiled.matches("abc"))
      assert.isFalse(compiled.matches("1"))
    })
  })

  describe("combinators", () => {
    it("followedBy (>)", () => {
      const foo = "foo"
      const bar = "bar"
      const compiled = (Regex.string(foo) > Regex.string(bar)).compile()

      assert.strictEqual(compiled.test(0, foo + bar), foo.length + bar.length)
    })

    it("and (&)", () => {
      const compiled = (Regex.charIn("abc") & Regex.charIn("b")).compile()

      assert.strictEqual(compiled.test(0, "a"), Regex.NotMatched)
      assert.strictEqual(compiled.test(0, "b"), 1)
    })

    it("or (|)", () => {
      const foo = "foo"
      const bar = "bar"
      const compiled = (Regex.string(foo) | Regex.string(bar)).compile()

      assert.strictEqual(compiled.test(0, foo), foo.length)
      assert.strictEqual(compiled.test(0, bar), bar.length)
    })

    it("atLeast", () => {
      const compiled = Regex.anyDigit.atLeast(2).compile()

      assert.strictEqual(compiled.test(0, "12"), 2)
      assert.strictEqual(compiled.test(0, "1"), Regex.NeedMoreInput)
    })

    it("atMost", () => {
      const times = getRandomInt(0, 20)
      const max = getRandomInt(0, 20)
      const str = "abc".repeat(times)
      const compiled = Regex.string("abc").atMost(max).compile()
      const expected = Math.min(times, max) * 3

      assert.strictEqual(compiled.test(0, str), expected)
    })

    it("between", () => {
      const a = getRandomInt(0, 20)
      const b = getRandomInt(0, 20)
      const len = getRandomInt(0, 20)
      const max = Math.max(a, b)
      const min = Math.min(a, b)
      const str = "x".repeat(len)
      const compiled = Regex.string("x").between(min, max).compile()
      const expected = len >= min ? Math.min(len, max) : Regex.NeedMoreInput

      assert.strictEqual(compiled.test(0, str), expected)
    })
  })

  describe("end of stream", () => {
    it("oneOf(a, b)", () => {
      assert.strictEqual(Regex.charIn("ab").compile().test(0, ""), Regex.NeedMoreInput)
    })

    it("oneOf(a)", () => {
      assert.strictEqual(Regex.charIn("a").compile().test(0, ""), Regex.NeedMoreInput)
    })

    it("anyChar.atLeast(0)", () => {
      assert.strictEqual(Regex.anyChar.atLeast(0).compile().test(0, ""), 0)
    })

    it("char(x).atLeast(0)", () => {
      assert.strictEqual(Regex.char("x").atLeast(0).compile().test(0, ""), 0)
    })
  })
})
