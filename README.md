# blog-next-js-app

Next.jsを使ったMarkdownベースのブログアプリケーションです。

## 技術スタック

- **Next.js 16.1.6** - React フレームワーク（App Routerを使用）
- **React 19.2.4** - ユーザーインターフェース構築
- **TypeScript** - 型安全性
- **Tailwind CSS 4** - スタイリング
- **Markdown処理** - unified、remark、rehypeによるMarkdown変換
- **シンタックスハイライト** - rehype-prism-plusによるコードハイライト
- **gray-matter** - Markdownフロントマター解析
- **ESLint** - コード品質管理

## 始め方

### 前提条件

- Node.js 20.x以上
- npm、yarn、またはpnpm

### インストール

1. リポジトリをクローン：
    ```bash
    git clone https://github.com/TakuyaFukumura/blog-next-js-app.git
    ```
    ```bash
    cd blog-next-js-app
    ```

2. 依存関係をインストール：
    ```bash
    npm install
    ```
   または
    ```bash
    yarn install
    ```
   または
    ```bash
    pnpm install
    ```

### 開発サーバーの起動

```bash
npm run dev
```

または

```bash
yarn dev
```

または

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて
アプリケーションを確認してください。

### ビルドと本番デプロイ

本番用にアプリケーションをビルドする：

```bash
npm run build
```

```bash
npm start
```

または

```bash
yarn build
```

```bash
yarn start
```

または

```bash
pnpm build
```

```bash
pnpm start
```

## プロジェクト構造

```
├── posts/                   # Markdownブログ記事
│   ├── 2024-01-15-nextjs-blog-tutorial.md
│   ├── 2024-02-20-typescript-type-system.md
│   └── 2024-03-10-tailwind-css-modern-ui.md
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx  # ブログ記事詳細ページ
│   │   │   └── page.tsx      # ブログ記事一覧ページ
│   │   ├── components/       # Reactコンポーネント
│   │   │   ├── BlogCard.tsx  # ブログカードコンポーネント
│   │   │   ├── BlogList.tsx  # ブログリストコンポーネント
│   │   │   ├── DarkModeProvider.tsx  # ダークモードProvider
│   │   │   ├── Header.tsx    # ヘッダーコンポーネント
│   │   │   └── MarkdownContent.tsx   # Markdownコンテンツレンダー
│   │   ├── globals.css       # グローバルスタイル
│   │   ├── layout.tsx        # アプリケーションレイアウト
│   │   └── page.tsx          # ホームページ
│   ├── lib/
│   │   ├── markdown.ts       # Markdown処理ユーティリティ
│   │   └── posts.ts          # ブログ記事取得ユーティリティ
│   └── types/                # TypeScript型定義
├── __tests__/                # テストファイル
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 機能

### ブログ機能

- **記事一覧ページ** (`/blog`): すべてのブログ記事を一覧表示
- **記事詳細ページ** (`/blog/[slug]`): 個別の記事を表示
- **Markdown対応**: Markdownファイルから記事を自動生成
- **フロントマター**: 記事メタデータ（タイトル、日付、著者、タグ、説明）の管理
- **シンタックスハイライト**: コードブロックの自動ハイライト
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **静的サイト生成（SSG）**: ビルド時に記事を事前レンダリング
- **ダークモード**: システム設定に基づく自動切り替え

### 記事の追加方法

1. `posts/` ディレクトリに新しいMarkdownファイルを作成（ファイル名は `YYYY-MM-DD-slug.md` 形式を推奨）
2. フロントマターを記述：

```markdown
---
title: "記事のタイトル"
date: "2024-01-15"
author: "著者名"
tags: ["タグ1", "タグ2"]
description: "記事の説明"
published: true
---

# 記事の内容

ここに記事の本文を書きます。
```

3. 開発サーバーを再起動して変更を確認

## カスタマイズ

### スタイルの変更

スタイルは Tailwind CSS を使用しています。
各コンポーネントファイル内のクラス名を変更することで、外観をカスタマイズできます。

### Markdown処理のカスタマイズ

`src/lib/markdown.ts` ファイルで、Markdownの処理方法をカスタマイズできます。
rehypeやremarkのプラグインを追加することで、機能を拡張できます。

## 開発

### テスト

このプロジェクトはJestを使用したテストが設定されています。

#### テストの実行

```bash
npm test
```

または

```bash
yarn test
```

または

```bash
pnpm test
```

#### テストの監視モード

```bash
npm run test:watch
```

#### カバレッジレポートの生成

```bash
npm run test:coverage
```

#### テストファイルの構成

- `__tests__/src/lib/posts.test.ts`: ブログ記事取得機能のテスト
- `__tests__/src/lib/markdown-integration.test.ts`: Markdown処理の統合テスト
- `__tests__/src/app/components/`: コンポーネントのテスト
  - `DarkModeProvider.test.tsx`: ダークモードProviderのテスト
  - `Header.test.tsx`: ヘッダーコンポーネントのテスト

#### テストの特徴

- **ブログ機能テスト**: Markdown記事の読み込み、解析、表示のテスト
- **Reactコンポーネントテスト**: React Testing Library を使用したコンポーネントのレンダリングとインタラクションのテスト
- **モッキング**: localStorage や外部依存関係のモック
- **カバレッジ**: コードカバレッジの測定と報告

### リンティング

```bash
npm run lint
```

または

```bash
yarn lint
```

または

```bash
pnpm lint
```

### 型チェック

TypeScriptの型チェックは、ビルド時またはIDEで自動的に実行されます。

## CI/CD

このプロジェクトはGitHub Actionsを使用した継続的インテグレーション（CI）を設定しています。

### 自動テスト

以下の条件でCIが実行されます：
- `main`ブランチへのプッシュ時
- プルリクエストの作成・更新時

CIでは以下のチェックが行われます：
- ESLintによる静的解析
- TypeScriptの型チェック
- Jestを使用したユニットテストとインテグレーションテスト
- アプリケーションのビルド検証
- Node.js 20.x での動作確認

## 自動依存関係更新（Dependabot）

このプロジェクトでは、依存関係の安全性と最新化のために[Dependabot](https://docs.github.com/ja/code-security/dependabot)を利用しています。

- GitHub Actionsおよびnpmパッケージの依存関係は**月次（月曜日 09:00 JST）**で自動チェック・更新されます。
- 更新内容は自動でプルリクエストとして作成されます。
- 詳細な設定は `.github/dependabot.yml` を参照してください。

## トラブルシューティング

### ビルドエラー

- Markdownファイルのフロントマターが正しい形式かチェックしてください
- 記事を非表示にしたい場合は、フロントマターに `published: false` を設定してください（未指定の場合は表示されます）

### 記事が表示されない

- `posts/` ディレクトリにMarkdownファイルが配置されているか確認してください
- ファイルのフロントマターに `published: false` が設定されていないか確認してください（`published: false` の記事は非表示になります）
- 開発サーバーを再起動してみてください

### ポート競合

デフォルトのポート3000が使用中の場合：

```bash
npm run dev -- --port 3001
```
