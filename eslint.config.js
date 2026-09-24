import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';

export default [
  {
    linterOptions: {
      noInlineConfig: true,
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    plugins: {
      unicorn,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];
