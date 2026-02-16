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
        prose-h1:text-4xl prose-h1:font-extrabold prose-h1:mb-6 prose-h1:mt-0 prose-h1:text-gray-900 dark:prose-h1:text-white
        prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h2:pb-2 prose-h2:text-gray-800 dark:prose-h2:text-gray-100
        prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-gray-800 dark:prose-h3:text-gray-100
        prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-2 prose-h4:text-gray-700 dark:prose-h4:text-gray-200
        prose-h5:text-lg prose-h5:font-semibold prose-h5:mt-4 prose-h5:mb-2 prose-h5:text-gray-700 dark:prose-h5:text-gray-200
        prose-h6:text-base prose-h6:font-semibold prose-h6:mt-4 prose-h6:mb-2 prose-h6:text-gray-700 dark:prose-h6:text-gray-200
        prose-p:text-base prose-p:leading-[1.75] prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:mb-4
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:underline prose-a:decoration-2 prose-a:decoration-blue-400/50 prose-a:underline-offset-2 prose-a:transition-colors prose-a:duration-200 prose-a:hover:text-blue-700 dark:prose-a:hover:text-blue-300
        prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-white
        prose-em:italic
        prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-gray-300 dark:prose-code:border-gray-700
        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:shadow-lg prose-pre:border prose-pre:border-gray-700 dark:prose-pre:border-gray-600 prose-pre:overflow-x-auto
        prose-ul:list-disc prose-ul:ml-6 prose-ul:space-y-2 prose-ul:marker:text-blue-600 dark:prose-ul:marker:text-blue-400
        prose-ol:list-decimal prose-ol:ml-6 prose-ol:space-y-2 prose-ol:marker:text-blue-600 dark:prose-ol:marker:text-blue-400 prose-ol:marker:font-semibold
        prose-li:text-gray-700 dark:prose-li:text-gray-300
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/20 prose-blockquote:pl-4 prose-blockquote:py-3 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
        prose-table:w-full prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-600 prose-table:rounded-lg prose-table:shadow-md prose-table:overflow-hidden
        prose-thead:bg-gray-100 dark:prose-thead:bg-gray-800
        prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-bold prose-th:text-gray-900 dark:prose-th:text-white prose-th:border-b-2 prose-th:border-gray-300 dark:prose-th:border-gray-600
        prose-tbody:prose-tr:bg-white dark:prose-tbody:prose-tr:bg-gray-700
        prose-tr:border-b prose-tr:border-gray-200 dark:prose-tr:border-gray-700
        prose-tr:even:bg-gray-50 dark:prose-tr:even:bg-gray-600
        prose-tbody:prose-tr:hover:bg-gray-100 dark:prose-tbody:prose-tr:hover:bg-gray-500 prose-tbody:prose-tr:transition-colors prose-tbody:prose-tr:duration-150
        prose-td:px-4 prose-td:py-3 prose-td:text-gray-700 dark:prose-td:text-gray-300"
            dangerouslySetInnerHTML={{__html: content}}
        />
    );
}

