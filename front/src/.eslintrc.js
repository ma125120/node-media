module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'vue'],
  root: true,
  parserOptions: {
    sourceType: 'module',
  },
  env: {},
  rules: {
    'vue/no-multiple-root': 'off',
  },
};
