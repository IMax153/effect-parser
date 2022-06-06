type Expr = Const | Op

interface Const extends Case {
  readonly _tag: "Const"
  readonly value: number
}

const Const = Case.tagged<Const>("Const")

interface Op extends Case {
  readonly _tag: "Op"
  readonly operator: OpType
  readonly left: Expr
  readonly right: Expr
}

const Op = Case.tagged<Op>("Op")

type OpType = Add | Sub

interface Add extends Case {
  readonly _tag: "Add"
}

const Add = Case.tagged<Add>("Add")

interface Sub extends Case {
  readonly _tag: "Sub"
}

const Sub = Case.tagged<Sub>("Sub")

const IS_DIGIT_REGEX = /^\d$/

const constant = Syntax.anyChar
  .filter((char) => IS_DIGIT_REGEX.test(char), "not a digit")
  .repeat()
  .asString()
  .transformTo(
    (value) => Const({ value: Number.parseInt(value) }),
    (constant) => Option.some(`${constant.value}`),
    "not a constant"
  )
  .named("constant")

const add = Syntax.charIn("+").transformTo(
  () => Add({}),
  (op) => op._tag === "Add" ? Option.some("+") : Option.none,
  "not +"
)
const sub = Syntax.charIn("-").transformTo(
  () => Sub({}),
  (op) => op._tag === "Sub" ? Option.some("-") : Option.none,
  "not -"
)
const operator = (add | sub).named("operator")

const lparen = Syntax.char("(")
const rparen = Syntax.char(")")

const subExpr: Syntax<string, string, string, Expr> = (
  Syntax.lazy(() => expr) & operator & Syntax.lazy(() => expr)
)
  .transformTo(
    ({ tuple: [{ tuple: [left, operator] }, right] }) => Op({ left, operator, right }) as Expr,
    (expr) => expr._tag === "Op" ? Option.some(Tuple(Tuple(expr.left, expr.operator), expr.right)) : Option.none,
    "not a valid subexpression"
  )
  .named("sub-expression")
  .between(lparen, rparen)

const expr: Syntax<string, string, string, Expr> = (subExpr | constant).named("expression")

const exampleExprString = "((((123+456)-789)+(0+(1+2)))-3)"
const exampleExprAst: Expr = Op({
  operator: Sub({}),
  left: Op({
    operator: Add({}),
    left: Op({
      operator: Sub({}),
      left: Op({
        operator: Add({}),
        left: Const({ value: 123 }),
        right: Const({ value: 456 })
      }),
      right: Const({ value: 789 })
    }),
    right: Op({
      operator: Add({}),
      left: Const({ value: 0 }),
      right: Op({
        operator: Add({}),
        left: Const({ value: 1 }),
        right: Const({ value: 2 })
      })
    })
  }),
  right: Const({ value: 3 })
})

describe.concurrent("Expression", () => {
  it("parses an expression correctly", () => {
    const ast = expr.parseString(exampleExprString)

    assert.isTrue(ast == Either.right(exampleExprAst))
  })

  it("prints an expression correctly", () => {
    const printed = expr.printString(exampleExprAst)

    assert.isTrue(printed == Either.right(exampleExprString))
  })
})
