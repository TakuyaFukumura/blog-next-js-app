# ブログ記事デザイン刷新仕様書

## 1. 概要

本仕様書は、ブログ記事本文のデザイン刷新に向けた詳細な設計方針と実装ガイドラインを定義します。

### 1.1 目的

- ブログ記事の読みやすさを向上させる
- 優れたデザイン原則に基づいた視覚的に魅力的な記事レイアウトを実現する
- 各要素（見出し、テーブル、コードブロック、リスト等）の一貫性と可読性を確保する
- ダークモード/ライトモードの両方で最適な視覚体験を提供する

### 1.2 対象範囲

以下のMarkdown要素のデザイン刷新を対象とします：

- 見出し（H1〜H6）
- 段落テキスト
- リスト（順序付き・順序なし）
- テーブル
- コードブロック（インラインコード・ブロックコード）
- 引用ブロック
- リンク
- 強調表示（太字・斜体）

## 2. 現状分析

### 2.1 実装の現状

現在の実装は以下の構成で動作しています：

- **フレームワーク**: Next.js (App Router)
- **スタイリング**: Tailwind CSS + @tailwindcss/typography (prose)
- **Markdown処理**: unified + remark-gfm + rehype系プラグイン
- **シンタックスハイライト**: Prism.js (globals.cssでカスタマイズ)
- **ダークモード**: Tailwind CSSのdarkモード（classベース）

### 2.2 スタイリングの仕組み

Markdownファイルから変換されるHTMLは、クラス名やID属性を持たない**プレーンなHTMLタグ**（`<h1>`, `<p>`, `<table>`, `<code>`など）で構成されます。

そのため、デザインの適用は以下の方法で行います：

1. **Tailwind Typography (prose)の活用**:
   - `MarkdownContent`コンポーネントのルート要素に`prose`クラスを適用
   - `prose-{element}:{utility}`の形式でHTMLタグに対してスタイルを適用
   - 例: `prose-h1:text-4xl` → すべての`<h1>`タグに適用
   - 例: `prose-a:hover:text-blue-700` → すべての`<a>`タグのホバー時に適用

2. **実装箇所**:
   - `src/app/components/MarkdownContent.tsx`のクラス名として定義
   - ルート要素の`className`属性にTailwindユーティリティクラスを列挙

3. **制約事項**:
   - 個別の要素にクラス名を付与できないため、すべての同種タグに一律適用される
   - 特定の要素だけにスタイルを適用したい場合は、rehypeプラグインでクラス追加が必要

### 2.3 現在のスタイル分析

**MarkdownContent.tsx**で以下の要素が定義されています：

- 見出し: `prose-headings:font-bold`
- パラグラフ: `prose-p:text-gray-700 dark:prose-p:text-gray-300`
- リンク: `prose-a:text-blue-600 dark:prose-a:text-blue-400`
- インラインコード: ピンク系の配色、背景色付き
- コードブロック: 灰色背景、ボーダー付き
- テーブル: ボーダー2px、灰色配色
- 引用: 青系配色、左ボーダー

### 2.4 課題

1. **視覚階層の不明瞭さ**: 見出しレベル間の区別が弱い
2. **余白の一貫性**: 要素間の余白（margin/padding）が統一されていない
3. **テーブルの可読性**: 行の区別がつきにくい（ストライプ未実装）
4. **コードブロックの見た目**: モダンなデザインと比較してシンプルすぎる
5. **リストのスタイリング**: マーカーのスタイルが目立たない

## 3. デザイン原則

### 3.1 基本方針

1. **タイポグラフィ優先**: テキストの可読性を最優先
2. **視覚的階層**: 要素の重要度を明確に
3. **十分な余白**: 読みやすさのための適切なスペーシング
4. **一貫性**: 全ての要素で統一されたデザイン言語
5. **アクセシビリティ**: 色のコントラスト比（WCAG 2.1 AA基準）を確保
6. **レスポンシブ**: モバイル〜デスクトップまで最適化

### 3.2 カラーシステム

#### ライトモード
- **背景**: 白 (#ffffff)
- **本文テキスト**: 濃灰色 (#1a202c, #2d3748)
- **見出し**: ほぼ黒 (#111827)
- **アクセント**: 青系 (#3b82f6, #2563eb)
- **コード背景**: 薄灰色 (#f3f4f6, #e5e7eb)
- **ボーダー**: 中間灰色 (#d1d5db, #9ca3af)

#### ダークモード
- **背景**: 濃い灰色 (#1f2937, #111827)
- **本文テキスト**: 薄灰色 (#d1d5db, #e5e7eb)
- **見出し**: 白 (#f9fafb, #ffffff)
- **アクセント**: 明るい青系 (#60a5fa, #93c5fd)
- **コード背景**: より濃い灰色 (#0f172a, #1e293b)
- **ボーダー**: 中間灰色 (#374151, #4b5563)

### 3.3 タイポグラフィスケール

```
H1: 2.25rem (36px) - font-extrabold - line-height: 1.2 - mb-6
H2: 1.875rem (30px) - font-bold - line-height: 1.3 - mt-12 mb-4
H3: 1.5rem (24px) - font-bold - line-height: 1.4 - mt-8 mb-3
H4: 1.25rem (20px) - font-semibold - line-height: 1.4 - mt-6 mb-2
H5: 1.125rem (18px) - font-semibold - line-height: 1.5 - mt-4 mb-2
H6: 1rem (16px) - font-semibold - line-height: 1.5 - mt-4 mb-2

本文: 1rem (16px) - font-normal - line-height: 1.75
```

### 3.4 スペーシングシステム

- 段落間: `mb-4` (1rem / 16px)
- セクション間: `mt-8 mb-6` (2rem-1.5rem)
- リスト項目間: `mb-2` (0.5rem / 8px)
- テーブルセル内: `px-4 py-3` (1rem-0.75rem)
- コードブロック内: `p-4` (1rem)

## 4. 各要素の詳細デザイン仕様

### 4.1 見出し (Headings)

#### 仕様
- **H1**: 
  - サイズ: `text-4xl` (2.25rem)
  - 太さ: `font-extrabold`
  - 余白: `mb-6 mt-0`
  - 色: `text-gray-900 dark:text-white`
  - 下線: 薄いアクセントカラー（オプション）
  
- **H2**:
  - サイズ: `text-3xl` (1.875rem)
  - 太さ: `font-bold`
  - 余白: `mt-12 mb-4`
  - 色: `text-gray-800 dark:text-gray-100`
  - ボーダー: `border-b border-gray-200 dark:border-gray-700 pb-2`（セクション区切り）
  
- **H3**:
  - サイズ: `text-2xl` (1.5rem)
  - 太さ: `font-bold`
  - 余白: `mt-8 mb-3`
  - 色: `text-gray-800 dark:text-gray-100`
  
- **H4-H6**:
  - サイズ: 段階的に縮小（`text-xl`, `text-lg`, `text-base`）
  - 太さ: `font-semibold`
  - 余白: `mt-6 mb-2`〜`mt-4 mb-2`
  - 色: `text-gray-700 dark:text-gray-200`

#### 実装例
```tsx
prose-h1:text-4xl prose-h1:font-extrabold prose-h1:mb-6 prose-h1:text-gray-900 dark:prose-h1:text-white
prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h2:pb-2 prose-h2:text-gray-800 dark:prose-h2:text-gray-100
prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-gray-800 dark:prose-h3:text-gray-100
prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-2 prose-h4:text-gray-700 dark:prose-h4:text-gray-200
```

### 4.2 段落テキスト (Paragraphs)

#### 仕様
- フォントサイズ: `text-base` (1rem / 16px)
- 行間: `leading-[1.75]` (1.75)
- 色: `text-gray-700 dark:text-gray-300`
- 余白: `mb-4`
- 最大幅: コンテナ制限（prose処理）

### 4.3 リスト (Lists)

#### 順序なしリスト (ul)
- マーカー: カスタムディスク（`list-disc`）
- 色: アクセントカラー `marker:text-blue-600 dark:marker:text-blue-400`
- インデント: `ml-6`
- 項目間: `space-y-2`
- ネストリスト: 異なるマーカースタイル（円・四角）

#### 順序付きリスト (ol)
- マーカー: 数字 `list-decimal`
- 色: アクセントカラー `marker:text-blue-600 dark:marker:text-blue-400`
- 太さ: `marker:font-semibold`
- インデント: `ml-6`
- 項目間: `space-y-2`

#### 実装例
```tsx
prose-ul:list-disc prose-ul:ml-6 prose-ul:space-y-2 prose-ul:marker:text-blue-600 dark:prose-ul:marker:text-blue-400
prose-ol:list-decimal prose-ol:ml-6 prose-ol:space-y-2 prose-ol:marker:text-blue-600 dark:prose-ol:marker:text-blue-400 prose-ol:marker:font-semibold
prose-li:text-gray-700 dark:prose-li:text-gray-300
```

### 4.4 テーブル (Tables)

#### 仕様
- ボーダー: `border border-gray-300 dark:border-gray-600`（1px）
- 影: `shadow-md`
- 丸角: `rounded-lg overflow-hidden`
- 幅: `w-full`

##### テーブルヘッダー (thead/th)
- 背景: `bg-gray-100 dark:bg-gray-800`（最も強調 - ダークモードで最暗）
- テキスト色: `text-gray-900 dark:text-white`
- 太さ: `font-bold`
- 整列: `text-left`
- パディング: `px-4 py-3`
- ボーダー: `border-b-2 border-gray-300 dark:border-gray-600`

##### テーブルボディ (tbody/td)
- 背景: 
  - 奇数行: `bg-white dark:bg-gray-700`
  - 偶数行: `bg-gray-50 dark:bg-gray-600`（ストライプ - コントラスト重視）
- テキスト色: `text-gray-700 dark:text-gray-300`
- パディング: `px-4 py-3`
- ボーダー: `border-b border-gray-200 dark:border-gray-700`
- ホバー: `hover:bg-gray-100 dark:hover:bg-gray-500`（行全体）

#### 実装例
```tsx
prose-table:block prose-table:w-full prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-600 prose-table:rounded-lg prose-table:shadow-md prose-table:overflow-hidden
prose-thead:bg-gray-100 dark:prose-thead:bg-gray-800
prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-bold prose-th:text-gray-900 dark:prose-th:text-white prose-th:border-b-2 prose-th:border-gray-300 dark:prose-th:border-gray-600
prose-tbody:prose-tr:bg-white dark:prose-tbody:prose-tr:bg-gray-700
prose-tr:border-b prose-tr:border-gray-200 dark:prose-tr:border-gray-700
prose-tr:even:bg-gray-50 dark:prose-tr:even:bg-gray-600
prose-tbody:prose-tr:hover:bg-gray-100 dark:prose-tbody:prose-tr:hover:bg-gray-500
prose-td:px-4 prose-td:py-3 prose-td:text-gray-700 dark:prose-td:text-gray-300
```

### 4.5 コードブロック (Code Blocks)

#### インラインコード (code)
- 背景: `bg-gray-100 dark:bg-gray-800`
- テキスト色: `text-pink-600 dark:text-pink-400`
- パディング: `px-1.5 py-0.5`
- 丸角: `rounded`
- フォント: `font-mono text-sm`
- ボーダー: `border border-gray-300 dark:border-gray-700`（薄く）

#### ブロックコード (pre)
- 背景: `bg-gray-900 dark:bg-gray-950`（コントラスト重視）
- テキスト色: `text-gray-100`
- パディング: `p-4`
- 丸角: `rounded-lg`
- ボーダー: `border border-gray-700 dark:border-gray-600`
- 影: `shadow-lg`
- スクロール: `overflow-x-auto`
- フォント: `font-mono text-sm`
- 行番号: 実装検討（rehype-prism-plusなど）
- コピーボタン: 実装検討（右上隅配置）

#### 実装例
```tsx
prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-gray-300 dark:prose-code:border-gray-700
prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:shadow-lg prose-pre:border prose-pre:border-gray-700 dark:prose-pre:border-gray-600 prose-pre:overflow-x-auto
```

### 4.6 引用ブロック (Blockquotes)

#### 仕様
- 背景: `bg-blue-50 dark:bg-blue-950/20`
- 左ボーダー: `border-l-4 border-blue-500 dark:border-blue-400`
- パディング: `pl-4 py-3 pr-4`
- イタリック: `italic`
- テキスト色: `text-gray-700 dark:text-gray-300`
- 丸角: `rounded-r-lg`（右側のみ）
- アイコン: クォーテーションマーク検討（擬似要素）

#### 実装例
```tsx
prose-blockquote:border-l-4 prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/20 prose-blockquote:pl-4 prose-blockquote:py-3 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
```

### 4.7 リンク (Links)

#### 仕様
- 色: `text-blue-600 dark:text-blue-400`
- ホバー: `hover:text-blue-700 dark:hover:text-blue-300`
- 下線: `underline decoration-2 decoration-blue-400/50`（常時または hover時）
- アンダーラインオフセット: `underline-offset-2`
- トランジション: `transition-colors duration-200`
- 訪問済み: `visited:text-purple-600 dark:visited:text-purple-400`（検討）
- 外部リンクアイコン: SVGアイコン追加検討

#### 実装例
```tsx
prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:underline prose-a:decoration-2 prose-a:decoration-blue-400/50 prose-a:underline-offset-2 prose-a:transition-colors prose-a:duration-200 prose-a:hover:text-blue-700 dark:prose-a:hover:text-blue-300
```

### 4.8 強調表示 (Emphasis)

#### 太字 (strong)
- 太さ: `font-bold`
- 色: `text-gray-900 dark:text-white`

#### 斜体 (em)
- スタイル: `italic`
- 色: 継承

#### 実装例
```tsx
prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-white
prose-em:italic
```

## 5. レスポンシブデザイン

### 5.1 ブレークポイント戦略

- **モバイル (< 640px)**: 
  - フォントサイズ小さめ
  - パディング削減
  - テーブルは横スクロール
  
- **タブレット (640px - 1024px)**:
  - 標準サイズ
  
- **デスクトップ (> 1024px)**:
  - 最大幅制限（prose処理）
  - 行長制限（60-75文字）

### 5.2 実装例

```tsx
prose prose-sm sm:prose-base lg:prose-lg
```

## 6. アニメーション・インタラクション

### 6.1 推奨アニメーション

- リンクホバー: 色変化（0.2s）
- テーブル行ホバー: 背景色変化（0.15s）
- コードブロックコピーボタン: フェードイン

### 6.2 実装ガイドライン

```tsx
transition-colors duration-200 ease-in-out
```

## 7. アクセシビリティ要件

### 7.1 色のコントラスト

- WCAG 2.1 AA基準: 4.5:1（通常テキスト）、3:1（大きいテキスト）
- チェックツール使用推奨

### 7.2 フォーカス表示

- キーボードナビゲーション対応
- フォーカスリング: `focus-visible:ring-2 focus-visible:ring-blue-500`

### 7.3 セマンティックHTML

- 適切な見出し階層
- リストマークアップ
- テーブルヘッダー（`<th>`）の使用

## 8. 実装計画

### 8.1 フェーズ1: 基本要素の刷新

1. 見出しのスタイル改善
2. 段落・リストのスペーシング調整
3. テーブルのストライプ・ホバー実装

### 8.2 フェーズ2: 高度な要素

1. コードブロックの改善（コピーボタン・行番号）
2. 引用ブロックのビジュアル強化
3. リンクのインタラクション改善

### 8.3 フェーズ3: 最適化

1. レスポンシブ調整
2. アニメーション追加
3. パフォーマンス最適化
4. アクセシビリティ監査

## 9. 技術的考慮事項

### 9.1 Tailwind CSS Typography設定

`tailwind.config.ts`でのカスタマイズ：

```typescript
typography: (theme) => ({
  DEFAULT: {
    css: {
      // カスタムスタイル定義
    },
  },
}),
```

### 9.2 ダークモード実装

- 現在の`class`ベース方式を維持
- `DarkModeProvider`との連携確保
- 全要素で`dark:`バリアントを定義

### 9.3 パフォーマンス

- Tailwind CSSのJIT（Just-In-Time）モードを活用
- 未使用CSSの削除（production build）
- 画像最適化（next/image）

## 10. テスト・検証計画

### 10.1 ビジュアルテスト

- 各Markdown要素の表示確認
- ライト/ダークモード切り替え
- レスポンシブ表示（各デバイスサイズ）

### 10.2 アクセシビリティテスト

- スクリーンリーダー対応確認
- キーボードナビゲーション
- カラーコントラストチェック

### 10.3 パフォーマンステスト

- ページロード時間
- Lighthouse スコア
- Core Web Vitals

## 11. 参考リソース

### 11.1 デザインシステム参考

- **Material Design**: Googleのデザインガイドライン
- **Apple Human Interface Guidelines**: Appleのデザイン原則
- **GitHub Markdown Styling**: GitHubのMarkdownスタイル
- **Medium**: 読みやすい記事デザインの参考

### 11.2 Tailwind CSS Typography

- 公式ドキュメント: https://tailwindcss.com/docs/typography-plugin
- カスタマイズ例: https://github.com/tailwindlabs/tailwindcss-typography

### 11.3 アクセシビリティ

- WCAG 2.1ガイドライン
- WebAIM Contrast Checker

## 12. まとめ

本仕様書に基づいてブログ記事のデザインを刷新することで、以下の成果が期待できます：

1. **可読性の大幅な向上**: 適切なタイポグラフィとスペーシング
2. **視覚的魅力の強化**: モダンなデザイン言語の採用
3. **一貫性の確保**: 全要素で統一されたスタイル
4. **アクセシビリティの向上**: WCAG基準準拠
5. **ユーザー体験の改善**: ダークモード対応とレスポンシブデザイン

実装は段階的に行い、各フェーズでテストと検証を実施することで、品質の高いデザイン刷新を実現します。
