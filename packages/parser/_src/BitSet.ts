/**
 * @tsplus type effect/parser/BitSet
 */
export type BitSet = SortedSet<number>

/**
 * @tsplus type effect/parser/BitSet.Ops
 */
export interface BitSetOps {}
export const BitSet: BitSetOps = {}

/**
 * @tsplus static effect/parser/BitSet.Ops __call
 */
export function from(bits: Collection<number>): BitSet {
  let bitset = SortedSet.make(Ord.number)
  for (const bit of bits) {
    bitset = bitset.add(bit)
  }
  return bitset
}

/**
 * @tsplus static effect/parser/BitSet.Ops AllChars
 */
export const AllChars: BitSet = BitSet(Chunk.range("\u0000".charCodeAt(0), "￿".charCodeAt(0)))
