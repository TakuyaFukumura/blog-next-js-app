# 変更履歴

このファイルは、このプロジェクトの重要な変更をすべて記録します。

このフォーマットは[Keep a Changelog](https://keepachangelog.com/ja/1.0.0/)に基づいており、
このプロジェクトは[セマンティック バージョニング](https://semver.org/lang/ja/)に準拠しています。

## [Unreleased]


## [0.2.1] - 2026-02-14

### 修正

- ブログ記事の表示の不具合を修正

### 変更

- READMEをv0.2.0の実装に合わせて更新
  - SQLiteデータベース関連の記述を削除
  - Markdownベースのブログ機能の説明を追加
  - プロジェクト構造を最新の状態に更新
  - テスト構成の説明を更新
  - トラブルシューティングセクションを更新


## [0.2.0] - 2026-02-13

### 追加

- Markdownファイルベースのブログ表示機能
  - ブログ記事一覧ページ（`/blog`）
  - ブログ記事詳細ページ（`/blog/[slug]`）
  - Markdown → HTML変換（unified、remark、rehype）
  - シンタックスハイライト対応（rehype-prism-plus）
  - フロントマター解析（gray-matter）
  - 記事検索ユーティリティ（タイトル、説明、タグによる検索機能）
  - ブログコンポーネント（BlogCard、BlogList、MarkdownContent）
  - 記事メタデータ管理（タイトル、日付、著者、タグ、説明、公開フラグ）
  - レスポンシブデザイン対応
  - Tailwind Typography plugin
  - 静的サイト生成（SSG）によるパフォーマンス最適化
  - サンプルブログ記事3件
  - ブログ機能のユニットテスト

### 変更

- ホームページをブログアプリケーション用に刷新
- ヘッダーにナビゲーションリンクを追加（ホーム、ブログ）
- アプリケーションメタデータの更新

### 削除

- SQLiteデータベース機能（better-sqlite3）
- データベースAPIエンドポイント（`/api/message`）
- データベース関連のテストとファイル
- 実装仕様書（docsディレクトリ）

## [0.1.0] - 2026-02-13

### 追加

- Next.js 16.1.6を使用したブログアプリケーションの初期セットアップ
- React 19.2.4による基本的なUIコンポーネント
- TypeScript対応
- Tailwind CSS 4によるスタイリング
- SQLite（better-sqlite3）によるデータベース統合
- APIエンドポイント（`/api/message`）の実装
- ダークモード対応
  - DarkModeProviderコンポーネント
  - システム設定の自動検出
  - ローカルストレージによる設定の永続化
- ヘッダーコンポーネント
- Jestを使用したテスト環境
  - データベーステスト
  - Reactコンポーネントテスト
  - テストカバレッジレポート
- ESLintによるコード品質管理
- GitHub Actions CI/CD
  - 自動テスト実行
  - 静的解析
  - TypeScript型チェック
  - ビルド検証
- Dependabotによる依存関係の自動更新
- 包括的な日本語ドキュメント（README.md）

### セキュリティ

- better-sqlite3による安全なデータベース操作

[unreleased]: https://github.com/TakuyaFukumura/blog-next-js-app/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/TakuyaFukumura/blog-next-js-app/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/TakuyaFukumura/blog-next-js-app/compare/v0.1.0^...v0.1.0
