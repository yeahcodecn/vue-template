// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    'header-max-length': [0, 'always', 72]
  },
  prompt: {
    messages: {
      type:                '选择你要提交的类型 :',
      scope:               '选择一个提交范围（可选）:',
      customScope:         '请输入自定义的提交范围 :',
      subject:             '填写简短精炼的变更描述 :\n',
      body:                '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking:            '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀（可选）:',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer:              '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit:       '是否提交或修改commit ?'
    },
    types: [
      { value: 'feat',     name: '✨ feat:     新增功能 | A new feature' },
      { value: 'fix',      name: '🐛 fix:      修复缺陷 | A bug fix' },
      { value: 'docs',     name: '📝 docs:     文档更新 | Documentation only changes' },
      { value: 'style',    name: '💄style:     代码格式 | Changes that do not affect the meaning of the code' },
      { value: 'refactor', name: '♻ refactor:  代码重构 | A code change that neither fixes a bug nor adds a feature' },
      { value: 'perf',     name: '⚡ perf:     性能提升 | A code change that improves performance' },
      { value: 'test',     name: '✅ test:     测试相关 | Adding missing tests or correcting existing tests' },
      { value: 'build',    name: '👷 build:    构建相关 | Changes that affect the build system or external dependencies' },
      { value: 'ci',       name: '🔧 ci:       持续集成 | Changes to our CI configuration files and scripts' },
      { value: 'revert',   name: '⏪ revert:   回退代码 | Revert to a commit' },
      { value: 'chore',    name: '📦 chore:    其他修改 | Other changes that do not modify src or test files' }
    ],
    scopes: [
      ['components', '组件相关'],
      ['hooks',      'hook 相关'],
      ['utils',      'utils 相关'],
      ['element-ui', '对 element-ui 的调整'],
      ['styles',     '样式相关'],
      ['deps',       '项目依赖'],
      ['auth',       '对 auth 修改'],
      ['other',      '其他修改'],
      // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
      ['custom', '以上都不是？我要自定义']
    ].map(([value, description]) => {
      return {
        value,
        name: `${value.padEnd(10)} (${description})`
      }
    }),
    useEmoji: true,
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixs: [
      // 如果使用 gitee 作为开发管理
      { value: 'link',   name: 'link:     链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' }
    ],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: 'skip',
    customIssuePrefixsAlias: 'custom',
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  }
}
