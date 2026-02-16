interface MarkdownContentProps {
    content: string;
}

/**
 * Markdownコンテンツ表示コンポーネント
 * サニタイズ済みのHTML文字列を表示（サニタイズはmarkdownToHtml内で実施）
 */
export default function MarkdownContent({content}: MarkdownContentProps) {
    return (
        <div
            className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
        prose-p:text-gray-700 dark:prose-p:text-gray-300
        prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
        prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:text-gray-800 dark:prose-pre:text-gray-200 prose-pre:border prose-pre:border-gray-300 dark:prose-pre:border-gray-700
        prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
        prose-ul:text-gray-700 dark:prose-ul:text-gray-300
        prose-ol:text-gray-700 dark:prose-ol:text-gray-300
        prose-li:text-gray-700 dark:prose-li:text-gray-300
        prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/30 prose-blockquote:py-2
        prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
        prose-table:border-collapse prose-table:w-full prose-table:border-2 prose-table:border-gray-400 dark:prose-table:border-gray-600 prose-table:shadow-sm
        prose-th:border-2 prose-th:border-gray-400 dark:prose-th:border-gray-600
        prose-th:bg-gray-200 dark:prose-th:bg-gray-700
        prose-th:p-3 prose-th:text-gray-900 dark:prose-th:text-white prose-th:font-bold
        prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600
        prose-td:p-3 prose-td:text-gray-700 dark:prose-td:text-gray-300 prose-td:bg-white dark:prose-td:bg-gray-800"
            dangerouslySetInnerHTML={{__html: content}}
        />
    );
}
