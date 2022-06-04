import { IllegalStateException } from "@effect/core/io/Cause"
import type { Target } from "@effect/parser/Target/definition"
import type { ChunkBuilder } from "@tsplus/stdlib/collections/Chunk"

/**
 * @tsplus type effect/parser/Target/ChunkTarget
 * @tsplus companion effect/parser/Target/ChunkTarget.Ops
 */
export class ChunkTarget<Output> implements Target<ChunkTarget.Capture<Output>, Output> {
  private builder: ChunkBuilder<Output> = Chunk.builder()
  private captureStack: Stack<ChunkTarget.Capture<Output>> | undefined = undefined
  private currentBuilder: ChunkBuilder<Output> = this.builder

  write(value: Output): void {
    this.currentBuilder.append(value)
  }

  capture(): ChunkTarget.Capture<Output> {
    const capture = new ChunkTargetCapture(Chunk.builder<Output>())
    this.captureStack = new Stack(capture, this.captureStack)
    this.currentBuilder = capture.subBuilder
    return capture
  }

  emit(capture: ChunkTarget.Capture<Output>): void {
    const popped = this.popCaptureFrame()
    if (popped == null || popped !== capture) {
      throw new IllegalStateException("emit called on a capture group that was not at the top of the stack")
    }
    if (!this.isCaptureStackEmpty()) {
      this.currentBuilder = this.captureStack!.value.subBuilder
    } else {
      this.currentBuilder = this.builder
    }
    const results = capture.subBuilder.build()
    for (const result of results) {
      this.currentBuilder.append(result)
    }
  }

  drop(capture: ChunkTarget.Capture<Output>): void {
    const popped = this.popCaptureFrame()
    if (popped == null || popped !== capture) {
      throw new IllegalStateException("emit called on a capture group that was not at the top of the stack")
    }
    if (!this.isCaptureStackEmpty()) {
      this.currentBuilder = this.captureStack!.value.subBuilder
    } else {
      this.currentBuilder = this.builder
    }
  }

  result(): Chunk<Output> {
    return this.builder.build()
  }

  private isCaptureStackEmpty(): boolean {
    return this.captureStack == null
  }

  private popCaptureFrame(): ChunkTarget.Capture<Output> | undefined {
    if (this.captureStack != null) {
      const current = this.captureStack.value
      this.captureStack = this.captureStack.previous
      return current
    }
    return undefined
  }
}

export declare namespace ChunkTarget {
  export type Capture<Output> = ChunkTargetCapture<Output>
}

export class ChunkTargetCapture<Output> {
  constructor(readonly subBuilder: ChunkBuilder<Output>) {}
}
