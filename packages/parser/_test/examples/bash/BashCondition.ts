import type { BashOption } from "@effect/parser/test/examples/bash/BashOptions"
import type { BashVariable } from "@effect/parser/test/examples/bash/BashVariable"

/**
 * @tsplus type effect/parser/test/BashCondition
 */
export type BashCondition =
  | Literal
  | Variable
  | StringEquals
  | StringNotEquals
  | LexicographicLess
  | LexicographicGreater
  | Equals
  | NotEquals
  | Greater
  | GreaterEq
  | Less
  | LessEq
  | Not
  | And
  | Or
  | FileExists
  | BlockFileExists
  | CharacterFileExists
  | DirectoryExists
  | RegularFileExists
  | FileExistsWithSetGroupId
  | SymbolicLinkExists
  | FileExistsWithStickyBit
  | NamedPipeExists
  | ReadableFileExists
  | NonEmptyFileExists
  | IsOpenTerminalFileDescriptor
  | FileExistsWithSetUserId
  | WriteableFileExists
  | ExecutableFileExists
  | FileExistsOwnedByEffectiveGroupId
  | FileExistsModifiedSinceRead
  | SocketExists
  | SameDeviceAndInode
  | NewerThan
  | OlderThan
  | OptionEnabled
  | VariableSet
  | NameReferenceSet
  | ZeroLengthString
  | NonZeroLengthString

/**
 * @tsplus type effect/parser/test/BashCondition.Ops
 */
export interface BashConditionOps {}
export const BashCondition: BashConditionOps = {}

export interface Literal extends Case {
  readonly _tag: "Literal"
  readonly value: string
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops Literal
 */
export const Literal = Case.tagged<Literal>("Literal")

export interface Variable extends Case {
  readonly _tag: "Variable"
  readonly variable: BashVariable
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops Variable
 */
export const Variable = Case.tagged<Variable>("Variable")

export interface StringEquals extends Case {
  readonly _tag: "StringEquals"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops StringEquals
 */
export const StringEquals = Case.tagged<StringEquals>("StringEquals")

export interface StringNotEquals extends Case {
  readonly _tag: "StringNotEquals"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops StringNotEquals
 */
export const StringNotEquals = Case.tagged<StringNotEquals>("StringNotEquals")

export interface LexicographicLess extends Case {
  readonly _tag: "LexicographicLess"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops LexicographicLess
 */
export const LexicographicLess = Case.tagged<LexicographicLess>("LexicographicLess")

export interface LexicographicGreater extends Case {
  readonly _tag: "LexicographicGreater"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops LexicographicGreater
 */
export const LexicographicGreater = Case.tagged<LexicographicGreater>("LexicographicGreater")

export interface Equals extends Case {
  readonly _tag: "Equals"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops Equals
 */
export const Equals = Case.tagged<Equals>("Equals")

export interface NotEquals extends Case {
  readonly _tag: "NotEquals"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops NotEquals
 */
export const NotEquals = Case.tagged<NotEquals>("NotEquals")

export interface Greater extends Case {
  readonly _tag: "Greater"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops Greater
 */
export const Greater = Case.tagged<Greater>("Greater")

export interface GreaterEq extends Case {
  readonly _tag: "GreaterEq"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops GreaterEq
 */
export const GreaterEq = Case.tagged<GreaterEq>("GreaterEq")

export interface Less extends Case {
  readonly _tag: "Less"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops Less
 */
export const Less = Case.tagged<Less>("Less")

export interface LessEq extends Case {
  readonly _tag: "LessEq"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops LessEq
 */
export const LessEq = Case.tagged<LessEq>("LessEq")

export interface Not extends Case {
  readonly _tag: "Not"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops Not
 */
export const Not = Case.tagged<Not>("Not")

export interface And extends Case {
  readonly _tag: "And"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops And
 */
export const And = Case.tagged<And>("And")

export interface Or extends Case {
  readonly _tag: "Or"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops Or
 */
export const Or = Case.tagged<Or>("Or")

export interface FileExists extends Case {
  readonly _tag: "FileExists"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops FileExists
 */
export const FileExists = Case.tagged<FileExists>("FileExists")

export interface BlockFileExists extends Case {
  readonly _tag: "BlockFileExists"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops BlockFileExists
 */
export const BlockFileExists = Case.tagged<BlockFileExists>("BlockFileExists")

export interface CharacterFileExists extends Case {
  readonly _tag: "CharacterFileExists"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops CharacterFileExists
 */
export const CharacterFileExists = Case.tagged<CharacterFileExists>("CharacterFileExists")

export interface DirectoryExists extends Case {
  readonly _tag: "DirectoryExists"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops DirectoryExists
 */
export const DirectoryExists = Case.tagged<DirectoryExists>("DirectoryExists")

export interface RegularFileExists extends Case {
  readonly _tag: "RegularFileExists"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops RegularFileExists
 */
export const RegularFileExists = Case.tagged<RegularFileExists>("RegularFileExists")

export interface FileExistsWithSetGroupId extends Case {
  readonly _tag: "FileExistsWithSetGroupId"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops FileExistsWithSetGroupId
 */
export const FileExistsWithSetGroupId = Case.tagged<FileExistsWithSetGroupId>("FileExistsWithSetGroupId")

export interface SymbolicLinkExists extends Case {
  readonly _tag: "SymbolicLinkExists"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops SymbolicLinkExists
 */
export const SymbolicLinkExists = Case.tagged<SymbolicLinkExists>("SymbolicLinkExists")

export interface FileExistsWithStickyBit extends Case {
  readonly _tag: "FileExistsWithStickyBit"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops FileExistsWithStickyBit
 */
export const FileExistsWithStickyBit = Case.tagged<FileExistsWithStickyBit>("FileExistsWithStickyBit")

export interface NamedPipeExists extends Case {
  readonly _tag: "NamedPipeExists"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops NamedPipeExists
 */
export const NamedPipeExists = Case.tagged<NamedPipeExists>("NamedPipeExists")

export interface ReadableFileExists extends Case {
  readonly _tag: "ReadableFileExists"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops ReadableFileExists
 */
export const ReadableFileExists = Case.tagged<ReadableFileExists>("ReadableFileExists")

export interface NonEmptyFileExists extends Case {
  readonly _tag: "NonEmptyFileExists"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops NonEmptyFileExists
 */
export const NonEmptyFileExists = Case.tagged<NonEmptyFileExists>("NonEmptyFileExists")

export interface IsOpenTerminalFileDescriptor extends Case {
  readonly _tag: "IsOpenTerminalFileDescriptor"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops IsOpenTerminalFileDescriptor
 */
export const IsOpenTerminalFileDescriptor = Case.tagged<IsOpenTerminalFileDescriptor>("IsOpenTerminalFileDescriptor")

export interface FileExistsWithSetUserId extends Case {
  readonly _tag: "FileExistsWithSetUserId"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops FileExistsWithSetUserId
 */
export const FileExistsWithSetUserId = Case.tagged<FileExistsWithSetUserId>("FileExistsWithSetUserId")

export interface WriteableFileExists extends Case {
  readonly _tag: "WriteableFileExists"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops WriteableFileExists
 */
export const WriteableFileExists = Case.tagged<WriteableFileExists>("WriteableFileExists")

export interface ExecutableFileExists extends Case {
  readonly _tag: "ExecutableFileExists"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops ExecutableFileExists
 */
export const ExecutableFileExists = Case.tagged<ExecutableFileExists>("ExecutableFileExists")

export interface FileExistsOwnedByEffectiveGroupId extends Case {
  readonly _tag: "FileExistsOwnedByEffectiveGroupId"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops FileExistsOwnedByEffectiveGroupId
 */
export const FileExistsOwnedByEffectiveGroupId = Case.tagged<FileExistsOwnedByEffectiveGroupId>(
  "FileExistsOwnedByEffectiveGroupId"
)

export interface FileExistsModifiedSinceRead extends Case {
  readonly _tag: "FileExistsModifiedSinceRead"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops FileExistsModifiedSinceRead
 */
export const FileExistsModifiedSinceRead = Case.tagged<FileExistsModifiedSinceRead>("FileExistsModifiedSinceRead")

export interface SocketExists extends Case {
  readonly _tag: "SocketExists"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops SocketExists
 */
export const SocketExists = Case.tagged<SocketExists>("SocketExists")

export interface SameDeviceAndInode extends Case {
  readonly _tag: "SameDeviceAndInode"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops SameDeviceAndInode
 */
export const SameDeviceAndInode = Case.tagged<SameDeviceAndInode>("SameDeviceAndInode")

export interface NewerThan extends Case {
  readonly _tag: "NewerThan"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops NewerThan
 */
export const NewerThan = Case.tagged<NewerThan>("NewerThan")

export interface OlderThan extends Case {
  readonly _tag: "OlderThan"
  readonly a: BashCondition
  readonly b: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops OlderThan
 */
export const OlderThan = Case.tagged<OlderThan>("OlderThan")

export interface OptionEnabled extends Case {
  readonly _tag: "OptionEnabled"
  readonly option: BashOption
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops OptionEnabled
 */
export const OptionEnabled = Case.tagged<OptionEnabled>("OptionEnabled")

export interface VariableSet extends Case {
  readonly _tag: "VariableSet"
  readonly variable: BashVariable
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops VariableSet
 */
export const VariableSet = Case.tagged<VariableSet>("VariableSet")

export interface NameReferenceSet extends Case {
  readonly _tag: "NameReferenceSet"
  readonly variable: BashVariable
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops NameReferenceSet
 */
export const NameReferenceSet = Case.tagged<NameReferenceSet>("NameReferenceSet")

export interface ZeroLengthString extends Case {
  readonly _tag: "ZeroLengthString"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops ZeroLengthString
 */
export const ZeroLengthString = Case.tagged<ZeroLengthString>("ZeroLengthString")

export interface NonZeroLengthString extends Case {
  readonly _tag: "NonZeroLengthString"
  readonly a: BashCondition
}

/**
 * @tsplus static effect/parser/test/BashCondition.Ops NonZeroLengthString
 */
export const NonZeroLengthString = Case.tagged<NonZeroLengthString>("NonZeroLengthString")
