# 変更履歴

このファイルは、このプロジェクトの重要な変更をすべて記録します。

このフォーマットは[Keep a Changelog](https://keepachangelog.com/ja/1.0.0/)に基づいており、
このプロジェクトは[セマンティック バージョニング](https://semver.org/lang/ja/)に準拠しています。

## [Unreleased]

## [0.5.0] - 2026-02-16

### 変更

- ブログ記事のデザインを全面的に刷新
    - 見出し（H1〜H6）の階層的なスタイリング強化
        - H1: より大きく太字で目立つデザイン（text-4xl, font-extrabold）
        - H2: 下線を追加してセクション区切りを明確化
        - H3〜H6: サイズと太さを段階的に調整し視覚的階層を改善
    - テーブルのデザイン改善
        - ストライプ表示（偶数行の背景色を変更）
        - ホバー時の視覚的フィードバック追加
        - 角の丸め処理とシャドウ効果
        - ヘッダーの背景色を強調
    - コードブロックのスタイリング強化
        - インラインコード: ボーダー追加、パディング調整
        - ブロックコード: より濃い背景色、シャドウ効果、より良いコントラスト
    - リストの視覚的改善
        - マーカー色をアクセントカラー（青色）に変更
        - 項目間のスペーシング改善
        - 順序付きリストのマーカーを太字化
    - リンクのインタラクション改善
        - 下線の常時表示
        - ホバー時の色変化にトランジション効果追加
        - より目立つ装飾スタイル
    - 引用ブロックのビジュアル強化
        - 背景色の追加
        - 左ボーダーを太く（4px）
        - 角の丸め処理
        - イタリック体の適用
    - 段落テキストの可読性向上
        - 行間（leading）の最適化
        - より適切な余白設定
    - ダークモード対応の最適化
        - 全要素でコントラストを改善
        - より見やすい配色に調整

### 削除

- ブログ記事デザイン刷新仕様書（`docs/blog-design-specification.md`）を削除

## [0.4.0] - 2026-02-16

### 追加

- Markdownの表示機能を大幅に拡張
    - GitHub Flavored Markdown（GFM）のサポート（テーブル、タスクリストなど）
    - 見出しへの自動アンカーリンク機能（ページ内ナビゲーションが容易に）
    - 外部リンクの安全な処理（`target="_blank"`と`rel="noopener noreferrer"`を自動付与）
    - テーブル表示のスタイリング（ライト/ダークモード対応）
- 新しいパッケージの追加
    - `remark-gfm`: GitHub Flavored Markdown対応
    - `rehype-slug`: 見出しにID属性を追加
    - `rehype-autolink-headings`: 見出しに自動リンクを追加
    - `rehype-external-links`: 外部リンクの安全な処理

### 変更

- `rehype-sanitize`の設定をカスタマイズし、外部リンクの`target`と`rel`属性を許可

### セキュリティ

- 外部リンクに`rel="noopener noreferrer"`を自動付与し、セキュリティリスクを低減

### 削除

- ブログ記事の見た目改善仕様書（`docs/blog-appearance-improvement-spec.md`）を削除

## [0.3.0] - 2026-02-14

### 削除

- ホーム画面（`/`）を削除し、ブログ記事一覧を直接表示するように変更
    - ウェルカムページを削除
    - `/`がブログ記事一覧を表示するように変更
    - `/blog`は`/`にリダイレクトするように変更（後方互換性のため）
- ヘッダーナビゲーションの「ホーム」と「ブログ」リンクを削除
    - よりシンプルなナビゲーションに変更
    - ロゴクリックで`/`に戻る機能は維持
- ホーム画面削除の仕様書（`docs/home-screen-removal-specification.md`）を削除

### 理由

- ユーザビリティの向上：余計なクリックを減らし、ユーザーがすぐにブログコンテンツにアクセスできるようにする
- シンプル化：ブログアプリケーションとして、ホーム画面は冗長であり、直接記事一覧を表示する方が自然
- 保守性の向上：管理するページ数を減らすことでメンテナンスが容易になる

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

[unreleased]: https://github.com/TakuyaFukumura/blog-next-js-app/compare/v0.5.0...HEAD

[0.5.0]: https://github.com/TakuyaFukumura/blog-next-js-app/compare/v0.4.0...v0.5.0

[0.4.0]: https://github.com/TakuyaFukumura/blog-next-js-app/compare/v0.3.0...v0.4.0

[0.3.0]: https://github.com/TakuyaFukumura/blog-next-js-app/compare/v0.2.1...v0.3.0

[0.2.1]: https://github.com/TakuyaFukumura/blog-next-js-app/compare/v0.2.0...v0.2.1

[0.2.0]: https://github.com/TakuyaFukumura/blog-next-js-app/compare/v0.1.0...v0.2.0

[0.1.0]: https://github.com/TakuyaFukumura/blog-next-js-app/compare/v0.1.0^...v0.1.0


