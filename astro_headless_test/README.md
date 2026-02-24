# Astro + WordPress Headless Test

WordPress API (`/wp-json/wp/v2`) を Astro で表示する最小検証です。  
目的は `nextjs_headless_test` と同じ条件で比較することです。

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
PUBLIC_WP_API_BASE=http://poppoint.local/wp-json/wp/v2
```

## 起動

```bash
npm run dev
```

- Astro: `http://localhost:3002`
- 投稿一覧: `/`
- 投稿詳細: `/posts/{id}`

## 今回の比較ポイント

- 一覧と詳細の2ページ構成
- WordPress本文HTML (`content.rendered`) の描画
- Gutenbergの `カラム` / `詳細(FAQ)` を想定したスタイル対応

## Next.js版との違い（実務感）

- 実装の考え方はほぼ同じ（API取得して描画）
- Astroは静的生成ベースで軽量に始めやすい
- Next.jsは動的ルーティングや周辺機能が厚く拡張しやすい
