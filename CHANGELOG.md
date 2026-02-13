# 変更履歴

このファイルは、このプロジェクトの重要な変更をすべて記録します。

このフォーマットは[Keep a Changelog](https://keepachangelog.com/ja/1.0.0/)に基づいており、
このプロジェクトは[セマンティック バージョニング](https://semver.org/lang/ja/)に準拠しています。

## [Unreleased]

### 追加

- CHANGELOG.mdを導入

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

[unreleased]: https://github.com/TakuyaFukumura/blog-next-js-app/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/TakuyaFukumura/blog-next-js-app/releases/tag/v0.1.0
