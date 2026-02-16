import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import rehypeSanitize, {defaultSchema} from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';

/**
 * MarkdownをHTMLに変換する
 * XSS対策としてrehype-sanitizeを使用してサニタイズを実施
 * @param markdown Markdown文字列
 * @returns サニタイズされた変換後のHTML文字列
 */
export async function markdownToHtml(markdown: string): Promise<string> {
    // rehype-sanitizeの設定をカスタマイズして、外部リンクの属性を許可
    const sanitizeSchema = {
        ...defaultSchema,
        attributes: {
            ...defaultSchema.attributes,
            a: [
                ...(defaultSchema.attributes?.a || []),
                'target',
                'rel'
            ]
        }
    };

    const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)  // GitHub Flavored Markdown（テーブル、タスクリストなど）
        .use(remarkRehype)
        .use(rehypeSlug)  // 見出しにIDを追加（アンカーリンク用）
        .use(rehypeAutolinkHeadings, {  // 見出しにリンクを追加
            behavior: 'wrap',
            properties: {
                className: ['heading-anchor']
            }
        })
        .use(rehypeExternalLinks, {  // 外部リンクの安全な処理
            target: '_blank',
            rel: ['noopener', 'noreferrer']
        })
        .use(rehypePrism, {ignoreMissing: true})
        .use(rehypeSanitize, sanitizeSchema)
        .use(rehypeStringify)
        .process(markdown);

    return result.toString();
}

