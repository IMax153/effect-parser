/**
 * Represents the state of the recursive parser implementation during parsing.
 *
 * The implementation itself can be  in Parser#parseRec.
 */
export class ParserState {
  /**
   * The current position in the parsed string.
   */
  position = 0
  /**
   * A stack of named parsers which are used to enrich failures.
   */
  nameStack: List<string> = List.nil()
  /**
   * An error emitted during parsing.
   */
  error: ParserError<unknown> | undefined = undefined
  /**
   * A flag indicating that the parser results should not be used.
   */
  discard = false

  constructor(
    /**
     * The string that is being parsed.
     */
    readonly source: string
  ) {}

  pushName(name: string): void {
    this.nameStack = this.nameStack.prepend(name)
  }

  popName(): void {
    this.nameStack = this.nameStack.isCons() ? this.nameStack.tail : List.nil()
  }
}
