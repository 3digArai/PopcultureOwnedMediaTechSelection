# microCMS + Next.js Headless Test

microCMS をCMSとして使い、Next.jsで一覧/詳細を表示する最小検証です。

## 前提

- microCMS サービスを作成済み
- APIキーを発行済み
- `posts`（または任意エンドポイント）を作成済み

推奨フィールド:
- `title`（テキスト）
- `excerpt`（テキストエリア）
- `body`（リッチエディタ）

## セットアップ

```bash
npm install
copy .env.local.example .env.local
```

`.env.local` の例:

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
MICROCMS_ENDPOINT=posts
```

## 起動

```bash
npm run dev
```

- アプリ: `http://localhost:3004`
- 投稿一覧: `/`
- 投稿詳細: `/posts/{id}`

## 実装ファイル

- 一覧: `src/app/page.tsx`
- 詳細: `src/app/posts/[id]/page.tsx`
- APIクライアント: `src/lib/microcms.ts`
- スタイル: `src/app/page.module.css`

## メモ

- APIキーはサーバー側でのみ利用（ブラウザへ直接露出しない構成）。
- `body` はHTML描画しているため、表示ルールはCSSで統一する。
