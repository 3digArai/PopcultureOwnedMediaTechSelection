# HTML/CSS/TS + WordPress Headless Test

フレームワークを使わず、`HTML/CSS/TypeScript` で WordPress REST API を表示する検証です。

## 前提

- `poppoint.local` で WordPress が起動している
- 投稿を1件以上作成している

## セットアップ

```bash
npm install
copy .env.example .env
```

`.env` の例:

```env
VITE_WP_API_BASE=http://poppoint.local/wp-json/wp/v2
```

## 起動

```bash
npm run dev
```

- フロント: `http://localhost:3003`
- 投稿一覧: `/`
- 投稿詳細: `/post.html?id={id}`

## 実装ファイル

- 投稿一覧: `src/main.ts`
- 投稿詳細: `src/post.ts`
- APIクライアント: `src/wp.ts`
- スタイル: `src/style.css`

## メモ

- `content.rendered` をそのまま描画するため、WordPress側のブロック設計とフロントCSSを揃えるのが重要。
- この構成は依存が少ない一方、ルーティングや高度機能は自前実装が増える。
