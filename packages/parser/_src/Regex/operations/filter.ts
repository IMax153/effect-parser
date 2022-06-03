const characters = Chunk.range("\u0000".charCodeAt(0), "￿".charCodeAt(0)).map(String.fromCharCode)

/**
 * A regex that matches any single character for which the specified predicate
 * returns true.
 *
 * @tsplus static effect/parser/Regex.Ops filter
 */
export function filter<A extends string>(f: Refinement<string, A>): Regex
export function filter(f: Predicate<string>): Regex
export function filter(f: Predicate<string>): Regex {
  return Regex.charIn(characters.filter(f).join(""))
}
