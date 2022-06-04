export interface Target<Capture, Output> {
  write(value: Output): void
  capture(): Capture
  emit(capture: Capture): void
  drop(capture: Capture): void
}
