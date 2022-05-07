module.exports = {
  hooks: {
    'before:init': ['echo hello world']
  },
  git: {
    changelog: 'git log --pretty=format:"* %s (%h)" ${from}...${to}',
    requireCleanWorkingDir: false,
    requireBranch: false,
    requireUpstream: true,
    requireCommits: false,
    addUntrackedFiles: false,
    commit: true,
    commitMessage: 'Release ${version}',
    commitArgs: [],
    tag: true,
    tagName: null,
    tagMatch: null,
    tagAnnotation: 'Release ${version}',
    tagArgs: [],
    push: true,
    pushArgs: ['--follow-tags'],
    pushRepo: ''
  },
  npm: {
    publish: false
  },
  github: {
    release: false
  },
  gitlab: {
    release: false
  },
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      preset: {
        name: 'conventionalcommits',
        header: '# 📋 更新历史 \n\n',
        types: [
          { type: 'feat',     section: '✨feat:     新增功能' },
          { type: 'fix',      section: '🐛fix:      修复 bug' },
          { type: 'docs',     section: '📝docs:     文档变更' },
          { type: 'style',    section: '💄style:    代码格式（不影响功能，例如空格、分号等格式修正）' },
          { type: 'refactor', section: '♻refactor: 代码重构（不包括 bug 修复、功能新增）' },
          { type: 'perf',     section: '⚡perf:     性能优化' },
          { type: 'test',     section: '✅test:     添加、修改测试用例' },
          { type: 'build',    section: '👷‍build:    构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）' },
          { type: 'ci',       section: '🔧ci:       修改 CI 配置、脚本' },
          { type: 'chore',    section: '📦chore:    对构建过程或辅助工具和库的更改（不影响源文件、测试用例）' },
          { type: 'revert',   section: '⏪revert:   回滚 commit' }
        ],
        commitUrlFormat: 'https://github.com/yeahcodecn/vue-template/commit/{{hash}}'
      }
    }
  }
}
