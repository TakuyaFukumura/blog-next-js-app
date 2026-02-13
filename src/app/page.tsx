import Link from 'next/link';

export default function Home() {
    return (
        <div
            className="font-sans flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <main className="text-center p-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
                    <h1 className="text-5xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                        ようこそ
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                        Next.js + TypeScript + Tailwind CSS で構築されたブログアプリケーションです
                    </p>

                    <div className="mb-8">
                        <Link
                            href="/blog"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            ブログを見る
                        </Link>
                    </div>

                    <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                        <p>Markdownファイルから記事を読み込んで表示します</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            Next.js 16 • TypeScript • Tailwind CSS 4
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
