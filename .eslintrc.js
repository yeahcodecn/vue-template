module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/html-comment-indent': ['error', 2],
    'vue/script-setup-uses-vars': 'error',
    // 2 个空格缩进：
    indent: ['error', 2],
    // 强制使用 Unix 换行符
    'linebreak-style': ['error', 'unix'],
    // 强制使用一致的反勾号、双引号或单引号
    quotes: ['error', 'single'],
    // 要求或禁止使用分号代替 ASI
    semi: ['error', 'never'],
    // 禁止使用多行字符串
    'no-multi-str': 2,
    // 禁止自我赋值
    'no-self-assign': 2,
    // 禁止自身比较
    'no-self-compare': 2,
    // 禁用一成不变的循环条件
    'no-unmodified-loop-condition': 2,
    // 禁止出现未使用的表达式
    'no-unused-expressions': 0,
    // 禁止不必要的 .call() 和 .apply()
    'no-useless-call': 1,
    // 不允许空格和 tab 混合缩进
    'no-mixed-spaces-and-tabs': 1,
    // 强制操作符旁边有空格
    'space-infix-ops': 1,
    // 禁止对象字面量中出现重复的key
    'no-dupe-keys': 2,
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,
    // 使用未定义变量报错
    'no-undef': 2,
    // 禁止重复导入
    'no-duplicate-imports': 2
  }
}
