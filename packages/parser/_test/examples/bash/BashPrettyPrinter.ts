import type { BashArithmeticExpression } from "@effect/parser/test/examples/bash/BashArithmeticExpression"
import type { BashArrayIndex } from "@effect/parser/test/examples/bash/BashArrayIndex"
import type { BashCondition } from "@effect/parser/test/examples/bash/BashCondition"
import type { BashDeclareOption } from "@effect/parser/test/examples/bash/BashDeclareOption"
import { BashExpression } from "@effect/parser/test/examples/bash/BashExpression"
import type { BashIdentifier } from "@effect/parser/test/examples/bash/BashIdentifier"
import type { BashOption } from "@effect/parser/test/examples/bash/BashOptions"
import type { BashStatement } from "@effect/parser/test/examples/bash/BashStatement"
import { BashStringRequirements } from "@effect/parser/test/examples/bash/BashStringRequirements"
import type { BashVariable } from "@effect/parser/test/examples/bash/BashVariable"
import { Tuple } from "@tsplus/stdlib/data/Tuple"
import * as os from "node:os"

/**
 * @tsplus type effect/parser/test/BashPrettyPrinter
 */
export type BashPrettyPrinter<A> = Printer<never, string, A>

/**
 * @tsplus type effect/parser/test/BashPrettyPrinter.Ops
 */
export interface BashPrettyPrinterOps {}
export const BashPrettyPrinter: BashPrettyPrinterOps = {}

const IS_WHITESPACE_REGEX = /^\s$/
const IS_CONTROL_CHARACTER_REGEX = /^\\[bfnrtv0'"\\]$/

const charsNeedsQuoting = Chunk("?", "+", "&", "[", "]", "~")
const charsNeedsEscape = Chunk("\\", "\"", "$", "`")

const indentation = Printer.unit // TODO

const newline = Printer.emitString(os.EOL) > indentation

const space = Printer.emitString(" ")
const dollar = Printer.emitString("$")

function indented<A>(inner: BashPrettyPrinter<A>): BashPrettyPrinter<A> {
  // TODO
  return inner
}

function between<A>(
  prefix: string,
  suffix: string,
  printer: BashPrettyPrinter<A>
): BashPrettyPrinter<A> {
  return Printer.emitString(prefix) > printer < Printer.emitString(suffix)
}

function doubleQuoted<A>(printer: BashPrettyPrinter<A>): BashPrettyPrinter<A> {
  return between("\"", "\"", printer)
}

function dollarQuoted<A>(printer: BashPrettyPrinter<A>): BashPrettyPrinter<A> {
  return between("$'", "'", printer)
}

function curlyBracketed<A>(printer: BashPrettyPrinter<A>): BashPrettyPrinter<A> {
  return between("{", "}", printer)
}

function squareBracketed<A>(printer: BashPrettyPrinter<A>): BashPrettyPrinter<A> {
  return between("[", "]", printer)
}

export const printIdentifier: BashPrettyPrinter<BashIdentifier> = Printer.byValue(
  (id) => Printer.emitString(id.name)
)

export const printVariable: BashPrettyPrinter<BashVariable> = Printer.byValue(
  (variable) => {
    switch (variable._tag) {
      case "Variable": {
        return printIdentifier.provide(variable.name)
      }
      case "Positional": {
        return Printer.emitString(`${variable.index}`)
      }
    }
  }
)

function renderInterpolatedParts(
  parts: List<BashExpression>
): List<Tuple<[BashStringRequirements, BashPrettyPrinter<unknown>]>> {
  return parts.flatMap((expression) => {
    switch (expression._tag) {
      case "Literal": {
        const { tuple: [req, printer] } = prettyPrintBashString(expression.literal)
        // Require at least simple quotes in interpolated strings
        return List(Tuple(req.needsQuotes(), printer))
      }
      case "ReadVariable": {
        return List(
          Tuple(
            BashStringRequirements.NeedQuotes,
            dollar.zipRight(curlyBracketed(printVariable.provide(expression.variable)))
          )
        )
      }
      case "Interpolated": {
        return renderInterpolatedParts(expression.parts)
      }
      default: {
        // TODO
        return List(
          Tuple(
            BashStringRequirements.NeedQuotes,
            Printer.emitString(String(expression))
          )
        )
      }
    }
  })
}

function normalizePartsWithQuoteRequirements(
  parts: List<Tuple<[BashStringRequirements, BashPrettyPrinter<unknown>]>>
): List<Tuple<[BashStringRequirements, BashPrettyPrinter<unknown>]>> {
  if (parts.isNil()) {
    return parts
  }
  const { tuple: [req, printer] } = parts.head
  let tail = parts.tail
  const buffer = ListBuffer.empty<Tuple<[BashStringRequirements, BashPrettyPrinter<unknown>]>>()
  while (!tail.isNil() && tail.head.get(0) === req) {
    buffer.append(tail.head)
    tail = tail.tail
  }
  const partsToMerge = buffer.toList().map(({ tuple: [_, p] }) => p).prepend(printer)
  const mergedParts = partsToMerge.reduce(Printer.unit, (a, b) => a.zipRight(b))
  return normalizePartsWithQuoteRequirements(tail).prepend(Tuple(req, mergedParts))
}

function prettyPrintBashString(
  string: string
): Tuple<[BashStringRequirements, BashPrettyPrinter<unknown>]> {
  if (string.length === 0) {
    return Tuple(BashStringRequirements.NeedQuotes, Printer.unit)
  }
  return Chunk.from(string.split("")).reduce(
    Tuple(BashStringRequirements.NoRequirements, Printer.unit),
    ({ tuple: [reqs, printer] }, char) => {
      if (IS_WHITESPACE_REGEX.test(char)) {
        return Tuple(reqs.needsQuotes(), printer.zipRight(Printer.emitString(char)))
      }
      if (charsNeedsQuoting.elem(Equivalence.string, char)) {
        return Tuple(reqs.needsQuotes(), printer.zipRight(Printer.emitString(char)))
      }
      if (charsNeedsEscape.elem(Equivalence.string, char)) {
        return Tuple(
          reqs.needsQuotes(),
          printer.zipRight(Printer.emitString("\\")).zipRight(Printer.emitString(char))
        )
      }
      if (IS_CONTROL_CHARACTER_REGEX.test(char)) {
        Tuple(
          reqs.needsDollarQuotes(),
          printer
            .zipRight(Printer.emitString("\\0"))
            .zipRight(Printer.emitString(char.charCodeAt(0).toString(8)))
        )
      }
      return Tuple(reqs, printer.zipRight(Printer.emitString(char)))
    }
  )
}

function renderStringPart<A>(
  requirements: BashStringRequirements,
  printer: BashPrettyPrinter<A>
): BashPrettyPrinter<A> {
  switch (requirements._tag) {
    case "NoRequirements": {
      return printer
    }
    case "NeedQuotes": {
      return doubleQuoted(printer)
    }
    case "NeedDollarQuotes": {
      return dollarQuoted(printer)
    }
  }
}

const printArrayIndex: BashPrettyPrinter<BashArrayIndex> = Printer.byValue((index) => {
  switch (index._tag) {
    case "Index": {
      return printExpression.provide(index.index)
    }
    case "All": {
      return Printer.emitString("*")
    }
  }
})

const printDeclareOption: BashPrettyPrinter<BashDeclareOption> = Printer.byValue((option) => {
  switch (option._tag) {
    case "Array": {
      return Printer.emitString("-a")
    }
    case "ReadOnly": {
      return Printer.emitString("-r")
    }
  }
})

export const printStatement: BashPrettyPrinter<BashStatement> = Printer.byValue((statement) => {
  switch (statement._tag) {
    case "Noop": {
      return Printer.unit
    }
    case "Assign": {
      return printIdentifier
        .provide(statement.target)
        .zipRight(Printer.emitString("="))
        .zipRight(printExpression.provide(statement.expression))
    }
    case "Command": {
      return statement.hereString.isNone() ?
        printExpression
          .repeatWithSep(Printer.emitString(" "))
          .provide(Chunk.from(statement.params.prepend(statement.name))) :
        printExpression
          .repeatWithSep(Printer.emitString(" "))
          .provide(
            Chunk.from(
              statement.params.prepend(statement.name).concat(
                List(
                  BashExpression.Literal({ literal: "<<<" }),
                  statement.hereString.value
                )
              )
            )
          )
    }
    case "IfThenElse": {
      return Printer.emitString("if")
        .zipRight(space)
        .zipRight(printExpression.provide(statement.conditional))
        .zipRight(newline)
        .zipRight(Printer.emitString("then"))
        .zipRight(indented(
          newline.zipRight(printStatement.provide(statement.onTrue))
            .zipRight(newline)
            .zipRight(Printer.emitString("else"))
            .zipRight(indented(
              newline.zipRight(printStatement.provide(statement.onFalse))
                .zipRight(newline)
                .zipRight(Printer.emitString("fi"))
            ))
        ))
    }
    case "Declare": {
      const declare = Printer.emitString("declare")
      const opts = statement.options.size === 0 ?
        Printer.unit :
        space.zipRight(
          printDeclareOption
            .repeatWithSep(Printer.emitString(" "))
            .provide(Chunk.from(List.from(statement.options).reverse()))
        )
      const prefix = declare
        .zipRight(opts)
        .zipRight(space)
        .zipRight(Printer.emitString(statement.name.name))
      return statement.initialValue.fold(
        prefix,
        (value) =>
          prefix
            .zipRight(Printer.emitString("="))
            .zipRight(printExpression.provide(value))
      )
    }
    case "Local": {
      const local = Printer.emitString("local")
      const opts = statement.options.size === 0 ?
        Printer.unit :
        space.zipRight(
          printDeclareOption
            .repeatWithSep(Printer.emitString(" "))
            .provide(Chunk.from(statement.options))
        )
      const prefix = local
        .zipRight(opts)
        .zipRight(space)
        .zipRight(Printer.emitString(statement.name.name))
      return statement.initialValue.fold(
        prefix,
        (value) =>
          prefix
            .zipRight(Printer.emitString("="))
            .zipRight(printExpression.provide(value))
      )
    }
    case "Let": {
      const quotedExpr: BashPrettyPrinter<BashArithmeticExpression> = Printer.byValue(
        (e) =>
          Printer.emitString("\"")
            .zipRight(printArithmeticExpression.provide(e))
            .zipLeft(Printer.emitString("\""))
      )
      const printExprs = quotedExpr.repeatWithSep(Printer.emitString(" "))
      return Printer.emitString("let")
        .zipRight(space)
        .zipRight(printExprs.provide(Chunk.from(statement.expression)))
    }
    case "Function": {
      return Printer.emitString("function")
        .zipRight(space)
        .zipRight(printIdentifier.provide(statement.name))
        .zipRight(space)
        .zipRight(Printer.emitString("{"))
        .zipRight(indented(newline.zipRight(printStatement.provide(statement.body))))
        .zipRight(newline)
        .zipRight(Printer.emitString("}"))
    }
    case "Eval": {
      return Printer.emitString("eval")
        .zipRight(space)
        .zipRight(printStatement.provide(statement.statement))
    }
    case "ArrayUpdate": {
      return printIdentifier.provide(statement.target)
        .zipRight(squareBracketed(printExpression.provide(statement.index)))
        .zipRight(Printer.emitString("="))
        .zipRight(printExpression.provide(statement.value))
    }
    case "While": {
      return Printer.emitString("while")
        .zipRight(space)
        .zipRight(printExpression.provide(statement.conditional))
        .zipRight(newline)
        .zipRight(Printer.emitString("do"))
        .zipRight(indented(newline.zipRight(printStatement.provide(statement.body))))
        .zipRight(newline)
        .zipRight(Printer.emitString("done"))
    }
    case "Sequence": {
      return printStatement
        .repeatWithSep(newline)
        .provide(Chunk.from(statement.statements))
    }
  }
})

const printOption: BashPrettyPrinter<BashOption> = Printer.byValue((option) => {
  switch (option._tag) {
    case "AllExport": {
      return Printer.emitString("allexport")
    }
    case "BraceExpand": {
      return Printer.emitString("braceexpand")
    }
    case "Emacs": {
      return Printer.emitString("emacs")
    }
    case "ErrExit": {
      return Printer.emitString("errexit")
    }
    case "ErrTrace": {
      return Printer.emitString("errtrace")
    }
    case "FuncTrace": {
      return Printer.emitString("functrace")
    }
    case "HashAll": {
      return Printer.emitString("hashall")
    }
    case "HistExpand": {
      return Printer.emitString("histexpand")
    }
    case "History": {
      return Printer.emitString("history")
    }
    case "IgnoreEof": {
      return Printer.emitString("ignoreeof")
    }
    case "Keyword": {
      return Printer.emitString("keyword")
    }
    case "Monitor": {
      return Printer.emitString("monitor")
    }
    case "NoClobber": {
      return Printer.emitString("noclobber")
    }
    case "NoExec": {
      return Printer.emitString("noexec")
    }
    case "NoGlob": {
      return Printer.emitString("noglob")
    }
    case "NoLog": {
      return Printer.emitString("nolog")
    }
    case "Notify": {
      return Printer.emitString("notify")
    }
    case "NoUnset": {
      return Printer.emitString("nounset")
    }
    case "OneCmd": {
      return Printer.emitString("onecmd")
    }
    case "Physical": {
      return Printer.emitString("physical")
    }
    case "PipeFail": {
      return Printer.emitString("pipefail")
    }
    case "Posix": {
      return Printer.emitString("posix")
    }
    case "Privileged": {
      return Printer.emitString("privileged")
    }
    case "Verbose": {
      return Printer.emitString("verbose")
    }
    case "Vi": {
      return Printer.emitString("vi")
    }
    case "Xtrace": {
      return Printer.emitString("xtrace")
    }
  }
})

function binaryCondition(
  x: BashCondition,
  y: BashCondition,
  op: string
): BashPrettyPrinter<unknown> {
  return printCondition.provide(x)
    .zipRight(space)
    .zipRight(Printer.emitString(op))
    .zipRight(space)
    .zipRight(printCondition.provide(y))
}

function unaryCondition(
  x: BashCondition,
  op: string
): BashPrettyPrinter<unknown> {
  return Printer.emitString(op)
    .zipRight(space)
    .zipRight(printCondition.provide(x))
}

export const printCondition: BashPrettyPrinter<BashCondition> = Printer.byValue((cond) => {
  switch (cond._tag) {
    case "Literal": {
      return printExpression.provide(
        BashExpression.Literal({ literal: cond.value })
      )
    }
    case "Variable": {
      return printExpression.provide(
        BashExpression.ReadVariable({ variable: cond.variable })
      )
    }
    case "StringEquals": {
      return binaryCondition(cond.a, cond.b, "==")
    }
    case "StringNotEquals": {
      return binaryCondition(cond.a, cond.b, "!=")
    }
    case "LexicographicLess": {
      return binaryCondition(cond.a, cond.b, "<")
    }
    case "LexicographicGreater": {
      return binaryCondition(cond.a, cond.b, ">")
    }
    case "Equals": {
      return binaryCondition(cond.a, cond.b, "-eq")
    }
    case "NotEquals": {
      return binaryCondition(cond.a, cond.b, "-ne")
    }
    case "Greater": {
      return binaryCondition(cond.a, cond.b, "-gt")
    }
    case "GreaterEq": {
      return binaryCondition(cond.a, cond.b, "-ge")
    }
    case "Less": {
      return binaryCondition(cond.a, cond.b, "-lt")
    }
    case "LessEq": {
      return binaryCondition(cond.a, cond.b, "-le")
    }
    case "Not": {
      return unaryCondition(cond.a, "!")
    }
    case "And": {
      return binaryCondition(cond.a, cond.b, "&&")
    }
    case "Or": {
      return binaryCondition(cond.a, cond.b, "||")
    }
    case "FileExists": {
      return unaryCondition(cond.a, "-a")
    }
    case "BlockFileExists": {
      return unaryCondition(cond.a, "-b")
    }
    case "CharacterFileExists": {
      return unaryCondition(cond.a, "-c")
    }
    case "DirectoryExists": {
      return unaryCondition(cond.a, "-d")
    }
    case "RegularFileExists": {
      return unaryCondition(cond.a, "-f")
    }
    case "FileExistsWithSetGroupId": {
      return unaryCondition(cond.a, "-g")
    }
    case "SymbolicLinkExists": {
      return unaryCondition(cond.a, "-h")
    }
    case "FileExistsWithStickyBit": {
      return unaryCondition(cond.a, "-k")
    }
    case "NamedPipeExists": {
      return unaryCondition(cond.a, "-p")
    }
    case "ReadableFileExists": {
      return unaryCondition(cond.a, "-r")
    }
    case "NonEmptyFileExists": {
      return unaryCondition(cond.a, "-s")
    }
    case "IsOpenTerminalFileDescriptor": {
      return unaryCondition(cond.a, "-t")
    }
    case "FileExistsWithSetUserId": {
      return unaryCondition(cond.a, "-u")
    }
    case "WriteableFileExists": {
      return unaryCondition(cond.a, "-w")
    }
    case "ExecutableFileExists": {
      return unaryCondition(cond.a, "-x")
    }
    case "FileExistsOwnedByEffectiveGroupId": {
      return unaryCondition(cond.a, "-G")
    }
    case "FileExistsModifiedSinceRead": {
      return unaryCondition(cond.a, "-N")
    }
    case "SocketExists": {
      return unaryCondition(cond.a, "-S")
    }
    case "SameDeviceAndInode": {
      return binaryCondition(cond.a, cond.b, "-ef")
    }
    case "NewerThan": {
      return binaryCondition(cond.a, cond.b, "-nt")
    }
    case "OlderThan": {
      return binaryCondition(cond.a, cond.b, "-ot")
    }
    case "OptionEnabled": {
      return Printer.emitString("-o")
        .zipRight(space)
        .zipRight(printOption.provide(cond.option))
    }
    case "VariableSet": {
      return Printer.emitString("-v")
        .zipRight(space)
        .zipRight(printVariable.provide(cond.variable))
    }
    case "NameReferenceSet": {
      return Printer.emitString("-R")
        .zipRight(space)
        .zipRight(printVariable.provide(cond.variable))
    }
    case "ZeroLengthString": {
      return unaryCondition(cond.a, "-z")
    }
    case "NonZeroLengthString": {
      return unaryCondition(cond.a, "-n")
    }
  }
})

function needParentheses(expression: BashArithmeticExpression): boolean {
  switch (expression._tag) {
    case "Number":
    case "Variable": {
      return false
    }
    default: {
      return true
    }
  }
}

function parenthesized(expression: BashArithmeticExpression): BashPrettyPrinter<unknown> {
  return needParentheses(expression) ?
    between("(", ")", printArithmeticExpression.provide(expression)) :
    printArithmeticExpression.provide(expression)
}

function binary(
  x: BashArithmeticExpression,
  y: BashArithmeticExpression,
  op: string
): BashPrettyPrinter<unknown> {
  return parenthesized(x)
    .zipRight(space)
    .zipRight(Printer.emitString(op))
    .zipRight(space)
    .zipRight(parenthesized(y))
}

function assignment(
  x: BashVariable,
  y: BashArithmeticExpression,
  op: string
): BashPrettyPrinter<unknown> {
  return printVariable.provide(x)
    .zipRight(space)
    .zipRight(Printer.emitString(op))
    .zipRight(space)
    .zipRight(parenthesized(y))
}

export const printArithmeticExpression: BashPrettyPrinter<BashArithmeticExpression> = Printer.byValue((expr) => {
  switch (expr._tag) {
    case "Number": {
      return Printer.emitString(`${expr.value}`)
    }
    case "Variable": {
      return printExpression.provide(
        BashExpression.ReadVariable({ variable: expr.variable })
      )
    }
    case "PostIncrement": {
      return parenthesized(expr.x).zipRight(Printer.emitString("++"))
    }
    case "PostDecrement": {
      return parenthesized(expr.x).zipRight(Printer.emitString("--"))
    }
    case "PreIncrement": {
      return Printer.emitString("++").zipRight(parenthesized(expr.x))
    }
    case "PreDecrement": {
      return Printer.emitString("--").zipRight(parenthesized(expr.x))
    }
    case "Minus": {
      return Printer.emitString("-").zipRight(parenthesized(expr.x))
    }
    case "Plus": {
      return Printer.emitString("+").zipRight(parenthesized(expr.x))
    }
    case "LogicalNot": {
      return Printer.emitString("!").zipRight(parenthesized(expr.x))
    }
    case "BitwiseNot": {
      return Printer.emitString("~").zipRight(parenthesized(expr.x))
    }
    case "Exponentiation": {
      return binary(expr.x, expr.y, "**")
    }
    case "Add": {
      return binary(expr.x, expr.y, "+")
    }
    case "Sub": {
      return binary(expr.x, expr.y, "-")
    }
    case "Mul": {
      return binary(expr.x, expr.y, "*")
    }
    case "Div": {
      return binary(expr.x, expr.y, "/")
    }
    case "Rem": {
      return binary(expr.x, expr.y, "%")
    }
    case "BitwiseLeftShift": {
      return binary(expr.x, expr.y, "<<")
    }
    case "BitwiseRightShift": {
      return binary(expr.x, expr.y, ">>")
    }
    case "LessEq": {
      return binary(expr.x, expr.y, "<=")
    }
    case "Less": {
      return binary(expr.x, expr.y, "<")
    }
    case "GreaterEq": {
      return binary(expr.x, expr.y, ">=")
    }
    case "Greater": {
      return binary(expr.x, expr.y, ">")
    }
    case "Equal": {
      return binary(expr.x, expr.y, "==")
    }
    case "NotEqual": {
      return binary(expr.x, expr.y, "!=")
    }
    case "BitwiseAnd": {
      return binary(expr.x, expr.y, "&")
    }
    case "BitwiseXor": {
      return binary(expr.x, expr.y, "^")
    }
    case "BitwiseOr": {
      return binary(expr.x, expr.y, "|")
    }
    case "LogicalAnd": {
      return binary(expr.x, expr.y, "&&")
    }
    case "LogicalOr": {
      return binary(expr.x, expr.y, "||")
    }
    case "Conditional": {
      return parenthesized(expr.condition)
        .zipRight(space)
        .zipRight(Printer.emitString("?"))
        .zipRight(space)
        .zipRight(parenthesized(expr.trueCase))
        .zipRight(space)
        .zipRight(Printer.emitString(":"))
        .zipRight(space)
        .zipRight(parenthesized(expr.falseCase))
    }
    case "Assign": {
      return assignment(expr.x, expr.y, "=")
    }
    case "AssignMul": {
      return assignment(expr.x, expr.y, "*=")
    }
    case "AssignDiv": {
      return assignment(expr.x, expr.y, "/=")
    }
    case "AssignRem": {
      return assignment(expr.x, expr.y, "%=")
    }
    case "AssignAdd": {
      return assignment(expr.x, expr.y, "+=")
    }
    case "AssignSub": {
      return assignment(expr.x, expr.y, "-=")
    }
    case "AssignShiftLeft": {
      return assignment(expr.x, expr.y, "<<=")
    }
    case "AssignShiftRight": {
      return assignment(expr.x, expr.y, ">>=")
    }
    case "AssignAnd": {
      return assignment(expr.x, expr.y, "&=")
    }
    case "AssignOr": {
      return assignment(expr.x, expr.y, "|=")
    }
    case "AssignXor": {
      return assignment(expr.x, expr.y, "^=")
    }
    case "Comma": {
      return binary(expr.x, expr.y, ",")
    }
  }
})

export const printExpression: BashPrettyPrinter<BashExpression> = Printer.byValue((expr) => {
  switch (expr._tag) {
    case "Literal": {
      const inString = false // TODO
      const { tuple: [reqs, printer] } = prettyPrintBashString(expr.literal)
      switch (reqs._tag) {
        case "NoRequirements": {
          if (inString) {
            return doubleQuoted(printer)
          }
          return printer
        }
        case "NeedQuotes": {
          return doubleQuoted(printer)
        }
        case "NeedDollarQuotes": {
          return dollarQuoted(printer)
        }
      }
    }
    case "ReadVariable": {
      if (expr.variable._tag === "Variable" && expr.variable.name.name.length > 1) {
        return dollar.zipRight(curlyBracketed(printVariable.provide(expr.variable)))
      }
      return dollar.zipRight(printVariable.provide(expr.variable))
    }
    case "ReadArray": {
      const inner = printVariable
        .provide(expr.variable)
        .zipRight(squareBracketed(printArrayIndex.provide(expr.index)))
      return dollar.zipRight(curlyBracketed(inner))
    }
    case "Eval": {
      return between("$(", ")", printStatement.provide(expr.statement))
    }
    case "Conditional": {
      return between("[[ ", " ]]", printCondition.provide(expr.condition))
    }
    case "Interpolated": {
      const renderedParts = renderInterpolatedParts(expr.parts)
      const normalizedParts = normalizePartsWithQuoteRequirements(renderedParts)
      return normalizedParts.reduce(
        Printer.unit,
        (out, { tuple: [req, printer] }) => out.zipRight(renderStringPart(req, printer))
      )
    }
    case "EvalArithmetic": {
      return between("$(( ", " ))", printArithmeticExpression.provide(expr.expression))
    }
    case "True": {
      return Printer.emitString("true")
    }
    case "False": {
      return Printer.emitString("false")
    }
    case "And": {
      return printExpression.provide(expr.a)
        .zipRight(space)
        .zipRight(Printer.emitString("&&"))
        .zipRight(space)
        .zipRight(printExpression.provide(expr.b))
    }
    case "Or": {
      return printExpression.provide(expr.a)
        .zipRight(space)
        .zipRight(Printer.emitString("||"))
        .zipRight(space)
        .zipRight(printExpression.provide(expr.b))
    }
  }
})
