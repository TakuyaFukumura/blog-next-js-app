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
        prose-code:text-pink-600 dark:prose-code:text-pink-400
        prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:text-gray-800 dark:prose-pre:text-gray-200
        prose-strong:text-gray-900 dark:prose-strong:text-white
        prose-ul:text-gray-700 dark:prose-ul:text-gray-300
        prose-ol:text-gray-700 dark:prose-ol:text-gray-300
        prose-li:text-gray-700 dark:prose-li:text-gray-300
        prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400
        prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
        prose-table:border-collapse prose-table:w-full
        prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700
        prose-th:bg-gray-100 dark:prose-th:bg-gray-800
        prose-th:p-2 prose-th:text-gray-900 dark:prose-th:text-white
        prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700
        prose-td:p-2 prose-td:text-gray-700 dark:prose-td:text-gray-300"
            dangerouslySetInnerHTML={{__html: content}}
        />
    );
}
