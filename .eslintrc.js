module.exports = {
  root: true,
  env: {
    node: false,
  },
  extends: ['plugin:vue/essential'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-parsing-error': 'off',
    singleQuote: 0,
    semi: 0,
  },
}
