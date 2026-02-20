# `src/app/blog/page.tsx` 廃止について

## 概要

`src/app/blog/page.tsx` を削除しました。

## 背景

`src/app/blog/page.tsx` は `/blog` へのアクセスを `/` にリダイレクトするだけのファイルでした。
後方互換性のために残されていましたが、不要と判断したため削除します。

## 変更内容

### 削除したファイル

- `src/app/blog/page.tsx`

### 変更したファイル

- `docs/developer-specification.md`: `blog/page.tsx` に関する記述を削除

## 影響範囲

`/blog` へのアクセスは、削除後は Next.js のデフォルト動作に従い 404 となります。
`/blog` へのリンクが存在する場合は、`/` に変更してください。
