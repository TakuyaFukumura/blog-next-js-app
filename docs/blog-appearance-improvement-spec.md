# ブログ記事の見た目改善仕様書

## 1. 概要

### 1.1 目的

本仕様書は、blog-next-js-appにおけるMarkdown形式のブログ記事の表示を改善し、より読みやすく、視覚的に魅力的な記事ページを実現するための技術仕様を定義します。

### 1.2 背景

現在のブログアプリケーションは、Markdownファイルを使用して記事を管理していますが、以下の課題があります：

- Markdownの記法（見出し、リスト、コードブロックなど）が適切にHTMLとして表示される必要がある
- コードブロックのシンタックスハイライトが必要
- 記事の可読性を高めるための適切なスタイリングが必要
- ダークモード対応が必要

### 1.3 目標

- Markdownの各要素（見出し、段落、リスト、コードブロック、引用、リンクなど）を適切にHTMLとして表示する
- コードブロックにシンタックスハイライトを適用する
- レスポンシブデザインに対応する
- ダークモード/ライトモードの両方で読みやすいスタイルを提供する
- セキュリティ（XSS対策）を考慮したHTML変換を実施する

## 2. 現状分析

### 2.1 現在の実装状況

現在のアプリケーションは、以下の技術スタックでMarkdown処理を実装しています：

#### Markdown処理パイプライン

```typescript
// src/lib/markdown.ts
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import rehypeSanitize from 'rehype-sanitize';

export async function markdownToHtml(markdown: string): Promise<string> {
    const result = await unified()
        .use(remarkParse)           // MarkdownをMDAST（Markdown抽象構文木）に変換
        .use(remarkRehype)          // MDASTをHAST（HTML抽象構文木）に変換
        .use(rehypePrism, {ignoreMissing: true})  // シンタックスハイライト追加
        .use(rehypeSanitize)        // XSS対策のためHTMLをサニタイズ
        .use(rehypeStringify)       // HASTをHTML文字列に変換
        .process(markdown);

    return result.toString();
}
```

#### 表示コンポーネント

```typescript
// src/app/components/MarkdownContent.tsx
export default function MarkdownContent({content}: MarkdownContentProps) {
    return (
        <div
            className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-p:text-gray-700 dark:prose-p:text-gray-300
                prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
                prose-code:text-pink-600 dark:prose-code:text-pink-400
                prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900
                prose-strong:text-gray-900 dark:prose-strong:text-white
                prose-ul:text-gray-700 dark:prose-ul:text-gray-300
                prose-ol:text-gray-700 dark:prose-ol:text-gray-300
                prose-li:text-gray-700 dark:prose-li:text-gray-300
                prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400"
            dangerouslySetInnerHTML={{__html: content}}
        />
    );
}
```

### 2.2 使用しているライブラリ

| ライブラリ | バージョン | 役割 |
|-----------|-----------|------|
| unified | ^11.0.5 | Markdownパイプライン処理のコア |
| remark-parse | ^11.0.0 | Markdown構文解析 |
| remark-rehype | ^11.1.2 | MarkdownからHTMLへの変換 |
| rehype-prism-plus | ^2.0.2 | シンタックスハイライト |
| rehype-sanitize | ^6.0.0 | XSS対策のHTMLサニタイズ |
| rehype-stringify | ^10.0.1 | HTML文字列生成 |
| @tailwindcss/typography | ^0.5.19 | Proseスタイリング |

### 2.3 現在サポートしているMarkdown記法

現在の実装では、以下のMarkdown記法がサポートされています：

#### 見出し（Headings）
```markdown
# 見出し1
## 見出し2
### 見出し3
#### 見出し4
##### 見出し5
###### 見出し6
```

#### 段落（Paragraphs）
```markdown
これは段落です。

これは別の段落です。
```

#### リスト（Lists）
```markdown
- 箇条書きリスト項目1
- 箇条書きリスト項目2
  - ネストされた項目

1. 番号付きリスト項目1
2. 番号付きリスト項目2
```

#### コードブロック（Code Blocks）
````markdown
```typescript
const message: string = "Hello, World!";
console.log(message);
```
````

#### インラインコード（Inline Code）
```markdown
この`const x = 10;`はインラインコードです。
```

#### リンク（Links）
```markdown
[リンクテキスト](https://example.com)
```

#### 強調（Emphasis）
```markdown
**太字テキスト**
*イタリックテキスト*
```

#### 引用（Blockquote）
```markdown
> これは引用です。
> 複数行にわたる引用も可能です。
```

## 3. 技術仕様

### 3.1 Markdown処理フロー

```
Markdownファイル（posts/*.md）
    ↓
gray-matter（フロントマター解析）
    ↓
unified + remarkパイプライン
    ↓
    1. remark-parse: Markdown → MDAST
    2. remark-rehype: MDAST → HAST
    3. rehype-prism-plus: シンタックスハイライト追加
    4. rehype-sanitize: XSS対策サニタイズ
    5. rehype-stringify: HAST → HTML文字列
    ↓
React コンポーネント（dangerouslySetInnerHTML）
    ↓
ブラウザ表示
```

### 3.2 スタイリング戦略

#### Tailwind CSS Typographyプラグイン

`@tailwindcss/typography`を使用して、Markdownコンテンツに対する包括的なスタイリングを提供します。

```typescript
className="prose prose-lg dark:prose-invert max-w-none"
```

主要なクラス：
- `prose`: Typographyプラグインの基本スタイル適用
- `prose-lg`: 大きめのフォントサイズ
- `dark:prose-invert`: ダークモード時の色反転
- `max-w-none`: 最大幅の制限を解除

#### カスタムスタイリング

各要素に対するカスタムスタイル：

```css
/* 見出し */
prose-headings:font-bold
prose-headings:text-gray-900
dark:prose-headings:text-white

/* 段落 */
prose-p:text-gray-700
dark:prose-p:text-gray-300

/* リンク */
prose-a:text-blue-600
dark:prose-a:text-blue-400
hover:prose-a:underline

/* インラインコード */
prose-code:text-pink-600
dark:prose-code:text-pink-400

/* コードブロック */
prose-pre:bg-gray-100
dark:prose-pre:bg-gray-900
prose-pre:text-gray-800
dark:prose-pre:text-gray-200

/* 強調 */
prose-strong:text-gray-900
dark:prose-strong:text-white

/* リスト */
prose-ul:text-gray-700
dark:prose-ul:text-gray-300
prose-ol:text-gray-700
dark:prose-ol:text-gray-300
prose-li:text-gray-700
dark:prose-li:text-gray-300

/* 引用 */
prose-blockquote:border-blue-500
dark:prose-blockquote:border-blue-400
prose-blockquote:text-gray-700
dark:prose-blockquote:text-gray-300
```

### 3.3 シンタックスハイライト

#### 実装方法

`rehype-prism-plus`を使用してコードブロックにシンタックスハイライトを適用します。

```typescript
.use(rehypePrism, {ignoreMissing: true})
```

設定オプション：
- `ignoreMissing: true`: 未知の言語を指定された場合でもエラーを発生させない

#### サポート言語

Prismは以下を含む多数のプログラミング言語をサポート：
- JavaScript / TypeScript
- Python
- Java
- C / C++ / C#
- Go
- Rust
- Ruby
- PHP
- HTML / CSS
- その他多数

#### CSSスタイル

シンタックスハイライトのスタイルは、Prismのデフォルトテーマを使用します。
必要に応じて、カスタムPrismテーマを適用することも可能です。

### 3.4 セキュリティ対策

#### XSS（クロスサイトスクリプティング）対策

`rehype-sanitize`を使用してHTMLをサニタイズし、悪意のあるスクリプトの実行を防ぎます。

```typescript
.use(rehypeSanitize)
```

サニタイズにより：
- 危険なHTMLタグ（`<script>`など）が除去される
- 危険な属性（`onclick`など）が除去される
- 安全なHTMLのみが出力される

#### dangerouslySetInnerHTMLの使用

Reactコンポーネントでは`dangerouslySetInnerHTML`を使用してHTMLを挿入しますが、
事前にサニタイズされたHTMLのみを挿入するため、安全です。

```typescript
<div dangerouslySetInnerHTML={{__html: content}} />
```

## 4. 改善提案

### 4.1 現在の実装で十分な点

現在の実装は以下の点で優れています：

1. **包括的なMarkdown対応**: 主要なMarkdown記法をすべてサポート
2. **シンタックスハイライト**: コードブロックが美しく表示される
3. **ダークモード対応**: ライト/ダークモードの両方で読みやすい
4. **セキュリティ**: XSS対策が適切に実装されている
5. **レスポンシブ**: モバイル・デスクトップの両方で適切に表示される

### 4.2 さらなる改善案

#### 4.2.1 追加のrehypeプラグイン

| プラグイン | 用途 | 優先度 |
|-----------|------|--------|
| rehype-slug | 見出しにID属性を追加（アンカーリンク用） | 高 |
| rehype-autolink-headings | 見出しに自動的にリンクを追加 | 高 |
| rehype-external-links | 外部リンクに`target="_blank"`と`rel="noopener"`を追加 | 中 |
| rehype-katex | 数式表示のサポート（LaTeX記法） | 低 |
| rehype-figure | 画像にfigure/figcaption要素を追加 | 中 |

#### 4.2.2 追加のremarkプラグイン

| プラグイン | 用途 | 優先度 |
|-----------|------|--------|
| remark-gfm | GitHub Flavored Markdown対応（テーブル、タスクリスト等） | 高 |
| remark-toc | 目次の自動生成 | 中 |
| remark-emoji | 絵文字記法のサポート（`:smile:`など） | 低 |
| remark-math | 数式記法のサポート | 低 |

#### 4.2.3 コードブロックの機能強化

以下の機能は標準のrehype-prism-plusではサポートされていないため、カスタムプラグインの開発が必要です：

**ファイル名表示のサポート（カスタム実装が必要）**

以下は実装したい記法の例です（標準Markdownではサポートされていません）：

````markdown
```typescript:src/example.ts
const example = "コードブロックにファイル名を表示";
```
````

**行番号表示（CSSベースまたはカスタム実装が必要）**
```typescript
// CSSベースのソリューション例
// カウンターを使用して行番号を表示
.code-block {
    counter-reset: line;
}
.code-block .line::before {
    counter-increment: line;
    content: counter(line);
}
```

**行ハイライト（カスタム実装が必要）**

以下は実装したい記法の例です（標準Markdownではサポートされていません）：

````markdown
```typescript {2,4-6}
const line1 = "通常の行";
const line2 = "ハイライトされた行";
const line3 = "通常の行";
const line4 = "ハイライトされた行";
const line5 = "ハイライトされた行";
const line6 = "ハイライトされた行";
```
````

これらの機能を実装する場合は、以下のアプローチが考えられます：
- カスタムremarkプラグインの作成
- 既存のコミュニティプラグインの利用（例：rehype-pretty-code、remark-code-titlesなど）
- クライアントサイドJavaScriptによる後処理

#### 4.2.4 画像の最適化

```typescript
// Next.js Imageコンポーネントとの統合
// remarkプラグインを作成してMarkdown画像をNext.js Imageに変換
```

#### 4.2.5 目次（Table of Contents）の自動生成

```typescript
// remark-tocを使用して記事の目次を自動生成
import remarkToc from 'remark-toc';

.use(remarkToc, {
    heading: '目次',
    maxDepth: 3
})
```

#### 4.2.6 読了時間の推定

```typescript
// 記事の文字数から読了時間を推定して表示
// 日本語の平均的な読書速度は400-600文字/分と幅があるため、
// ここでは中間値の500文字/分を採用（調整可能）
const JAPANESE_READING_SPEED = 500; // 文字/分

function estimateReadingTime(content: string): number {
    const characterCount = content.length;
    return Math.ceil(characterCount / JAPANESE_READING_SPEED);
}
```

#### 4.2.7 コピーボタンの追加

```typescript
// コードブロックにコピーボタンを追加
// クライアントサイドコンポーネントで実装
```

### 4.3 実装の優先順位

#### フェーズ1（高優先度）
1. remark-gfmの追加（テーブル、タスクリストのサポート）
2. rehype-slugの追加（見出しアンカー）
3. rehype-autolink-headingsの追加（見出しリンク）
4. rehype-external-linksの追加（外部リンクの安全な処理）

#### フェーズ2（中優先度）
5. 目次の自動生成（remark-toc）
6. 読了時間の推定表示
7. コードブロックへのコピーボタン追加
8. 画像の最適化（Next.js Image統合）

#### フェーズ3（低優先度）
9. 数式表示のサポート（rehype-katex + remark-math）
10. 絵文字記法のサポート（remark-emoji）
11. コードブロックの行番号表示・ハイライト

## 5. 実装ガイド

### 5.1 フェーズ1の実装手順

#### ステップ1: パッケージのインストール

```bash
npm install remark-gfm rehype-slug rehype-autolink-headings rehype-external-links
```

#### ステップ2: markdown.tsの更新

```typescript
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';

export async function markdownToHtml(markdown: string): Promise<string> {
    const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)  // GitHub Flavored Markdown
        .use(remarkRehype)
        .use(rehypeSlug)  // 見出しにIDを追加
        .use(rehypeAutolinkHeadings, {  // 見出しにリンクを追加
            behavior: 'wrap',
            properties: {
                className: ['heading-anchor']
            }
        })
        .use(rehypeExternalLinks, {  // 外部リンクの設定
            target: '_blank',
            rel: ['noopener', 'noreferrer']
        })
        .use(rehypePrism, {ignoreMissing: true})
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(markdown);

    return result.toString();
}
```

#### ステップ3: スタイルの更新

```typescript
// MarkdownContent.tsxにテーブル用のスタイルを追加
className="prose prose-lg dark:prose-invert max-w-none
    prose-table:border-collapse
    prose-table:w-full
    prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700
    prose-th:bg-gray-100 dark:prose-th:bg-gray-800
    prose-th:p-2
    prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700
    prose-td:p-2"
```

### 5.2 テスト戦略

#### 単体テスト

```typescript
// __tests__/src/lib/markdown.test.ts
describe('markdownToHtml', () => {
    it('should convert headings correctly', async () => {
        const markdown = '# Heading 1\n## Heading 2';
        const html = await markdownToHtml(markdown);
        expect(html).toContain('<h1');
        expect(html).toContain('<h2');
    });

    it('should highlight code blocks', async () => {
        const markdown = '```typescript\nconst x = 10;\n```';
        const html = await markdownToHtml(markdown);
        expect(html).toContain('language-typescript');
    });

    it('should sanitize dangerous HTML', async () => {
        const markdown = '<script>alert("XSS")</script>';
        const html = await markdownToHtml(markdown);
        expect(html).not.toContain('<script');
    });

    it('should support GFM tables', async () => {
        const markdown = '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |';
        const html = await markdownToHtml(markdown);
        expect(html).toContain('<table');
        expect(html).toContain('<th');
        expect(html).toContain('<td');
    });
});
```

#### 統合テスト

```typescript
// __tests__/src/app/blog/[slug]/page.test.tsx
describe('BlogPost Page', () => {
    it('should render markdown content correctly', async () => {
        // モックデータを準備
        // ページをレンダリング
        // Markdown要素が正しく表示されることを確認
    });
});
```

#### ビジュアルリグレッションテスト

実際のブラウザでスクリーンショットを撮影し、見た目の変化を確認：
- 各Markdown要素が正しくスタイリングされているか
- ダークモード/ライトモードの両方で問題ないか
- レスポンシブデザインが機能しているか

## 6. パフォーマンス考慮事項

### 6.1 ビルド時処理

Markdown変換は`generateStaticParams`と組み合わせて、ビルド時に実行されます。
これにより、ランタイムでの変換コストが発生せず、高速なページロードが実現されます。

### 6.2 コード分割

rehypeプラグインは動的インポートを使用して、必要な場合のみロードすることも可能です。

```typescript
// 動的インポートの例（必要に応じて）
const rehypePrism = await import('rehype-prism-plus');
```

### 6.3 キャッシング

Next.jsの静的サイト生成により、変換後のHTMLは自動的にキャッシュされます。

## 7. アクセシビリティ

### 7.1 セマンティックHTML

Markdownから生成されるHTMLは、セマンティックな要素（`<h1>`, `<p>`, `<ul>`, `<code>`など）を使用します。

### 7.2 見出し階層

見出しタグ（h1-h6）は適切な階層で使用され、スクリーンリーダーのナビゲーションをサポートします。

### 7.3 リンクのアクセシビリティ

外部リンクには適切な`rel`属性が付与され、セキュリティとアクセシビリティが確保されます。

### 7.4 コントラスト比

ライト/ダークモードの両方で、WCAG 2.1のコントラスト比基準（AA以上）を満たすようにスタイリングされています。

## 8. まとめ

### 8.1 現状の評価

現在の実装は、基本的なMarkdown表示において十分な機能を提供しています：
- ✅ 主要なMarkdown記法のサポート
- ✅ シンタックスハイライト
- ✅ ダークモード対応
- ✅ セキュリティ対策（XSS防止）
- ✅ レスポンシブデザイン

### 8.2 推奨される改善

優先度の高い改善として：
1. **remark-gfm**: テーブルやタスクリストのサポート
2. **rehype-slug + rehype-autolink-headings**: 見出しアンカーの追加
3. **rehype-external-links**: 外部リンクの安全な処理

### 8.3 将来の拡張性

モジュール化されたプラグインアーキテクチャにより、将来的な機能追加が容易です：
- 数式表示
- 絵文字サポート
- カスタムコンポーネントの埋め込み
- インタラクティブなコード実行環境

### 8.4 メンテナンス性

- 各プラグインは独立しており、個別に更新・削除が可能
- TypeScriptによる型安全性
- テストカバレッジによる品質保証
- ドキュメント化された実装

## 9. 参考資料

### 9.1 公式ドキュメント

- [unified](https://unifiedjs.com/)
- [remark](https://github.com/remarkjs/remark)
- [rehype](https://github.com/rehypejs/rehype)
- [Tailwind CSS Typography](https://tailwindcss.com/docs/typography-plugin)
- [Next.js App Router](https://nextjs.org/docs/app)

### 9.2 プラグインドキュメント

- [remark-gfm](https://github.com/remarkjs/remark-gfm)
- [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus)
- [rehype-sanitize](https://github.com/rehypejs/rehype-sanitize)
- [rehype-slug](https://github.com/rehypejs/rehype-slug)
- [rehype-autolink-headings](https://github.com/rehypejs/rehype-autolink-headings)
- [rehype-external-links](https://github.com/rehypejs/rehype-external-links)

### 9.3 関連記事

- [Markdown処理のベストプラクティス](https://unifiedjs.com/learn/)
- [セキュアなMarkdown処理](https://github.com/rehypejs/rehype-sanitize#readme)
- [アクセシブルなWeb開発](https://www.w3.org/WAI/WCAG21/quickref/)
