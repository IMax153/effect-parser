export const JsonSym = Symbol.for("@effect/test/tests/examples/Json")
export type JsonSym = typeof JsonSym

type Json = Obj | Arr | Bool | Str | Num | Null

interface Obj extends Case {
  readonly _tag: "Obj"
  readonly fields: Chunk<Tuple<[string, Json]>>
}
const Obj = Case.tagged<Obj>("Obj")

interface Arr extends Case {
  readonly _tag: "Arr"
  readonly elements: Chunk<Json>
}
const Arr = Case.tagged<Arr>("Arr")

interface Bool extends Case {
  readonly _tag: "Bool"
  readonly value: boolean
}
const Bool = Case.tagged<Bool>("Bool")

interface Str extends Case {
  readonly _tag: "Str"
  readonly value: string
}
const Str = Case.tagged<Str>("Str")

interface Num extends Case {
  readonly _tag: "Num"
  readonly value: bigint
}
const Num = Case.tagged<Num>("Num")

interface Null extends Case {
  readonly _tag: "Null"
}
const Null = Case.tagged<Null>("Null")

const whitespace = Syntax.charIn(" \t\r\n")
const whitespaces = whitespace.repeat0().asPrinted(undefined as void, Chunk.single(" "))

const quote = Syntax.char("\"")
const escapedChar = Syntax.charNotIn("\"")
const quotedString = escapedChar.repeat0().asString().surroundedBy(quote)

const _null = Syntax.string("null", Null({}))

const bool = Syntax
  .string("true", Bool({ value: true }))
  .orElse(Syntax.string("false", Bool({ value: false })))

const str = quotedString.transform(
  (value) => Str({ value }),
  (str) => str.value
)

const digits = Syntax.digit.repeat()
const signedIntStr = Syntax.char("-").optional().zip(digits)
const frac = Syntax.char(".").zipRight(digits)
const exp = Syntax.charIn("eE").zip(Syntax.charIn("+-")).zip(digits).transform(
  ({ tuple: [{ tuple: [a, b] }, c] }) => Tuple(a, b, c),
  ({ tuple: [a, b, c] }) => Tuple(Tuple(a, b), c)
)
const jsonNum = signedIntStr.zip(frac.optional()).zip(exp.optional()).asString()

const num = jsonNum.transform(
  (s) => Num({ value: BigInt(s) }),
  (num) => `${num.value}`
)

const listSep = Syntax.char(",").surroundedBy(whitespaces)
const list = Syntax.lazy(() => json.repeatWithSep(listSep))
  .between(Syntax.char("["), Syntax.char("]"))
  .transform(
    (elements) => Arr({ elements }),
    (arr) => arr.elements
  )

const keyValueSep = Syntax.char(":").surroundedBy(whitespaces)
const keyValue = str.zipLeft(keyValueSep).zip(() => json).transform(
  ({ tuple: [key, value] }) => Tuple(key.value, value),
  ({ tuple: [key, value] }) => Tuple(Str({ value: key }), value)
)
const obj = keyValue
  .repeatWithSep(listSep)
  .surroundedBy(whitespaces)
  .between(Syntax.char("{"), Syntax.char("}"))
  .transform(
    (fields) => Obj({ fields }),
    (obj) => obj.fields
  )

const json: Syntax<string, string, string, Json> = _null | bool | str | num | list | obj

describe.concurrent("Json Example", () => {
  it("null", () => {
    const result = json.parseString("null")

    assert.isTrue(result == Either.right(Null({})))
  })

  it("bool", () => {
    const result = json.parseString("true")

    assert.isTrue(result == Either.right(Bool({ value: true })))
  })

  it("num", () => {
    const result = json.parseString("123")

    assert.isTrue(result == Either.right(Num({ value: BigInt(123) })))
  })

  it("str", () => {
    const result = json.parseString("\"hello world\"")

    assert.isTrue(result == Either.right(Str({ value: "hello world" })))
  })

  it("arr", () => {
    const result = json.parseString("[1, null, 3]")

    assert.isTrue(
      result == Either.right(Arr({
        elements: Chunk(
          Num({ value: BigInt(1) }),
          Null({}),
          Num({ value: BigInt(3) })
        )
      }))
    )
  })

  it("obj", () => {
    const result = json.parseString(
      "{ \"x\": 0, \"hello\": \"world\", \"y\": true, \"z\": [1, 2, 3] }"
    )

    assert.isTrue(
      result == Either.right(Obj({
        fields: Chunk(
          Tuple("x", Num({ value: BigInt(0) })),
          Tuple("hello", Str({ value: "world" })),
          Tuple("y", Bool({ value: true })),
          Tuple(
            "z",
            Arr({
              elements: Chunk(
                Num({ value: BigInt(1) }),
                Num({ value: BigInt(2) }),
                Num({ value: BigInt(3) })
              )
            })
          )
        )
      }))
    )
  })
})
