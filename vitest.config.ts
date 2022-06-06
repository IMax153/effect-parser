/// <reference types="vitest" />
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: ["packages/*/build/test/examples/Contextual.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"]
  }
})
