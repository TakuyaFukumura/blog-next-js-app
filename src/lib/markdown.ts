import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';

/**
 * MarkdownをHTMLに変換する
 * @param markdown Markdown文字列
 * @returns 変換されたHTML文字列
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
