export interface Node extends Case {
  readonly name: string
  readonly child: Option<Node>
}

const Node = Case.of<Node>()

const openTag = (Syntax.letter | Syntax.digit)
  .repeat()
  .asString()
  .between(Syntax.char("<"), Syntax.char(">"))
  .named("open tag")

function closeTag(name: string) {
  return Syntax.string(`</${name}>`, undefined).named(`close tag (${name})`)
}

const nodeParser: Parser<string, string, Node> = Do(($) => {
  const name = $(openTag.asParser)
  const child = $(nodeParser.optional())
  $(closeTag(name).asParser)
  return Node({ name, child })
})

const nodePrinter: Printer<string, string, Node> = Printer.byValue((node) =>
  node.child.fold(
    openTag.asPrinter
      .provide(node.name)
      .zipRight(closeTag(node.name).asPrinter.provide(undefined)),
    (child) =>
      openTag.asPrinter
        .provide(node.name)
        .zipRight(nodePrinter.provide(child))
        .zipRight(closeTag(node.name).asPrinter.provide(undefined))
  )
)

export const node = Syntax(nodeParser, nodePrinter)

describe.concurrent("Contextual", () => {
  describe.concurrent("Separate Parser", () => {
    it("simple", () => {
      const result = nodeParser.parseString("<hello></hello>")

      assert.isTrue(result == Either.right(Node({ name: "hello", child: Option.none })))
    })

    it("nested", () => {
      const result = nodeParser.parseString("<hello><world></world></hello>")

      assert.isTrue(
        result == Either.right(Node({
          name: "hello",
          child: Option.some(Node({ name: "world", child: Option.none }))
        }))
      )
    })
  })

  describe.concurrent("Separate Printer", () => {
    it("nested", () => {
      const node = Node({ name: "hello", child: Option.some(Node({ name: "world", child: Option.none })) })

      const result = nodePrinter.printString(node)

      assert.isTrue(result == Either.right("<hello><world></world></hello>"))
    })
  })

  describe.concurrent("Fused", () => {
    it("parse simple", () => {
      const result = node.parseString("<hello></hello>")

      assert.isTrue(result == Either.right(Node({ name: "hello", child: Option.none })))
    })
  })
})
