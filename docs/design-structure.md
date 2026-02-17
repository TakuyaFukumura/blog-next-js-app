# デザイン構造資料

本ドキュメントでは、このブログアプリケーションのデザイン構造について説明します。

## 目次

1. [概要](#概要)
2. [デザインシステムの構成](#デザインシステムの構成)
3. [スタイリング技術](#スタイリング技術)
4. [カラーパレット](#カラーパレット)
5. [コンポーネント別デザイン](#コンポーネント別デザイン)
6. [レスポンシブデザイン](#レスポンシブデザイン)
7. [デザイントークン](#デザイントークン)

## 概要

このブログアプリケーションは、**Tailwind CSS**を基盤としたユーティリティファーストのデザインシステムを採用しています。ダークモード対応、レスポンシブデザイン、アクセシビリティを重視した設計となっています。

### 主要な技術スタック

- **Tailwind CSS v4**: ユーティリティファーストCSSフレームワーク
- **@tailwindcss/typography**: Markdownコンテンツのスタイリング用プラグイン
- **PostCSS**: CSSプリプロセッサ
- **CSS Variables**: カスタムプロパティによるテーマ管理

## デザインシステムの構成

### ディレクトリ構造

```
blog-next-js-app/
├── src/
│   └── app/
│       ├── globals.css          # グローバルスタイル定義
│       ├── layout.tsx            # ルートレイアウト
│       └── components/           # UIコンポーネント
│           ├── Header.tsx
│           ├── BlogCard.tsx
│           ├── BlogList.tsx
│           ├── MarkdownContent.tsx
│           └── DarkModeProvider.tsx
├── tailwind.config.ts            # Tailwind設定
└── postcss.config.mjs            # PostCSS設定
```

### 設定ファイル

#### 1. `tailwind.config.ts`

Tailwind CSSの設定ファイルです。

```typescript
export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",           // クラスベースのダークモード
    theme: {
        extend: {},
    },
    plugins: [
        typography,              // @tailwindcss/typographyプラグイン
    ],
}
```

**主要な設定項目:**
- `content`: Tailwindがスキャンするファイルパス
- `darkMode: "class"`: `.dark`クラスでダークモードを制御
- `plugins`: typographyプラグインでMarkdownスタイリングを拡張

#### 2. `postcss.config.mjs`

PostCSSの設定ファイルです。

```javascript
const config = {
    plugins: ["@tailwindcss/postcss"],
};
```

Tailwind CSS v4のPostCSSプラグインを使用しています。

#### 3. `src/app/globals.css`

グローバルスタイルを定義するCSSファイルです。

## スタイリング技術

### 1. Tailwind CSS ユーティリティクラス

このアプリケーションでは、主にTailwindのユーティリティクラスを使用してスタイリングを行います。

**例:**
```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
    タイトル
  </h1>
</div>
```

### 2. CSS Variables (カスタムプロパティ)

`globals.css`で定義されたCSS変数を使用してテーマカラーを管理しています。

```css
:root {
    --background: #ffffff;
    --foreground: #171717;
}

.dark {
    --background: #0a0a0a;
    --foreground: #ededed;
}

@theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --font-sans: var(--font-geist-sans);
    --font-mono: var(--font-geist-mono);
}
```

### 3. Typography プラグイン

`@tailwindcss/typography`プラグインを使用して、Markdownコンテンツに豊富なタイポグラフィスタイルを適用しています。

## カラーパレット

### ライトモード

| 用途 | カラー | 値 |
|------|--------|-----|
| 背景色 | White | `#ffffff` |
| 前景色 | Dark Gray | `#171717` |
| アクセント | Blue | `blue-600` (Tailwind) |
| グラデーション背景 | Blue to Indigo | `from-blue-50 to-indigo-100` |

### ダークモード

| 用途 | カラー | 値 |
|------|--------|-----|
| 背景色 | Very Dark Gray | `#0a0a0a` |
| 前景色 | Light Gray | `#ededed` |
| アクセント | Blue | `blue-400` (Tailwind) |
| グラデーション背景 | Dark Gray | `from-gray-900 to-gray-800` |

### シンタックスハイライト

コードブロックのシンタックスハイライトには、Prismスタイルをカスタマイズしたものを使用しています。

**ライトモード:**
- コメント: `#6a737d`
- キーワード: `#d73a49`
- 関数: `#6f42c1`
- 文字列: `#032f62`
- 数値: `#005cc5`

**ダークモード:**
- コメント: `#8b949e`
- キーワード: `#ff7b72`
- 関数: `#d2a8ff`
- 文字列: `#a5d6ff`
- 数値: `#79c0ff`

## コンポーネント別デザイン

### 1. Header (ヘッダー)

**ファイル:** `src/app/components/Header.tsx`

**デザイン特徴:**
- 固定ヘッダー (`sticky top-0 z-50`)
- 半透明背景 (`bg-white/80 dark:bg-gray-800/80`)
- バックドロップブラー効果 (`backdrop-blur-sm`)
- ボーダー (`border-b border-gray-200 dark:border-gray-700`)

**主要クラス:**
```tsx
<header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b
    border-gray-200 dark:border-gray-700 sticky top-0 z-50">
```

**ダークモード切り替えボタン:**
- ホバーエフェクト付き
- ライトモード: ☀️
- ダークモード: 🌙

### 2. BlogCard (ブログカードコンポーネント)

**ファイル:** `src/app/components/BlogCard.tsx`

**デザイン特徴:**
- カード形式 (`rounded-lg shadow-md`)
- ホバー時のシャドウ強調 (`hover:shadow-xl`)
- トランジション効果 (`transition-shadow duration-300`)

**主要セクション:**
1. **タイトル**
   - サイズ: `text-2xl font-bold`
   - ホバー時カラー変更: `hover:text-blue-600 dark:hover:text-blue-400`

2. **メタ情報**
   - 日付と著者を表示
   - テキストサイズ: `text-sm text-gray-600 dark:text-gray-400`

3. **説明文**
   - 3行でクランプ: `line-clamp-3`

4. **タグ**
   - ピル形式: `rounded-full`
   - 背景色: `bg-blue-100 dark:bg-blue-900`
   - テキスト色: `text-blue-800 dark:text-blue-200`

### 3. BlogList (ブログリストコンポーネント)

**ファイル:** `src/app/components/BlogList.tsx`

**デザイン特徴:**
- グリッドレイアウト
- レスポンシブカラム数:
  - モバイル: 1カラム (`grid-cols-1`)
  - タブレット: 2カラム (`md:grid-cols-2`)
  - デスクトップ: 3カラム (`lg:grid-cols-3`)
- グリッド間隔: `gap-6`

### 4. MarkdownContent (Markdownコンテンツ表示)

**ファイル:** `src/app/components/MarkdownContent.tsx`

**デザイン特徴:**
- `prose`クラスを使用してタイポグラフィスタイルを適用
- ダークモード対応 (`dark:prose-invert`)
- 最大幅制限なし (`max-w-none`)

**カスタマイズされた要素:**

#### 見出し
- H1: `text-4xl font-extrabold mb-6 mt-0`
- H2: `text-3xl font-bold mt-12 mb-4 border-b`
- H3: `text-2xl font-bold mt-8 mb-3`
- H4-H6: サイズと余白が段階的に小さくなる

#### テキスト要素
- 段落: `text-base leading-[1.75] mb-4`
- リンク: `text-blue-600 dark:text-blue-400 underline`
- 強調: `font-bold text-gray-900 dark:text-white`
- イタリック: `italic`

#### コード
- インラインコード: 
  - 背景色: `bg-gray-100 dark:bg-gray-800`
  - テキスト色: `text-pink-600 dark:text-pink-400`
  - ボーダー付き: `border border-gray-300 dark:border-gray-700`
  
- コードブロック (`pre`):
  - 背景色: `bg-gray-900 dark:bg-gray-950`
  - シャドウ: `shadow-lg`
  - ボーダー: `border border-gray-700 dark:border-gray-600`

#### リスト
- 箇条書き: `list-disc ml-6 space-y-2`
- マーカーカラー: `marker:text-blue-600 dark:marker:text-blue-400`
- 番号付き: `list-decimal ml-6 space-y-2`

#### 引用
- 左ボーダー: `border-l-4 border-blue-500 dark:border-blue-400`
- 背景色: `bg-blue-50 dark:bg-blue-950/20`
- イタリック体: `italic`

#### テーブル
- 全幅: `w-full`
- ボーダー: `border border-gray-300 dark:border-gray-600`
- ヘッダー背景: `bg-gray-100 dark:bg-gray-800`
- 偶数行背景: `even:bg-gray-50 dark:even:bg-gray-600`
- ホバー効果: `hover:bg-gray-100 dark:hover:bg-gray-500`

### 5. DarkModeProvider (ダークモードプロバイダー)

**ファイル:** `src/app/components/DarkModeProvider.tsx`

**機能:**
- React Contextを使用したテーマ状態管理
- LocalStorageでテーマ設定を永続化
- HTMLルート要素に`.dark`クラスを追加/削除

**提供される値:**
```typescript
{
    theme: 'light' | 'dark',
    setTheme: (theme: Theme) => void,
    isDark: boolean
}
```

## レスポンシブデザイン

### ブレークポイント

Tailwind CSSのデフォルトブレークポイントを使用しています:

| プレフィックス | 最小幅 | 対象デバイス |
|---------------|--------|-------------|
| `sm:` | 640px | 小型タブレット以上 |
| `md:` | 768px | タブレット以上 |
| `lg:` | 1024px | デスクトップ以上 |
| `xl:` | 1280px | 大型デスクトップ以上 |

### レスポンシブパターン

#### 1. コンテナ幅
```tsx
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```
- モバイル: `px-4`
- タブレット: `sm:px-6`
- デスクトップ: `lg:px-8`

#### 2. タイポグラフィ
```tsx
className="text-4xl sm:text-5xl"
```
- モバイル: `text-4xl`
- タブレット以上: `sm:text-5xl`

#### 3. グリッドレイアウト
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```
- モバイル: 1カラム
- タブレット: 2カラム
- デスクトップ: 3カラム

#### 4. テキスト表示
```tsx
className="hidden sm:inline"
```
- モバイル: 非表示
- タブレット以上: 表示

## デザイントークン

### スペーシング

Tailwindのデフォルトスペーシングスケールを使用しています:

| クラス | 値 | 用途 |
|--------|-----|------|
| `p-2` | 0.5rem (8px) | 小さい余白 |
| `p-4` | 1rem (16px) | 標準的な余白 |
| `p-6` | 1.5rem (24px) | 中程度の余白 |
| `p-8` | 2rem (32px) | 大きい余白 |
| `p-12` | 3rem (48px) | 非常に大きい余白 |

### フォントサイズ

| クラス | サイズ | 行の高さ | 用途 |
|--------|--------|----------|------|
| `text-xs` | 0.75rem | 1rem | 極小テキスト |
| `text-sm` | 0.875rem | 1.25rem | 小さいテキスト |
| `text-base` | 1rem | 1.5rem | 本文 |
| `text-lg` | 1.125rem | 1.75rem | 大きいテキスト |
| `text-xl` | 1.25rem | 1.75rem | 見出し (小) |
| `text-2xl` | 1.5rem | 2rem | 見出し (中) |
| `text-3xl` | 1.875rem | 2.25rem | 見出し (大) |
| `text-4xl` | 2.25rem | 2.5rem | 見出し (特大) |
| `text-5xl` | 3rem | 1 | ヒーロー見出し |

### シャドウ

| クラス | 用途 |
|--------|------|
| `shadow-md` | カードの標準シャドウ |
| `shadow-lg` | 強調されたシャドウ |
| `shadow-xl` | ホバー時の強いシャドウ |

### 角丸

| クラス | 半径 | 用途 |
|--------|------|------|
| `rounded` | 0.25rem | 小さい角丸 |
| `rounded-lg` | 0.5rem | カードの角丸 |
| `rounded-2xl` | 1rem | 大きい角丸 |
| `rounded-full` | 9999px | 円形/ピル形状 |

### トランジション

アニメーション効果に使用されるトランジション:

| クラス | 期間 | 用途 |
|--------|------|------|
| `transition-colors` | 150ms | カラー変化 |
| `transition-shadow duration-300` | 300ms | シャドウ変化 |
| `transition-colors duration-200` | 200ms | ボタンのホバー |

## ページ別デザイン

### 1. トップページ (`src/app/page.tsx`)

**デザイン特徴:**
- グラデーション背景:
  - ライト: `from-blue-50 to-indigo-100`
  - ダーク: `from-gray-900 to-gray-800`
- 最小高さ: `min-h-screen`
- センタリング: `max-w-7xl mx-auto`

**セクション構成:**
1. ヘッダーセクション (タイトルと記事数)
2. ブログリストセクション (グリッド表示)

### 2. ブログ記事詳細ページ (`src/app/blog/[slug]/page.tsx`)

**デザイン特徴:**
- 同じグラデーション背景
- 最大幅: `max-w-4xl` (読みやすさ重視)
- 記事カード: `rounded-2xl shadow-lg`

**セクション構成:**
1. 戻るリンク
2. 記事ヘッダー (タイトル、日付、著者、タグ)
3. 記事本文 (MarkdownContent)

## ダークモード実装

### 仕組み

1. **Context API**: `DarkModeProvider`でテーマ状態を管理
2. **LocalStorage**: ユーザーの設定を保存
3. **CSSクラス**: HTMLルート要素に`.dark`クラスを付与
4. **Tailwindの`dark:`プレフィックス**: クラスごとのダークモードスタイル

### 切り替えフロー

```
ユーザーがボタンクリック
  ↓
setTheme('dark' or 'light')
  ↓
LocalStorageに保存
  ↓
document.documentElement.classList.add/remove('dark')
  ↓
Tailwindの dark: プレフィックスが適用される
```

### ダークモードスタイルの例

```tsx
// 単一要素
className="bg-white dark:bg-gray-800"

// テキスト
className="text-gray-900 dark:text-white"

// ボーダー
className="border-gray-200 dark:border-gray-700"

// ホバー状態
className="hover:text-blue-600 dark:hover:text-blue-400"
```

## アクセシビリティ

### セマンティックHTML

- `<article>`: ブログ記事
- `<header>`: ページヘッダー、記事ヘッダー
- `<time>`: 日付表示
- `<nav>`: ナビゲーション

### aria属性

- `title`: ボタンのツールチップ
- `dateTime`: 日付の機械可読形式

### キーボード操作

- すべてのインタラクティブ要素はキーボードでアクセス可能
- フォーカス状態の視覚的フィードバック

## パフォーマンス最適化

### CSSの最適化

1. **PurgeCSS**: Tailwindが未使用のCSSを自動削除
2. **JITモード**: 必要なスタイルのみを生成
3. **PostCSS**: ビルド時に最適化

### レンダリング最適化

1. **静的生成**: 記事ページは静的に生成 (`generateStaticParams`)
2. **コード分割**: Next.jsの自動コード分割
3. **画像最適化**: Next.jsの`Image`コンポーネント (必要に応じて)

## まとめ

このブログアプリケーションのデザインシステムは、以下の特徴を持っています:

1. **Tailwind CSSベース**: ユーティリティファーストでメンテナンス性が高い
2. **ダークモード完全対応**: すべてのコンポーネントでダークモードをサポート
3. **レスポンシブデザイン**: モバイルファーストで全デバイスに対応
4. **アクセシビリティ**: セマンティックHTMLとaria属性の使用
5. **カスタマイズ性**: CSS変数とTailwind設定で柔軟にカスタマイズ可能
6. **パフォーマンス**: 未使用CSSの削除と静的生成で高速化

デザインの変更や拡張を行う際は、既存のパターンとTailwindのユーティリティクラスを活用することで、一貫性を保ちながら効率的に開発できます。
