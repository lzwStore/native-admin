module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard',
    './.eslintrc-auto-import.json' // 解决使用unplugin-vue-components插件 eslint 会提示 ref is not defined
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'no-debugger': 'error',
    'vue/multi-word-component-names': 'off',
    camelcase: 'off',
    // 禁用函数名后加空格
    'space-before-function-paren': 'off',
    'vue/valid-v-for': 0,
    'vue/no-use-v-if-with-v-for': 0
  }
}
