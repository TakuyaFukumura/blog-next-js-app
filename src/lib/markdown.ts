import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import rehypeSanitize from 'rehype-sanitize';

/**
 * MarkdownをHTMLに変換する
 * XSS対策としてrehype-sanitizeを使用してサニタイズを実施
 * @param markdown Markdown文字列
 * @returns サニタイズされた変換後のHTML文字列
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}

