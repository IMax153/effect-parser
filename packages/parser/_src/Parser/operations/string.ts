export function string<Result>(str: string, value: Result): Parser<string, string, Result> {
  return Parser.regexDiscard(Regex.string(str), `not "${str}"`).as(value)
}
