# nextjs_headless_test

WordPressをHeadless CMSとして使い、Next.js側で投稿を表示する検証用プロジェクトです。

## 事前準備

1. LocalでWordPressサイト（例: `poppoint`）を起動
2. WordPress側で投稿を1件以上作成

## 環境変数

`.env.local` を作成して、WordPress APIのベースURLを指定します。

```bash
cp .env.local.example .env.local
```

Windows PowerShellの場合:

```powershell
Copy-Item .env.local.example .env.local
```

## 起動

```bash
npm install
npm run dev
```

`npm run dev` は `3001` ポートで起動します。  
ブラウザで `http://localhost:3001` を開いて確認します。

## 動作内容

- `src/app/page.tsx` で `NEXT_PUBLIC_WP_API_BASE/posts` を取得
- 取得した投稿一覧をNext.jsで表示
- これは「WordPressで編集 / Next.jsで表示」の最小検証です
