export interface BashIdentifier extends Case {
  readonly name: string
}
export const BashIdentifier = Case.of<BashIdentifier>()
