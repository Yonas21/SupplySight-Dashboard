export default [
  {
    ignores: ['dist/**', 'node_modules/**', '**/*.ts', '**/*.tsx'],
  },
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      'no-console': 'warn',
    },
  },
]
