import nextJest from 'next/jest.js'

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
    // Next.jsアプリのディレクトリ（next.config.jsがある場所）を指定
    dir: './',
})

// Jestのカスタム設定
const config = {
    // テスト環境の設定
    testEnvironment: 'jsdom',

    // セットアップファイルの指定
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

    // テストファイルのパターン
    testMatch: [
        '**/__tests__/**/*.(ts|tsx|js)',
        '**/*.(test|spec).(ts|tsx|js)'
    ],

    // カバレッジの設定
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        'lib/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/app/layout.tsx',
        '!src/app/globals.css',
    ],

    // モジュールマッピング
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    // ESM modules to transform
    transformIgnorePatterns: [
        'node_modules/(?!(unified|remark-parse|remark-rehype|rehype-stringify|rehype-prism-plus|rehype-sanitize|hast-util-sanitize|vfile|unist-util-stringify-position|bail|is-plain-obj|trough|mdast-util-from-markdown|mdast-util-to-markdown|mdast-util-to-hast|hast-util-to-html|micromark|decode-named-character-reference|character-entities|@types/mdast|@types/hast|@types/unist)/)',
    ],

    // テスト実行前の環境変数設定
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
}

// Next.js用のJest設定を作成
export default createJestConfig(config)
