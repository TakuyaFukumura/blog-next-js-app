# ブログ記事表示アプリ 実装計画書

## 1. 実装フェーズ概要

本ドキュメントは、Markdown形式で書かれたファイルをブログ記事として表示するアプリケーションの実装計画を定義します。

## 2. 実装の優先順位

### Phase 1: 基本機能実装（必須）
1. Markdownファイル管理基盤の構築
2. 記事詳細ページの実装
3. 記事一覧ページの実装

### Phase 2: ユーザビリティ向上（推奨）
4. 検索・フィルタリング機能
5. レスポンシブデザイン最適化
6. パフォーマンス最適化

### Phase 3: 高度な機能（オプション）
7. 関連記事表示
8. RSSフィード
9. その他の拡張機能

## 3. Phase 1: 基本機能実装

### 3.1 Markdownファイル管理基盤の構築

#### 3.1.1 タスク

1. **postsディレクトリの作成**
   - プロジェクトルートに`posts/`ディレクトリを作成
   - サンプルのMarkdownファイルを2-3個作成

2. **型定義の作成**
   - `types/post.ts`を作成
   - `Post`インターフェースを定義

3. **依存パッケージのインストール**
   ```bash
   npm install gray-matter remark remark-html remark-prism
   ```

4. **Markdown処理ユーティリティの実装**
   - `lib/posts.ts`を作成
   - 以下の関数を実装：
     - `getAllPosts()`: すべての記事を取得
     - `getPostBySlug(slug)`: 特定の記事を取得
     - `getPostSlugs()`: 全記事のslugを取得
   
5. **Markdown変換ユーティリティの実装**
   - `lib/markdown.ts`を作成
   - `markdownToHtml()`関数を実装
   - シンタックスハイライト設定

#### 3.1.2 実装の詳細

**`types/post.ts`**
```typescript
export interface PostMetadata {
  title: string;
  date: string;
  author: string;
  tags: string[];
  description: string;
  image?: string;
  published: boolean;
}

export interface Post extends PostMetadata {
  slug: string;
  content: string;
}

export interface PostPreview extends PostMetadata {
  slug: string;
}
```

**`lib/posts.ts`の主要ロジック**
- `fs`モジュールで`posts/`ディレクトリを読み取り
- `gray-matter`でYAML Front Matterを解析
- ファイル名からslugを生成（例: `2024-01-15-first-post.md` → `first-post`）
- `published: true`の記事のみ返す
- 日付の降順でソート

**`lib/markdown.ts`の主要ロジック**
- `remark`と`remark-html`でMarkdownをHTMLに変換
- 目次生成のためのヘッダー抽出
- セキュリティのためのサニタイゼーション

#### 3.1.3 テスト項目

- [ ] Markdownファイルを正常に読み込めること
- [ ] フロントマターを正しく解析できること
- [ ] slugが正しく生成されること
- [ ] 非公開記事（`published: false`）が除外されること
- [ ] Markdownが正しくHTMLに変換されること

#### 3.1.4 所要時間見積もり

- 実装: 4-6時間
- テスト: 2-3時間

---

### 3.2 記事詳細ページの実装

#### 3.2.1 タスク

1. **動的ルートの作成**
   - `src/app/blog/[slug]/page.tsx`を作成
   - `generateStaticParams()`を実装（SSG用）

2. **記事詳細コンポーネントの実装**
   - 記事のメタデータ表示部分
   - Markdown本文の表示
   - タグ表示
   - 公開日・著者情報表示

3. **Markdownコンテンツコンポーネントの作成**
   - `src/app/components/MarkdownContent.tsx`
   - HTML出力の安全な表示
   - カスタムスタイル適用

4. **目次コンポーネントの作成**
   - `src/app/components/TableOfContents.tsx`
   - 見出しからTOCを自動生成
   - クリックでスムーススクロール

5. **スタイリング**
   - Tailwind CSSでレスポンシブデザイン実装
   - コードブロックのスタイリング
   - タイポグラフィの最適化

#### 3.2.2 実装の詳細

**`src/app/blog/[slug]/page.tsx`の構造**
```typescript
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.description,
    // OGPタグなど
  };
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  const htmlContent = await markdownToHtml(post.content);
  
  return (
    <article>
      <header>
        {/* タイトル、メタデータ */}
      </header>
      <aside>
        {/* 目次 */}
      </aside>
      <main>
        <MarkdownContent content={htmlContent} />
      </main>
    </article>
  );
}
```

**レイアウト設計**
- デスクトップ: サイドバー（目次）+ メインコンテンツ
- モバイル: 縦積みレイアウト、目次は折りたたみ可能

#### 3.2.3 テスト項目

- [ ] 正しい記事が表示されること
- [ ] 存在しないslugで404エラーが返されること
- [ ] Markdownが正しくレンダリングされること
- [ ] メタタグが正しく設定されること
- [ ] レスポンシブデザインが機能すること

#### 3.2.4 所要時間見積もり

- 実装: 6-8時間
- テスト: 3-4時間

---

### 3.3 記事一覧ページの実装

#### 3.3.1 タスク

1. **一覧ページの作成**
   - `src/app/blog/page.tsx`を作成

2. **記事カードコンポーネントの作成**
   - `src/app/components/BlogCard.tsx`
   - タイトル、概要、日付、タグを表示
   - 記事詳細へのリンク

3. **記事一覧コンポーネントの作成**
   - `src/app/components/BlogList.tsx`
   - グリッドレイアウト
   - ソート機能

4. **ページネーション機能**
   - 1ページあたりの記事数制限（例: 10件）
   - ページ番号表示
   - 前へ/次へボタン

5. **スタイリング**
   - カードデザイン
   - ホバーエフェクト
   - レスポンシブグリッド

#### 3.3.2 実装の詳細

**`src/app/blog/page.tsx`の構造**
```typescript
export default async function BlogIndex({ searchParams }) {
  const page = parseInt(searchParams.page || '1');
  const perPage = 10;
  
  const allPosts = await getAllPosts();
  const totalPages = Math.ceil(allPosts.length / perPage);
  const posts = allPosts.slice((page - 1) * perPage, page * perPage);
  
  return (
    <div>
      <h1>ブログ記事一覧</h1>
      <BlogList posts={posts} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
```

**`BlogCard.tsx`のデザイン**
- サムネイル画像（ある場合）
- タイトル（H2）
- 投稿日・著者情報
- 記事概要（2-3行で切り捨て）
- タグバッジ
- 「続きを読む」リンク

#### 3.3.3 テスト項目

- [ ] 全記事が一覧表示されること
- [ ] 記事が日付順（降順）で並んでいること
- [ ] ページネーションが正しく動作すること
- [ ] 記事カードのリンクが正しいこと
- [ ] レスポンシブグリッドが機能すること

#### 3.3.4 所要時間見積もり

- 実装: 5-7時間
- テスト: 2-3時間

---

## 4. Phase 2: ユーザビリティ向上

### 4.1 検索・フィルタリング機能

#### 4.1.1 タスク

1. **検索バーコンポーネントの作成**
   - `src/app/components/SearchBar.tsx`
   - テキスト入力フィールド
   - 検索ボタン

2. **タグフィルターコンポーネントの作成**
   - `src/app/components/TagFilter.tsx`
   - 全タグの一覧表示
   - クリックで絞り込み

3. **検索ロジックの実装**
   - `lib/posts.ts`に`searchPosts()`関数を追加
   - タイトル・本文での全文検索
   - タグによるフィルタリング

4. **クライアントサイド検索の実装**
   - useState/useEffectで検索状態管理
   - リアルタイム検索（デバウンス処理）

#### 4.1.2 所要時間見積もり

- 実装: 4-6時間
- テスト: 2-3時間

---

### 4.2 レスポンシブデザイン最適化

#### 4.2.1 タスク

1. **ブレークポイントの定義**
   - Tailwind configで統一的なブレークポイント設定

2. **モバイルナビゲーションの実装**
   - ハンバーガーメニュー
   - スライドアウトメニュー

3. **画像の最適化**
   - Next.js Imageコンポーネントの使用
   - レスポンシブ画像の設定

4. **フォントサイズの調整**
   - 各デバイスで読みやすいサイズに調整

#### 4.2.2 所要時間見積もり

- 実装: 3-5時間
- テスト: 2-3時間

---

### 4.3 パフォーマンス最適化

#### 4.3.1 タスク

1. **ISRの設定**
   - `revalidate`オプションの設定
   - 適切なキャッシュ戦略

2. **遅延読み込みの実装**
   - 画像の遅延読み込み
   - コンポーネントの動的インポート

3. **バンドルサイズの最適化**
   - 不要な依存関係の削除
   - Tree shakingの確認

4. **Lighthouseでのパフォーマンステスト**
   - スコア90以上を目標

#### 4.3.2 所要時間見積もり

- 実装: 3-4時間
- テスト: 2-3時間

---

## 5. Phase 3: 高度な機能（オプション）

### 5.1 関連記事表示

- タグの類似度に基づいた関連記事の抽出
- 記事詳細ページ下部に表示
- 所要時間: 2-3時間

### 5.2 RSSフィード

- `src/app/feed.xml/route.ts`の作成
- RSS 2.0形式での出力
- 所要時間: 2-3時間

### 5.3 ダークモード対応

- 既存のDarkModeProviderとの統合
- 記事コンテンツのダークモード対応
- 所要時間: 2-3時間

---

## 6. 実装スケジュール（例）

| フェーズ | タスク | 期間 |
|---------|-------|------|
| Phase 1 | Markdown管理基盤 | 1-2日 |
| Phase 1 | 記事詳細ページ | 2-3日 |
| Phase 1 | 記事一覧ページ | 1-2日 |
| Phase 2 | 検索・フィルター | 1-2日 |
| Phase 2 | レスポンシブ最適化 | 1日 |
| Phase 2 | パフォーマンス最適化 | 1日 |
| Phase 3 | 拡張機能 | 1-2日 |
| **合計** | | **8-13日** |

※ 1日 = 実作業6-8時間を想定

---

## 7. 技術的考慮事項

### 7.1 ファイル命名規則

Markdownファイルの命名規則を統一：
```
YYYY-MM-DD-kebab-case-title.md
例: 2024-01-15-nextjs-blog-tutorial.md
```

### 7.2 エラーハンドリング

- 記事が見つからない場合: 404ページ表示
- Markdown解析エラー: エラーメッセージを表示してフォールバック
- ファイル読み込みエラー: ログ出力と適切なエラー処理

### 7.3 SEO対策

- 適切なメタタグの設定
- OGP（Open Graph Protocol）対応
- 構造化データ（JSON-LD）の追加
- sitemap.xmlの自動生成

### 7.4 アクセシビリティ

- セマンティックHTML要素の使用
- ARIA属性の適切な設定
- キーボードナビゲーション対応
- コントラスト比の確保

---

## 8. テスト戦略

### 8.1 ユニットテスト

- `lib/posts.ts`の各関数
- `lib/markdown.ts`の変換関数
- Jest + TypeScriptで実装

### 8.2 統合テスト

- React Testing Libraryでコンポーネントテスト
- 記事一覧・詳細ページのレンダリング
- 検索・フィルター機能

### 8.3 E2Eテスト（オプション）

- Playwrightを使用
- 主要なユーザーフロー
  - トップページから記事詳細への遷移
  - 検索機能の使用
  - ページネーション

---

## 9. デプロイ前チェックリスト

- [ ] すべてのテストが通過
- [ ] Lighthouseスコア: Performance 90+, Accessibility 90+
- [ ] クロスブラウザテスト（Chrome, Firefox, Safari, Edge）
- [ ] モバイルデバイステスト
- [ ] SEOメタタグの確認
- [ ] 404ページの動作確認
- [ ] エラーハンドリングの確認
- [ ] ビルドエラーがないこと
- [ ] 環境変数の設定確認

---

## 10. 保守・運用計画

### 10.1 記事の追加手順

1. `posts/`ディレクトリに新しいMarkdownファイルを作成
2. Front Matterに必要な情報を記入
3. 記事本文を執筆
4. GitHubにコミット・プッシュ
5. Vercelが自動デプロイ（ISRにより即座に反映）

### 10.2 定期メンテナンス

- 依存パッケージの更新（月次）
- セキュリティパッチの適用
- パフォーマンスモニタリング
- ログの確認

### 10.3 今後の改善候補

- CMS統合（例: Contentful, Sanity）
- フルテキスト検索エンジン（Algolia, MeiliSearch）
- コメントシステム（Disqus, Utterances）
- アナリティクス統合（Google Analytics, Vercel Analytics）
- A/Bテスト機能

---

## 11. 参考リソース

- [Next.js Documentation](https://nextjs.org/docs)
- [Gray Matter](https://github.com/jonschlinkert/gray-matter)
- [Remark](https://github.com/remarkjs/remark)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Next.js Blog Starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)
