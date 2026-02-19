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
            dangerouslySetInnerHTML={{__html: content}}
        />
    );
}

