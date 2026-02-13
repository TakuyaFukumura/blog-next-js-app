import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { markdownToHtml } from '@/lib/markdown';
import MarkdownContent from '@/app/components/MarkdownContent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

/**
 * 静的パスを生成
 * 公開済みの記事のみを対象とする
 */
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * メタデータを生成
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: '記事が見つかりません',
    };
  }

  return {
    title: `${post.title} | Blog App`,
    description: post.description,
  };
}

/**
 * ブログ記事詳細ページ
 */
export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = await markdownToHtml(post.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 戻るリンク */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            記事一覧に戻る
          </Link>
        </div>

        {/* 記事コンテンツ */}
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <header className="px-8 pt-12 pb-8 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{post.author}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="px-8 py-12">
            <MarkdownContent content={htmlContent} />
          </div>
        </article>
      </div>
    </div>
  );
}
