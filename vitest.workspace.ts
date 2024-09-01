import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./apps/react-app/vite.config.ts",
  "./packages/react-windrose-chart/vitest.config.ts",
  "./packages/heatmap/vitest.config.ts"
])
