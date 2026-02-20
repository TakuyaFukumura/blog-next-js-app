# blog-next-js-app 開発者向け仕様書

## 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [技術スタック](#技術スタック)
3. [アーキテクチャ](#アーキテクチャ)
4. [ディレクトリ構造](#ディレクトリ構造)
5. [主要コンポーネント](#主要コンポーネント)
6. [データフローと処理](#データフローと処理)
7. [開発ガイドライン](#開発ガイドライン)
8. [テスト戦略](#テスト戦略)
9. [CI/CDパイプライン](#cicdパイプライン)
10. [デプロイメント](#デプロイメント)

## プロジェクト概要

### 目的

blog-next-js-appは、Markdownファイルを基にしたシンプルで高速なブログアプリケーションです。Next.jsのApp
Routerと静的サイト生成（SSG）を活用し、SEOに優れたパフォーマンスの高いブログシステムを提供します。

### 主な機能

- Markdownベースの記事管理
- 静的サイト生成（SSG）によるビルド時レンダリング
- フロントマター（YAML）による記事メタデータ管理
- シンタックスハイライト対応のコード表示
- レスポンシブデザイン
- ダークモード対応
- タグベースの記事分類
- 記事検索機能

## 技術スタック

### フロントエンド

- **Next.js 16.1.6**: Reactフレームワーク（App Router使用）
- **React 19.2.4**: UIライブラリ
- **TypeScript 5.x**: 型安全な開発環境

### スタイリング

- **Tailwind CSS 4.x**: ユーティリティファーストCSSフレームワーク
- **@tailwindcss/typography**: Markdown/プロース用のスタイリング
- **PostCSS**: CSS処理

### Markdown処理

- **unified**: Markdownパイプライン処理のコア
- **remark-parse**: Markdown構文解析
- **remark-rehype**: MarkdownからHTMLへの変換
- **rehype-prism-plus**: シンタックスハイライト
- **rehype-sanitize**: XSS対策のHTMLサニタイズ
- **rehype-stringify**: HTML文字列生成
- **gray-matter**: Markdownフロントマター解析

### 開発ツール

- **ESLint**: コード品質管理とリンティング
- **Jest**: テストフレームワーク
- **Testing Library**: Reactコンポーネントテスト
- **ts-jest**: TypeScript対応Jest

### CI/CD

- **GitHub Actions**: 自動テスト・ビルド・デプロイ
- **Dependabot**: 依存関係の自動更新

## アーキテクチャ

### アーキテクチャパターン

このプロジェクトは、Next.jsのApp Routerを使用した**ファイルシステムベースルーティング**と**静的サイト生成（SSG）**を採用しています。

```
┌─────────────────────────────────────────────────────┐
│                   ブラウザ                            │
└───────────────────┬─────────────────────────────────┘
                    │ HTTP Request
                    ▼
┌─────────────────────────────────────────────────────┐
│              Next.js App Router                      │
│  ┌─────────────────────────────────────────────┐   │
│  │  ルーティング（ファイルシステムベース）       │   │
│  └─────────────────────────────────────────────┘   │
└───────────────────┬─────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌──────────────┐         ┌──────────────┐
│ ページコンポ  │         │  API Layer   │
│   ーネント    │         │ (lib/posts,  │
│              │         │  markdown)   │
└──────────────┘         └──────────────┘
        │                       │
        └───────────┬───────────┘
                    ▼
        ┌────────────────────┐
        │   Markdownファイル  │
        │   (posts/*.md)     │
        └────────────────────┘
```

### レンダリング戦略

1. **静的サイト生成（SSG）**: ビルド時に全ての記事ページを事前生成
2. **クライアントサイドハイドレーション**: インタラクティブな機能（ダークモード切り替えなど）

### 状態管理

- **React Context API**: ダークモードの状態管理
- **localStorage**: テーマ設定の永続化

## ディレクトリ構造

```
blog-next-js-app/
├── .github/                    # GitHub設定
│   ├── ISSUE_TEMPLATE/        # イシューテンプレート
│   ├── workflows/             # GitHub Actions ワークフロー
│   │   └── ci.yml            # CI設定
│   ├── dependabot.yml        # Dependabot設定
│   └── PULL_REQUEST_TEMPLATE.md
├── __tests__/                 # テストファイル
│   └── src/
│       ├── app/
│       │   └── components/   # コンポーネントテスト
│       └── lib/              # ライブラリテスト
├── docs/                      # ドキュメント
│   └── developer-specification.md  # 開発者向け仕様書
├── posts/                     # Markdownブログ記事
│   ├── 2024-01-15-nextjs-blog-tutorial.md
│   ├── 2024-02-20-typescript-type-system.md
│   └── 2024-03-10-tailwind-css-modern-ui.md
├── public/                    # 静的ファイル（画像など）
├── src/                       # ソースコード
│   ├── app/                  # App Router ディレクトリ
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # 動的ルート: 記事詳細ページ
│   │   ├── components/       # Reactコンポーネント
│   │   │   ├── BlogCard.tsx  # 記事カード
│   │   │   ├── BlogList.tsx  # 記事一覧
│   │   │   ├── DarkModeProvider.tsx  # ダークモード管理
│   │   │   ├── Header.tsx    # ヘッダー
│   │   │   └── MarkdownContent.tsx   # Markdownレンダラー
│   │   ├── favicon.ico
│   │   ├── globals.css       # グローバルスタイル
│   │   ├── layout.tsx        # ルートレイアウト
│   │   └── page.tsx          # ホームページ（記事一覧）
│   ├── lib/                  # ユーティリティライブラリ
│   │   ├── markdown.ts       # Markdown処理
│   │   └── posts.ts          # 記事データ取得
│   └── types/                # TypeScript型定義
│       └── post.ts           # 記事関連の型定義
├── CHANGELOG.md              # 変更履歴
├── README.md                 # プロジェクト説明
├── eslint.config.mjs         # ESLint設定
├── jest.config.mjs           # Jest設定
├── jest.setup.js             # Jestセットアップ
├── next.config.ts            # Next.js設定
├── package.json              # npm依存関係
├── postcss.config.mjs        # PostCSS設定
├── tailwind.config.ts        # Tailwind CSS設定
└── tsconfig.json             # TypeScript設定
```

## 主要コンポーネント

### 1. データ層（`src/lib/`）

#### `posts.ts` - 記事データ管理

記事データの取得と管理を担当するユーティリティモジュールです。

**主要関数:**

```typescript
// すべての記事のslugを取得
export function getPostSlugs(): string[]

// 指定されたslugの記事を取得
export function getPostBySlug(slug: string): Post | null

// すべての公開済み記事を取得（日付降順）
export function getAllPosts(): PostPreview[]

// 記事を検索
export function searchPosts(query?: string, tags?: string[]): PostPreview[]
```

**重要な機能:**

- ファイル名からのslug自動生成（`YYYY-MM-DD-slug.md` → `slug`）
- フロントマターの解析
- `published: false` の記事の自動フィルタリング
- 日付による自動ソート

#### `markdown.ts` - Markdown処理

MarkdownをHTMLに変換する処理を担当します。

**主要関数:**

```typescript
// MarkdownをHTMLに変換（サニタイズ済み）
export async function markdownToHtml(markdown: string): Promise<string>
```

**処理パイプライン:**

1. `remark-parse`: Markdown構文解析
2. `remark-rehype`: Markdown ASTからHTML ASTへ変換
3. `rehype-prism-plus`: コードブロックのシンタックスハイライト
4. `rehype-sanitize`: XSS対策のHTMLサニタイズ
5. `rehype-stringify`: HTML文字列生成

### 2. 型定義（`src/types/post.ts`）

```typescript
// 記事メタデータ（フロントマター）
export interface PostMetadata {
  title: string;          // 記事タイトル
  date: string;           // 公開日（ISO 8601形式）
  author: string;         // 著者名
  tags: string[];         // タグ配列
  description: string;    // 記事説明（SEO用）
  image?: string;         // OGP画像（オプション）
  published: boolean;     // 公開フラグ
}

// 完全な記事データ（コンテンツ含む）
export interface Post extends PostMetadata {
  slug: string;           // URL用のslug
  content: string;        // Markdownコンテンツ
}

// 記事プレビュー（一覧表示用）
export interface PostPreview extends PostMetadata {
  slug: string;
}
```

### 3. ページコンポーネント（`src/app/`）

#### `page.tsx` - ホームページ

トップページで全記事の一覧を表示します。

**機能:**

- 公開済み記事の一覧表示
- グリッドレイアウト（レスポンシブ対応）
- 記事カードの表示

#### `blog/[slug]/page.tsx` - 記事詳細ページ

動的ルーティングによる個別記事の表示ページです。

**主要な機能:**

- `generateStaticParams()`: ビルド時に全記事の静的パスを生成
- `generateMetadata()`: 動的なSEOメタデータの生成
- Markdownコンテンツのレンダリング
- 戻るリンク
- 記事メタデータ（タイトル、日付、著者、タグ）の表示

### 4. UIコンポーネント（`src/app/components/`）

#### `Header.tsx` - ヘッダーコンポーネント

アプリケーション全体のヘッダーを提供します。

**機能:**

- ブログタイトルとホームリンク
- ダークモード切り替えボタン
- レスポンシブデザイン
- スティッキーヘッダー（スクロール時も固定）

#### `DarkModeProvider.tsx` - ダークモード管理

React Context APIを使用したダークモードの状態管理を提供します。

**機能:**

- テーマの状態管理（light/dark）
- localStorageへの永続化
- 初期値は 'light'（localStorage に保存がない場合）
- `<html>`要素への`class`属性追加/削除

```typescript
export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context; // { theme, setTheme, isDark }
}
```

#### `BlogList.tsx` - 記事一覧コンポーネント

記事一覧を表示するコンポーネントです。

**Props:**

```typescript
interface BlogListProps {
    posts: PostPreview[];
}
```

**機能:**

- グリッドレイアウトでの記事表示
- 各記事を`BlogCard`コンポーネントで表示

#### `BlogCard.tsx` - 記事カードコンポーネント

個別の記事をカード形式で表示します。

**Props:**

```typescript
interface BlogCardProps {
    post: PostPreview;
}
```

**機能:**

- 記事タイトル、説明、日付、著者の表示
- タグの表示
- 記事詳細ページへのリンク
- ホバーエフェクト

#### `MarkdownContent.tsx` - Markdownレンダラー

HTMLに変換されたMarkdownコンテンツを表示します。

**Props:**

```typescript
interface MarkdownContentProps {
    content: string;  // HTML文字列
}
```

**機能:**

- `dangerouslySetInnerHTML`を使用したHTMLレンダリング
- Tailwind Typographyプラグインによるスタイリング
- ダークモード対応

### 5. レイアウト（`src/app/layout.tsx`）

アプリケーション全体のルートレイアウトです。

**機能:**

- `DarkModeProvider`でアプリをラップ
- `Header`コンポーネントの配置
- HTMLメタデータの設定
- グローバルスタイル（`globals.css`）の読み込み

## データフローと処理

### 記事データの取得フロー

```
┌─────────────────────────────────────────────┐
│ 1. ビルド時（next build）                    │
│    または開発サーバー起動時（next dev）       │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 2. Next.jsがページコンポーネントを実行        │
│    - page.tsx (ホームページ)                 │
│    - blog/[slug]/page.tsx (記事詳細)         │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 3. lib/posts.ts の関数を呼び出し              │
│    - getAllPosts() または                    │
│    - getPostBySlug(slug)                    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 4. posts/ ディレクトリのMarkdownファイル読み込み│
│    - fs.readdirSync()                       │
│    - fs.readFileSync()                      │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 5. gray-matterでフロントマター解析           │
│    - メタデータ（title, date, tags等）抽出   │
│    - Markdownコンテンツ分離                  │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 6. データ加工・フィルタリング                  │
│    - published: false の記事を除外           │
│    - 日付でソート                            │
│    - slug生成                                │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 7. Postオブジェクト配列を返却                 │
│    - Post[] または PostPreview[]            │
└─────────────────────────────────────────────┘
```

### Markdown→HTML変換フロー

```
┌─────────────────────────────────────────────┐
│ 1. 記事詳細ページで markdownToHtml() 呼び出し │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 2. unified パイプライン開始                   │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 3. remark-parse: Markdown → Markdown AST   │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 4. remark-rehype: Markdown AST → HTML AST  │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 5. rehype-prism-plus: コードハイライト追加    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 6. rehype-sanitize: XSS対策のサニタイズ      │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 7. rehype-stringify: HTML文字列生成          │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 8. サニタイズ済みHTML文字列を返却             │
└─────────────────────────────────────────────┘
```

### ダークモード切り替えフロー

```
┌─────────────────────────────────────────────┐
│ 1. アプリケーション初期化                      │
│    - DarkModeProvider がマウント              │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 2. localStorageから theme を読み込み         │
│    - なければ 'light' を初期値として使用      │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 3. 状態を Context に保存                      │
│    - theme: 'light' | 'dark'                │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 4. <html> 要素に class を適用                 │
│    - class="dark" または class=""            │
└─────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 5. ユーザーがヘッダーのボタンをクリック         │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 6. setTheme() 関数を呼び出し                  │
│    - 'light' ⇔ 'dark' トグル                 │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 7. localStorage に新しい theme を保存         │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 8. <html> 要素の class を更新                 │
│    - UIが即座に更新される                     │
└─────────────────────────────────────────────┘
```

## 開発ガイドライン

### コーディング規約

#### TypeScript

- **厳格な型付け**: `any`型の使用は避ける
- **明示的な型定義**: 関数の引数と戻り値には型を明示
- **インターフェース優先**: 型定義には`interface`を使用
- **null安全**: `null`と`undefined`のチェックを徹底

#### React

- **関数コンポーネント**: クラスコンポーネントは使用しない
- **Hooks**: 状態管理には適切なHooksを使用
- **Client Component**: インタラクティブな機能には`'use client'`を明示
- **Server Component**: デフォルトはServer Component（データ取得に最適）

#### スタイリング

- **Tailwind CSS**: インラインでユーティリティクラスを使用
- **レスポンシブ**: モバイルファースト（`sm:`, `md:`, `lg:`プレフィックス）
- **ダークモード**: `dark:`プレフィックスで対応

#### ファイル命名

- **コンポーネント**: PascalCase（例: `BlogCard.tsx`）
- **ユーティリティ**: camelCase（例: `posts.ts`）
- **型定義ファイル**: camelCase（例: `post.ts`）
- **Markdownファイル**: `YYYY-MM-DD-slug.md`形式推奨

### 新規記事の追加方法

1. `posts/`ディレクトリに新しいMarkdownファイルを作成
2. フロントマターを記述:

```yaml
---
title: "記事のタイトル"
date: "2024-01-15"
author: "著者名"
tags: ["タグ1", "タグ2"]
description: "記事の説明（SEO用）"
published: true
---
```

3. Markdown本文を記述
4. 開発サーバーで確認（自動リロード）
5. ビルドで静的ページ生成

### 新規コンポーネントの追加

1. `src/app/components/`に新しいファイルを作成
2. 必要に応じて`'use client'`ディレクティブを追加
3. TypeScriptでPropsの型定義を記述
4. テストファイルを`__tests__/src/app/components/`に作成
5. 既存コンポーネントから呼び出し

### 環境変数の管理

現在、このプロジェクトでは環境変数を使用していませんが、必要に応じて：

1. `.env.local`ファイルを作成（Gitには含めない）
2. Next.jsの環境変数規約に従う
    - `NEXT_PUBLIC_*`: クライアントサイドで使用可能
    - それ以外: サーバーサイドのみ

## テスト戦略

### テストツール

- **Jest**: テストランナー
- **Testing Library**: Reactコンポーネントテスト
- **ts-jest**: TypeScriptサポート

### テストファイルの配置

```
__tests__/
└── src/
    ├── app/
    │   └── components/
    │       ├── DarkModeProvider.test.tsx
    │       └── Header.test.tsx
    └── lib/
        ├── markdown-integration.test.ts
        └── posts.test.ts
```

### テストコマンド

```bash
# 全テスト実行
npm test

# ウォッチモード
npm run test:watch

# カバレッジレポート生成
npm run test:coverage
```

### テストカテゴリ

#### 1. ユニットテスト

**対象**: 個別の関数やユーティリティ

**例**: `lib/posts.test.ts`

- `getPostSlugs()`: slug一覧取得のテスト
- `getPostBySlug()`: 個別記事取得のテスト
- `getAllPosts()`: 全記事取得とソートのテスト
- `searchPosts()`: 検索機能のテスト

**テスト観点:**

- 正常系（期待通りのデータが返される）
- 異常系（存在しないslug、無効なデータ）
- エッジケース（空のディレクトリ、published: false）

#### 2. インテグレーションテスト

**対象**: 複数モジュールの連携

**例**: `lib/markdown-integration.test.ts`

- Markdownパイプライン全体の動作確認
- コードハイライトの動作確認
- サニタイズの動作確認

#### 3. コンポーネントテスト

**対象**: Reactコンポーネント

**例**: `app/components/Header.test.tsx`

- レンダリングの確認
- ユーザーインタラクション（ボタンクリックなど）
- 状態変化の確認

**例**: `app/components/DarkModeProvider.test.tsx`

- Context Providerの動作確認
- localStorageの連携テスト
- テーマ切り替えのテスト

### テスト作成ガイドライン

- **AAA パターン**: Arrange（準備）、Act（実行）、Assert（検証）
- **単一責任**: 1テストケースで1つの観点をテスト
- **モック**: 外部依存（localStorage、ファイルシステム）はモック化
- **カバレッジ目標**: 80%以上を目指す

## CI/CDパイプライン

### GitHub Actions設定

ワークフローファイル: `.github/workflows/ci.yml`

### CI実行トリガー

- `push`: 任意のブランチへのプッシュ時
- （プルリクエストのトリガーは現在未設定）

### CI実行内容

**注意**: 実際の `.github/workflows/ci.yml` では、GitHub Actions のバージョンはセキュリティのためコミット SHA
で固定されています（例: `actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd`）。以下は説明のため簡略化した表記です。

```yaml
jobs:
  test:
    name: リント・型チェック・ビルド・テスト
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20.x]
    
    steps:
      1. コードのチェックアウト (actions/checkout@de0fac... # v6.0.2)
      2. Node.js セットアップ (actions/setup-node@6044e13... # v6.2.0)
      3. 依存関係のインストール (npm ci)
      4. ESLint実行 (npm run lint)
      5. ビルド実行（型チェック含む）(npm run build)
      6. テスト実行 (npm test)
```

### Dependabot設定

ファイル: `.github/dependabot.yml`

**自動更新スケジュール:**

- **頻度**: 月次（毎月第1月曜日 09:00 JST）
- **対象エコシステム**:
    - GitHub Actions（最大5件のPR）
    - npm パッケージ（最大10件のPR）

**コミットメッセージプレフィックス:**

- GitHub Actions: `github-actions` / `github-actions(dev)`
- npm: `npm` / `npm(dev)`

### CI/CD ベストプラクティス

- **依存関係キャッシュ**: `actions/setup-node`の`cache: 'npm'`オプションでビルド高速化
- **バージョン固定**: GitHub Actionsのバージョンはコミットハッシュで固定
- **自動更新**: Dependabotによる定期的な依存関係更新
- **失敗の早期検出**: lint → build → test の順で実行

## デプロイメント

### 推奨デプロイ環境

#### 1. Vercel（推奨）

- **特徴**: Next.js開発元が提供、最適化された環境
- **自動デプロイ**: Gitプッシュで自動デプロイ
- **プレビュー環境**: プルリクエスト毎に自動生成

**デプロイ手順:**

1. Vercelアカウント作成
2. GitHubリポジトリを接続
3. 自動的にビルド・デプロイが実行される

#### 2. Netlify

- **特徴**: 静的サイトホスティングに特化。Next.js アプリは Netlify の Next.js Runtime（ビルトイン機能）で動作させることを想定。
- **ビルドコマンド**: `npm run build`
- **公開ディレクトリ**:
    - SSR / ISR など、通常の Next.js アプリとしてデプロイする場合: Netlify の Next.js
      サポートにより自動的に処理されるため、明示的な公開ディレクトリ指定は不要（Netlify ダッシュボードの Publish directory
      は空欄でも可）。
    - 静的エクスポート（`output: 'export'` を `next.config.ts` に設定）で完全静的サイトとしてホスティングする場合: `out/`
      を公開ディレクトリとして指定。
- **追加設定（任意）**:
    - より細かい制御が必要な場合のみ、プロジェクト直下に `netlify.toml` を作成し、`[build]` セクションで `command` や
      `publish` を設定する。
    - 例（静的エクスポートを行う場合）:

      ```toml
      [build]
        command = "npm run build"
        publish = "out"
      ```

    - Next.js Runtime は Netlify に統合されているため、基本的には追加プラグインのインストールは不要です（Netlify 側で
      Next.js フレームワークを選択するだけで利用可能）。

#### 3. カスタムサーバー

Node.jsサーバーで実行する場合:

```bash
# ビルド
npm run build

# プロダクション起動
npm start
```

### ビルド最適化

- **静的サイト生成（SSG）**: `generateStaticParams()` などを用いて、ビルド時に事前レンダリング可能なページを生成
- **画像最適化**: Next.js Image Optimizationの活用（必要に応じて）
- **コード分割**: 自動的にページ単位でバンドルを分割

### 本番環境チェックリスト

- [ ] `npm run build`が正常に完了する
- [ ] `npm test`が全て成功する
- [ ] `npm run lint`でエラーがない
- [ ] 環境変数が正しく設定されている（該当する場合）
- [ ] Markdownファイルのフロントマターが正しい
- [ ] OGP画像などの静的ファイルが`public/`に配置されている

## トラブルシューティング

### よくある問題と解決策

#### 記事が表示されない

**原因:**

- `published: false` が設定されている
- フロントマターの形式が正しくない
- ファイルが`posts/`ディレクトリにない

**解決策:**

1. Markdownファイルのフロントマターを確認
2. `published: true`（または未設定）であることを確認
3. 開発サーバーを再起動

#### ビルドエラー

**原因:**

- Markdownファイルの構文エラー
- 型エラー
- 依存関係の問題

**解決策:**

1. エラーメッセージを確認
2. TypeScript型チェック: `npx tsc --noEmit`
3. 依存関係の再インストール: `rm -rf node_modules package-lock.json && npm install`

#### テスト失敗

**原因:**

- コードの変更により既存の動作が変わった
- モックの不整合
- 環境依存の問題

**解決策:**

1. 失敗したテストケースを確認
2. テストのアサーションを更新（正しい変更の場合）
3. コードを修正（バグの場合）

#### ダークモードが動作しない

**原因:**

- localStorage が利用できない環境
- `DarkModeProvider` がコンポーネントツリーに含まれていない

**解決策:**

1. ブラウザの開発者ツールでエラーを確認
2. `layout.tsx`で`DarkModeProvider`が正しく配置されているか確認

## 付録

### 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [unified Documentation](https://unifiedjs.com)

### 用語集

- **SSG (Static Site Generation)**: 静的サイト生成。ビルド時にHTMLを生成する手法
- **App Router**: Next.js 13+の新しいルーティングシステム
- **slug**: URLに使用される記事の識別子（例: `my-first-post`）
- **フロントマター**: Markdownファイル冒頭のYAML形式のメタデータ
- **AST (Abstract Syntax Tree)**: 抽象構文木。コードを木構造で表現したもの
- **サニタイズ**: XSS攻撃対策のため、危険なHTMLタグやスクリプトを除去すること

### バージョン履歴

このドキュメントは、プロジェクトのバージョン 0.3.0 時点の情報に基づいています。

最新の変更履歴は `CHANGELOG.md` を参照してください。

---

**最終更新日**: 2026-02-14
**ドキュメントバージョン**: 1.0.0
