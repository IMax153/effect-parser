import * as util from "util"

export class ChessCoord {
  constructor(readonly row: string, readonly col: string) {}
}

export class ChessMove {
  constructor(readonly from: ChessCoord, readonly to: ChessCoord) {}
}

export class ChessGame {
  constructor(readonly moves: ReadonlyArray<ChessMove>) {}
}

const game = `|E8 -> A1
              |E2 -> B8
              |C7 -> A2`.stripMargin()

const chessCoord = Parser.charIn("ABCDEFGH")
  .named("row")
  .zipWith(Parser.digit, (row, col) => new ChessCoord(row, col))
const chessMove = chessCoord
  .zipLeft(Parser.whitespace.named("space"))
  .zipLeft(Parser.string("->", undefined))
  .zipLeft(Parser.whitespace)
  .zipWith(chessCoord, (from, to) => new ChessMove(from, to))
const chessGame = chessMove
  .repeatWithSep(Parser.whitespace)
  .map((moves) => new ChessGame([...moves]))
  .zipLeft(Parser.end)

const result = chessGame.parseString(game)

console.log(util.inspect(result, { depth: null, colors: true }))
