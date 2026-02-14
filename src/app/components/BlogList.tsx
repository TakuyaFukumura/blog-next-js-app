import { PostPreview } from '@/types/post';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: PostPreview[];
}

/**
 * ブログ記事一覧コンポーネント
 * 記事カードのグリッドレイアウトを提供
 */
export default function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          記事が見つかりませんでした。
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
