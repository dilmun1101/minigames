import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],

      exclude: [
        ...coverageConfigDefaults.exclude,
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts',
      ],

      reportOnFailure: true,

      thresholds: {
        perFile: false,
        statements: 80,
      },
    },
  },
});
