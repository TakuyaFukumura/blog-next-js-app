import {getAllPosts} from '@/lib/posts';
import BlogList from '@/app/components/BlogList';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'ブログ記事一覧 | Blog App',
    description: 'すべてのブログ記事を閲覧できます',
};

/**
 * ブログ記事一覧ページ
 */
export default function Home() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        ブログ記事一覧
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        {posts.length}件の記事があります
                    </p>
                </div>

                <BlogList posts={posts}/>
            </div>
        </div>
    );
}

