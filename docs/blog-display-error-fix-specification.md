# ブログ記事表示エラー解消仕様書

## 1. 問題の概要

### 1.1 発生している問題
ブログ記事詳細ページ（`/blog/[slug]`）にアクセスすると、以下のエラーが発生する：

**本番環境:**
```
404 This page could not be found.
```

**開発環境:**
```
Route "/blog/[slug]" used `params.slug`. `params` is a Promise and must be unwrapped 
with `await` or `React.use()` before accessing its properties. 
Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
```

### 1.2 エラーの原因
Next.js 15以降では、Dynamic Route の `params` プロパティが Promise になり、使用する前に `await` または `React.use()` で展開する必要がある。

現在のコード（`src/app/blog/[slug]/page.tsx`）では、`params` を直接使用しているため、エラーが発生している。

## 2. 技術的な背景

### 2.1 Next.js 15の変更点
Next.js 15では、パフォーマンスと型安全性の向上のため、以下のAPIが非同期（Promise）に変更された：

- `params` (Dynamic Route のパラメータ)
- `searchParams` (URL検索パラメータ)
- `cookies()`
- `headers()`
- `draftMode()`

これらは使用前に `await` する必要がある。

### 2.2 影響を受ける箇所
本プロジェクトでは、以下の関数が影響を受ける：

1. **`generateStaticParams()`**: 静的パスの生成（ビルド時）
   - この関数は `params` を使用しないため影響なし

2. **`generateMetadata({ params })`**: メタデータの生成
   - `params.slug` を直接参照している
   - → `await params` が必要

3. **`BlogPost({ params })`**: ページコンポーネント
   - `params.slug` を直接参照している
   - → `await params` が必要

## 3. 解決策

### 3.1 修正方針
影響を受ける関数のシグネチャと実装を、Next.js 15の仕様に合わせて修正する。

### 3.2 具体的な修正内容

#### 3.2.1 `generateMetadata` 関数の修正

**修正前:**
```typescript
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;
  const post = getPostBySlug(slug);
  // ...
}
```

**修正後:**
```typescript
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;  // await を追加
  const post = getPostBySlug(slug);
  // ...
}
```

#### 3.2.2 `BlogPost` コンポーネントの修正

**修正前:**
```typescript
export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = getPostBySlug(slug);
  // ...
}
```

**修正後:**
```typescript
export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;  // await を追加
  const post = getPostBySlug(slug);
  // ...
}
```

### 3.3 型定義の考慮事項

Next.js 15では、`params` の型は以下のように定義される：
```typescript
interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}
```

現在のコードでは Promise として型定義されていないが、Next.js のフレームワーク側で自動的に処理されるため、型定義の変更は不要。

## 4. テスト計画

### 4.1 開発環境でのテスト
1. `npm run dev` で開発サーバーを起動
2. ブログ一覧ページ (`/blog`) にアクセス
3. 各記事のリンクをクリックして記事詳細ページにアクセス
4. エラーが発生せず、記事内容が正しく表示されることを確認

### 4.2 ビルドテスト
1. `npm run build` でプロダクションビルドを実行
2. ビルドが成功することを確認
3. 静的生成されたページが正常に生成されていることを確認

### 4.3 確認項目
- [ ] `/blog/nextjs-blog-tutorial` にアクセスできる
- [ ] `/blog/typescript-type-system` にアクセスできる
- [ ] `/blog/tailwind-css-modern-ui` にアクセスできる
- [ ] 各ページで記事のタイトル、日付、著者、タグ、本文が正しく表示される
- [ ] マークダウンがHTMLに正しく変換されている
- [ ] シンタックスハイライトが動作している
- [ ] 404エラーが発生しない

## 5. リスクと対策

### 5.1 潜在的なリスク
1. **他の動的ルートへの影響**: 他のページでも `params` を使用している場合、同様の修正が必要
2. **型エラー**: TypeScript の型チェックでエラーが出る可能性

### 5.2 対策
1. プロジェクト全体を `grep` で検索し、`params.` の使用箇所を確認
2. ビルド時に TypeScript の型チェックを実行して問題を早期発見
3. テストカバレッジを確認し、未テストの箇所がないか確認

## 6. 実装スケジュール

1. **仕様書作成**: 完了
2. **コード修正**: 約10分
3. **テスト**: 約15分
4. **レビュー**: 約10分

合計所要時間: 約35分

## 7. 参考資料

- [Next.js 15 Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Async Request APIs](https://nextjs.org/docs/messages/sync-dynamic-apis)

## 8. 補足

### 8.1 rehype-sanitize について
エラーメッセージには `rehype-sanitize` モジュールが見つからないというエラーも含まれているが、これは `npm install` を実行していないことが原因。

`package.json` には `rehype-sanitize: ^6.0.0` が依存関係として記載されており、`npm install` を実行すれば解決する。

### 8.2 ファイル末尾の改行について
修正対象ファイルの末尾に改行がない場合は、改行を追加する。これはコーディング規約に従うためである。
