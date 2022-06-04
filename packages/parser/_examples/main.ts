import * as util from "util"

export class ChessCoord {
  constructor(readonly row: string, readonly col: number) {}
}

export class ChessMove {
  constructor(readonly from: ChessCoord, readonly to: ChessCoord) {}
}

export class ChessGame {
  constructor(readonly moves: ReadonlyArray<ChessMove>) {}
}

const intSyntax = Syntax.digit.transform(
  (value) => Number.parseInt(value),
  (n) => `${n}`
)

const space = Syntax.whitespace.asUnit(" ")

const chessCoordSyntax = (Syntax.charIn("ABCDEFGH") & intSyntax).transform(
  ({ tuple: [row, col] }) => new ChessCoord(row, col),
  (coord) => Tuple(coord.row, coord.col)
)

const chessMoveSyntax = chessCoordSyntax
  .zipLeft(Syntax.string<void>("->", undefined).surroundedBy(space))
  .zip(chessCoordSyntax)
  .transform(
    ({ tuple: [from, to] }) => new ChessMove(from, to),
    (move) => Tuple(move.from, move.to)
  )

export const chessGameSyntax = chessMoveSyntax
  .repeatWithSep(Syntax.whitespace.asUnit("\n"))
  .transform(
    (moves) => new ChessGame([...moves]),
    (game) => Chunk.from(game.moves)
  )

export const game = `|E8 -> A1
                     |E2 -> B8
                     |C7 -> A2`.stripMargin()

export const example = new ChessGame([
  new ChessMove(new ChessCoord("E", 8), new ChessCoord("A", 1)),
  new ChessMove(new ChessCoord("E", 2), new ChessCoord("B", 8)),
  new ChessMove(new ChessCoord("C", 7), new ChessCoord("A", 2))
])

const printed = chessGameSyntax.printString(example)

console.log("\nPrinted")
console.log("======")
console.log(printed.right().value)

const parsed = chessGameSyntax.parseString(game)

console.log("\nParsed")
console.log("======")
console.log(util.inspect(parsed, { depth: null, colors: true }))
