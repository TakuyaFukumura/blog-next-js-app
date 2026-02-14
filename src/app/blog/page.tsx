import { redirect } from 'next/navigation';

/**
 * /blog へのアクセスを / にリダイレクト
 * 後方互換性のために残しています
 */
export default function BlogRedirect() {
  redirect('/');
}

