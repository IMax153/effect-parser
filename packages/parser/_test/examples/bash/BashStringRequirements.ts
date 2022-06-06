/**
 * @tsplus type effect/parser/test/BashStringRequirements
 */
export type BashStringRequirements = NoRequirements | NeedQuotes | NeedDollarQuotes

/**
 * @tsplus type effect/parser/test/BashStringRequirements.Ops
 */
export interface BashStringRequirementsOps {}
export const BashStringRequirements: BashStringRequirementsOps = {}

export interface NoRequirements {
  readonly _tag: "NoRequirements"
}

export interface NeedQuotes {
  readonly _tag: "NeedQuotes"
}

export interface NeedDollarQuotes {
  readonly _tag: "NeedDollarQuotes"
}

/**
 * @tsplus static effect/parser/test/BashStringRequirements.Ops NoRequirements
 */
export const noRequirements: BashStringRequirements = {
  _tag: "NoRequirements"
}

/**
 * @tsplus static effect/parser/test/BashStringRequirements.Ops NeedQuotes
 */
export const needQuotes: BashStringRequirements = {
  _tag: "NeedQuotes"
}

/**
 * @tsplus static effect/parser/test/BashStringRequirements.Ops NeedDollarQuotes
 */
export const needDollarQuotes: BashStringRequirements = {
  _tag: "NeedDollarQuotes"
}

/**
 * @tsplus fluent effect/parser/test/BashStringRequirements needsQuotes
 */
export function needsQuotes(self: BashStringRequirements): BashStringRequirements {
  switch (self._tag) {
    case "NoRequirements": {
      return BashStringRequirements.NeedQuotes
    }
    case "NeedQuotes": {
      return BashStringRequirements.NeedQuotes
    }
    case "NeedDollarQuotes": {
      return BashStringRequirements.NeedDollarQuotes
    }
  }
}

/**
 * @tsplus fluent effect/parser/test/BashStringRequirements needsDollarQuotes
 */
export function needsDollarQuotes(
  _self: BashStringRequirements
): BashStringRequirements {
  return BashStringRequirements.NeedDollarQuotes
}
