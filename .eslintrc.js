module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname
  },
  ignorePatterns: ['dist', 'webpack.*.js'],
  rules: {
    'import/prefer-default-export': 'off'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@cybozu/eslint-config/globals/kintone',
    'prettier'
  ]
};
