---
title: "Markdownの新機能デモ"
date: "2024-04-01"
author: "ブログ管理者"
tags: [ "Markdown", "GFM", "ドキュメント" ]
description: "GitHub Flavored Markdownやテーブル、外部リンクなどの新機能のデモンストレーション記事です。"
published: true
---

# Markdownの新機能デモ

この記事では、新しく追加されたMarkdownの機能をデモンストレーションします。

## テーブル機能

GitHub Flavored Markdown（GFM）により、テーブルが使えるようになりました。

| 機能 | 説明 | 優先度 |
|------|------|--------|
| remark-gfm | テーブル、タスクリストのサポート | 高 |
| rehype-slug | 見出しにID属性を追加 | 高 |
| rehype-autolink-headings | 見出しに自動リンクを追加 | 高 |
| rehype-external-links | 外部リンクの安全な処理 | 中 |

### パッケージのバージョン情報

| パッケージ | バージョン | 用途 |
|-----------|-----------|------|
| unified | ^11.0.5 | Markdownパイプライン処理のコア |
| remark-gfm | ^4.0.1 | GitHub Flavored Markdown対応 |
| rehype-slug | ^6.0.0 | 見出しアンカー機能 |

## 外部リンク

外部リンクには自動的に `target="_blank"` と `rel="noopener noreferrer"` が追加されます。

- [Next.js公式ドキュメント](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GitHub](https://github.com/)

これにより、セキュリティとユーザビリティが向上します。

## タスクリスト

- [x] remark-gfmのインストール
- [x] rehype-slugのインストール
- [x] rehype-autolink-headingsのインストール
- [x] rehype-external-linksのインストール
- [ ] 追加機能の実装
- [ ] ドキュメントの更新

## 見出しアンカー

各見出しには自動的にIDが付与され、リンク可能になります。この見出しにマウスカーソルを重ねると、リンクが表示されます。

### レベル3の見出し

#### レベル4の見出し

##### レベル5の見出し

## コードブロック

コードブロックも引き続きシンタックスハイライトが適用されます。

```typescript
import {unified} from 'unified';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

export async function markdownToHtml(markdown: string): Promise<string> {
    const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)  // GFM対応
        .use(rehypeSlug)  // 見出しアンカー
        .process(markdown);
    
    return result.toString();
}
```

## 引用

> これは引用ブロックです。
> GFMと組み合わせることで、より豊かな表現が可能になります。

## まとめ

新機能により、ブログ記事の表現力が大幅に向上しました：

1. **テーブル表示**: データを整理して表示できる
2. **外部リンクの安全な処理**: セキュリティリスクを低減
3. **見出しアンカー**: ページ内ナビゲーションが容易に
4. **タスクリスト**: プロジェクト管理が視覚的に

これらの機能により、より読みやすく、使いやすいブログになりました！
