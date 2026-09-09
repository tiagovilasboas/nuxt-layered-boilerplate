import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const root = fileURLToPath(new URL('./', import.meta.url))

export default defineConfig({
  test: {
    environment: 'node',
    include: ['shared/**/*.spec.ts', 'app/**/*.spec.ts', 'server/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['shared/catalog/**/*.ts', 'shared/types/**/*.ts'],
      exclude: ['**/*.spec.ts', '**/index.ts'],
    },
  },
  resolve: {
    alias: {
      '#shared': fileURLToPath(new URL('./shared', import.meta.url)),
      '~': fileURLToPath(new URL('./app', import.meta.url)),
      '@': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
  root,
})
