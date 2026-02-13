import Link from 'next/link';
import { PostPreview } from '@/types/post';

interface BlogCardProps {
  post: PostPreview;
}

/**
 * ブログ記事カードコンポーネント
 * 記事一覧ページで使用される個別の記事カード
 */
export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
            <time dateTime={post.date}>
              {new Date(post.date + 'T00:00:00Z').toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'UTC',
              })}
            </time>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
