import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMetadata, PostPreview } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * postsディレクトリの存在確認
 * サーバレス環境では実行時に書き込めないため、存在しない場合はエラーではなく
 * 空配列を返すよう呼び出し側で対処する
 */
function ensurePostsDirectory(): boolean {
  return fs.existsSync(postsDirectory);
}

/**
 * ファイル名からslugを生成
 * 例: 2024-01-15-first-post.md → first-post
 * @param fileName ファイル名（拡張子なし）
 * @returns slug文字列
 */
function generateSlugFromFileName(fileName: string): string {
  const parts = fileName.split('-');
  // 日付部分（YYYY-MM-DD）を除去
  if (
    parts.length >= 4 &&
    /^\d{4}$/.test(parts[0]) &&
    /^\d{2}$/.test(parts[1]) &&
    /^\d{2}$/.test(parts[2])
  ) {
    return parts.slice(3).join('-');
  }
  return fileName;
}

/**
 * すべての記事のslugを取得
 * @returns slug文字列の配列
 */
export function getPostSlugs(): string[] {
  if (!ensurePostsDirectory()) {
    return [];
  }
  
  const files = fs.readdirSync(postsDirectory);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const fileName = file.replace(/\.md$/, '');
      return generateSlugFromFileName(fileName);
    });
}

/**
 * 指定されたslugの記事を取得
 * @param slug 記事のslug
 * @returns Post オブジェクトまたはnull
 */
export function getPostBySlug(slug: string): Post | null {
  if (!ensurePostsDirectory()) {
    return null;
  }
  
  const files = fs.readdirSync(postsDirectory);
  const matchingFile = files.find((file) => {
    if (!file.endsWith('.md')) return false;
    const fileName = file.replace(/\.md$/, '');
    const fileSlug = generateSlugFromFileName(fileName);
    return fileSlug === slug;
  });

  if (!matchingFile) {
    return null;
  }

  const fullPath = path.join(postsDirectory, matchingFile);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const metadata = data as PostMetadata;

  // published が明示的に false の場合は null を返す
  if (metadata.published === false) {
    return null;
  }

  return {
    slug,
    title: metadata.title || 'タイトルなし',
    date: metadata.date || new Date().toISOString(),
    author: metadata.author || '著者不明',
    tags: metadata.tags || [],
    description: metadata.description || '',
    image: metadata.image,
    published: metadata.published === undefined ? true : metadata.published,
    content,
  };
}

/**
 * すべての公開済み記事を取得
 * @returns Post配列（日付の降順でソート）
 */
export function getAllPosts(): PostPreview[] {
  if (!ensurePostsDirectory()) {
    return [];
  }
  
  const files = fs.readdirSync(postsDirectory);

  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const fileName = file.replace(/\.md$/, '');
      const slug = generateSlugFromFileName(fileName);

      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      const metadata = data as PostMetadata;

      // 公開フラグが false の記事は除外
      if (metadata.published === false) {
        return null;
      }

      const preview: PostPreview = {
        slug,
        title: metadata.title || 'タイトルなし',
        date: metadata.date || new Date().toISOString(),
        author: metadata.author || '著者不明',
        tags: Array.isArray(metadata.tags) ? metadata.tags : [],
        description: metadata.description || '',
        image: metadata.image,
        published: metadata.published === undefined ? true : metadata.published,
      };

      return preview;
    })
    .filter((post): post is PostPreview => post !== null)
    .sort((a, b) => {
      // 日付の降順でソート
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return posts;
}

/**
 * 記事を検索
 * @param query 検索クエリ文字列
 * @param tags タグによる絞り込み（オプション）
 * @returns マッチしたPost配列
 */
export function searchPosts(query?: string, tags?: string[]): PostPreview[] {
  const allPosts = getAllPosts();

  return allPosts.filter((post) => {
    // タグによる絞り込み
    if (tags && tags.length > 0) {
      const hasMatchingTag = tags.some((tag) => post.tags.includes(tag));
      if (!hasMatchingTag) return false;
    }

    // クエリ文字列による検索
    if (query) {
      const lowerQuery = query.toLowerCase();
      const matchesTitle = post.title.toLowerCase().includes(lowerQuery);
      const matchesDescription = post.description.toLowerCase().includes(lowerQuery);
      return matchesTitle || matchesDescription;
    }

    return true;
  });
}
