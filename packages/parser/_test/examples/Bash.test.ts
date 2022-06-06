import { BashArithmeticExpression } from "@effect/parser/test/examples/bash/BashArithmeticExpression"
import { BashArrayIndex } from "@effect/parser/test/examples/bash/BashArrayIndex"
import { BashCondition } from "@effect/parser/test/examples/bash/BashCondition"
import { BashDeclareOption } from "@effect/parser/test/examples/bash/BashDeclareOption"
import { BashExpression } from "@effect/parser/test/examples/bash/BashExpression"
import { BashIdentifier } from "@effect/parser/test/examples/bash/BashIdentifier"
import {
  printCondition,
  printExpression,
  printIdentifier,
  printStatement,
  printVariable
} from "@effect/parser/test/examples/bash/BashPrettyPrinter"
import { BashStatement } from "@effect/parser/test/examples/bash/BashStatement"
import { BashVariable } from "@effect/parser/test/examples/bash/BashVariable"

describe.concurrent("Bash", () => {
  describe.concurrent("Conditions", () => {
    it("eq", () => {
      function eq(comparator: string) {
        return BashCondition.StringEquals({
          a: BashCondition.Variable({
            variable: BashVariable.Variable({
              name: BashIdentifier({ name: "TEST" })
            })
          }),
          b: BashCondition.Literal({ value: comparator })
        })
      }

      const result1 = printCondition.printString(eq("something"))
      const expected1 = "${TEST} == something"
      const result2 = printCondition.printString(eq("something else"))
      const expected2 = "${TEST} == \"something else\""

      assert.isTrue(result1 == Either.right(expected1))
      assert.isTrue(result2 == Either.right(expected2))
    })

    it("not", () => {
      const bash = BashCondition.Not({
        a: BashCondition.RegularFileExists({
          a: BashCondition.Variable({
            variable: BashVariable.Variable({
              name: BashIdentifier({ name: "FILENAME" })
            })
          })
        })
      })

      const result = printCondition.printString(bash)
      const expected = "! -f ${FILENAME}"

      assert.isTrue(result == Either.right(expected))
    })

    it("TRUE literal", () => {
      const bash = BashCondition.Literal({ value: "TRUE" })

      const result = printCondition.printString(bash)

      assert.isTrue(result == Either.right("TRUE"))
    })

    it("empty string literal", () => {
      const bash = BashCondition.Literal({ value: "" })

      const result = printCondition.printString(bash)

      assert.isTrue(result == Either.right("\"\""))
    })
  })

  describe.concurrent("Variables", () => {
    it("variable", () => {
      const bash = BashVariable.Variable({
        name: BashIdentifier({ name: "TEST_VARIABLE" })
      })

      const result = printVariable.printString(bash)

      assert.isTrue(result == Either.right("TEST_VARIABLE"))
    })

    it("positional", () => {
      const bash = BashVariable.Positional({ index: 4 })

      const result = printVariable.printString(bash)

      assert.isTrue(result == Either.right("4"))
    })
  })

  describe.concurrent("Identifiers", () => {
    it("identifier", () => {
      const bash = BashIdentifier({ name: "TEST_VARIABLE" })

      const result = printIdentifier.printString(bash)

      assert.isTrue(result == Either.right("TEST_VARIABLE"))
    })
  })

  describe.concurrent("Expressions", () => {
    it("literal", () => {
      assert.isTrue(
        printExpression.printString(
          BashExpression.Literal({ literal: "something" })
        ) == Either.right("something")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Literal({ literal: "something with whitespace" })
        ) == Either.right("\"something with whitespace\"")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Literal({ literal: "&" })
        ) == Either.right("\"&\"")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Literal({ literal: "+" })
        ) == Either.right("\"+\"")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Literal({ literal: "?" })
        ) == Either.right("\"?\"")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Literal({ literal: "[" })
        ) == Either.right("\"[\"")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Literal({ literal: "]" })
        ) == Either.right("\"]\"")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Literal({ literal: "`" })
        ) == Either.right("\"\\`\"")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Literal({ literal: "~" })
        ) == Either.right("\"~\"")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Literal({ literal: "\"" })
        ) == Either.right("\"\\\"\"")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Literal({ literal: "\\" })
        ) == Either.right("\"\\\\\"")
      )
    })

    it("read variable", () => {
      assert.isTrue(
        printExpression.printString(
          BashExpression.ReadVariable({
            variable: BashVariable.Variable({
              name: BashIdentifier({ name: "XYZ" })
            })
          })
        ) == Either.right("${XYZ}")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.ReadVariable({
            variable: BashVariable.Variable({
              name: BashIdentifier({ name: "X" })
            })
          })
        ) == Either.right("$X")
      )
    })

    it("read whole array", () => {
      const bash = BashExpression.ReadArray({
        variable: BashVariable.Variable({
          name: BashIdentifier({ name: "LST" })
        }),
        index: BashArrayIndex.All({})
      })

      const result = printExpression.printString(bash)

      assert.isTrue(result == Either.right("${LST[*]}"))
    })

    it("read array element", () => {
      const bash = BashExpression.ReadArray({
        variable: BashVariable.Variable({
          name: BashIdentifier({ name: "LST" })
        }),
        index: BashArrayIndex.Index({
          index: BashExpression.ReadVariable({
            variable: BashVariable.Variable({
              name: BashIdentifier({ name: "IDX" })
            })
          })
        })
      })

      const result = printExpression.printString(bash)

      assert.isTrue(result == Either.right("${LST[${IDX}]}"))
    })

    it("eval", () => {
      assert.isTrue(
        printExpression.printString(
          BashExpression.Eval({
            statement: BashStatement.Command({
              name: BashExpression.Literal({ literal: "test" }),
              params: List.nil(),
              hereString: Option.none
            })
          })
        ) == Either.right("$(test)")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Eval({
            statement: BashStatement.Command({
              name: BashExpression.Literal({ literal: "test" }),
              params: List(
                BashExpression.Literal({ literal: "x" }),
                BashExpression.Literal({ literal: "something else" }),
                BashExpression.Literal({ literal: "y" })
              ),
              hereString: Option.none
            })
          })
        ) == Either.right("$(test x \"something else\" y)")
      )
    })

    it("conditional", () => {
      const bash = BashExpression.Conditional({
        condition: BashCondition.StringEquals({
          a: BashCondition.Variable({
            variable: BashVariable.Variable({
              name: BashIdentifier({ name: "TEST" })
            })
          }),
          b: BashCondition.Literal({ value: "something" })
        })
      })

      const result = printExpression.printString(bash)

      assert.isTrue(result == Either.right("[[ ${TEST} == something ]]"))
    })

    it("interpolated", () => {
      assert.isTrue(
        printExpression.printString(
          BashExpression.Interpolated({
            parts: List(
              BashExpression.Literal({ literal: "something" })
            )
          })
        ) == Either.right("\"something\"")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Interpolated({
            parts: List(
              BashExpression.Literal({ literal: "something with whitespace" })
            )
          })
        ) == Either.right("\"something with whitespace\"")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Interpolated({
            parts: List(
              BashExpression.Literal({ literal: "something " }),
              BashExpression.Literal({ literal: "with whitespace" })
            )
          })
        ) == Either.right("\"something with whitespace\"")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Interpolated({
            parts: List(
              BashExpression.ReadVariable({
                variable: BashVariable.Variable({
                  name: BashIdentifier({ name: "TEST" })
                })
              })
            )
          })
        ) == Either.right("\"${TEST}\"")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Interpolated({
            parts: List(
              BashExpression.Literal({ literal: "some" }),
              BashExpression.ReadVariable({
                variable: BashVariable.Variable({
                  name: BashIdentifier({ name: "TEST" })
                })
              })
            )
          })
        ) == Either.right("\"some${TEST}\"")
      )
      assert.isTrue(
        printExpression.printString(
          BashExpression.Interpolated({
            parts: List(
              BashExpression.Literal({ literal: "something which is a " }),
              BashExpression.ReadVariable({
                variable: BashVariable.Variable({
                  name: BashIdentifier({ name: "TEST" })
                })
              })
            )
          })
        ) == Either.right("\"something which is a ${TEST}\"")
      )
    })

    it("eval arithmetic", () => {
      const bash = BashExpression.EvalArithmetic({
        expression: BashArithmeticExpression.Div({
          x: BashArithmeticExpression.Add({
            x: BashArithmeticExpression.Variable({
              variable: BashVariable.Variable({
                name: BashIdentifier({ name: "X" })
              })
            }),
            y: BashArithmeticExpression.Number({ value: 1 })
          }),
          y: BashArithmeticExpression.Number({ value: 2 })
        })
      })

      const result = printExpression.printString(bash)

      assert.isTrue(result == Either.right("$(( ($X + 1) / 2 ))"))
    })
  })

  describe.concurrent("Statements", () => {
    it("assignment", () => {
      const bash = BashStatement.Assign({
        target: BashIdentifier({ name: "TEST" }),
        expression: BashExpression.True({})
      })

      const result = printStatement.printString(bash)

      assert.isTrue(result == Either.right("TEST=true"))
    })

    it("command", () => {
      assert.isTrue(
        printStatement.printString(
          BashStatement.Command({
            name: BashExpression.Literal({ literal: "echo" }),
            params: List(BashExpression.Literal({ literal: "hello world" })),
            hereString: Option.none
          })
        ) == Either.right("echo \"hello world\"")
      )
      assert.isTrue(
        printStatement.printString(
          BashStatement.Command({
            name: BashExpression.ReadVariable({
              variable: BashVariable.Variable({
                name: BashIdentifier({ name: "AWS" })
              })
            }),
            params: List(
              BashExpression.Literal({ literal: "describe-instance" }),
              BashExpression.Literal({ literal: "i-test" })
            ),
            hereString: Option.none
          })
        ) == Either.right("${AWS} describe-instance i-test")
      )
      assert.isTrue(
        printStatement.printString(
          BashStatement.Command({
            name: BashExpression.Literal({ literal: "bc" }),
            params: List(BashExpression.Literal({ literal: "-l" })),
            hereString: Option.some(BashExpression.Literal({ literal: "5+5" }))
          })
        ) == Either.right("bc -l <<< \"5+5\"")
      )
    })

    it("declare", () => {
      assert.isTrue(
        printStatement.printString(
          BashStatement.Declare({
            name: BashIdentifier({ name: "LST" }),
            options: HashSet<BashDeclareOption>(
              BashDeclareOption.Array({}),
              BashDeclareOption.ReadOnly({})
            ),
            initialValue: Option.none
          })
        ) == Either.right("declare -a -r LST")
      )
      assert.isTrue(
        printStatement.printString(
          BashStatement.Declare({
            name: BashIdentifier({ name: "LST" }),
            options: HashSet(BashDeclareOption.ReadOnly({})),
            initialValue: Option.some(
              BashExpression.ReadVariable({
                variable: BashVariable.Variable({
                  name: BashIdentifier({ name: "TMP" })
                })
              })
            )
          })
        ) == Either.right("declare -r LST=${TMP}")
      )
    })

    it("local", () => {
      assert.isTrue(
        printStatement.printString(
          BashStatement.Local({
            name: BashIdentifier({ name: "X" }),
            options: HashSet.empty(),
            initialValue: Option.some(
              BashExpression.ReadVariable({
                variable: BashVariable.Positional({ index: 5 })
              })
            )
          })
        ) == Either.right("local X=$5")
      )
      assert.isTrue(
        printStatement.printString(
          BashStatement.Local({
            name: BashIdentifier({ name: "OTHER" }),
            options: HashSet(BashDeclareOption.ReadOnly({})),
            initialValue: Option.some(BashExpression.Literal({ literal: "test" }))
          })
        ) == Either.right("local -r OTHER=test")
      )
    })

    it("let", () => {
      const bash = BashStatement.Let({
        expression: List(
          BashArithmeticExpression.AssignRem({
            x: BashVariable.Variable({
              name: BashIdentifier({ name: "TEST" })
            }),
            y: BashArithmeticExpression.Exponentiation({
              x: BashArithmeticExpression.Number({ value: 2 }),
              y: BashArithmeticExpression.Number({ value: 3 })
            })
          })
        )
      })

      const result = printStatement.printString(bash)

      assert.isTrue(result == Either.right("let \"TEST %= (2 ** 3)\""))
    })

    it("eval", () => {
      const bash = BashStatement.Eval({
        statement: BashStatement.Assign({
          target: BashIdentifier({ name: "testfn2__retvar" }),
          expression: BashExpression.ReadVariable({
            variable: BashVariable.Variable({
              name: BashIdentifier({ name: "testfn2__tmp2" })
            })
          })
        })
      })

      const result = printStatement.printString(bash)

      assert.isTrue(result == Either.right("eval testfn2__retvar=${testfn2__tmp2}"))
    })

    it("array update", () => {
      const bash = BashStatement.ArrayUpdate({
        target: BashIdentifier({ name: "TABLE" }),
        index: BashExpression.Literal({ literal: "3" }),
        value: BashExpression.Literal({ literal: "something" })
      })

      const result = printStatement.printString(bash)

      assert.isTrue(result == Either.right("TABLE[3]=something"))
    })

    it("sequence", () => {
      const bash = BashStatement.Sequence({
        statements: List(
          BashStatement.Command({
            name: BashExpression.Literal({ literal: "echo" }),
            params: List(BashExpression.Literal({ literal: "Hello world" })),
            hereString: Option.none
          }),
          BashStatement.Command({
            name: BashExpression.ReadVariable({
              variable: BashVariable.Variable({
                name: BashIdentifier({ name: "AWS" })
              })
            }),
            params: List(
              BashExpression.Literal({ literal: "describe-instance" }),
              BashExpression.Literal({ literal: "i-test" })
            ),
            hereString: Option.none
          }),
          BashStatement.Command({
            name: BashExpression.Literal({ literal: "bc" }),
            params: List(BashExpression.Literal({ literal: "-l" })),
            hereString: Option.some(
              BashExpression.Literal({ literal: "5+5" })
            )
          })
        )
      })

      const result = printStatement.printString(bash)
      const expected = `|echo "Hello world"
                        |\${AWS} describe-instance i-test
                        |bc -l <<< "5+5"`.stripMargin()

      assert.isTrue(
        result == Either.right(expected)
      )
    })
  })
})
