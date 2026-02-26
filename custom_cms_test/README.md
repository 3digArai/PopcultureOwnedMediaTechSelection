# Custom CMS Test (Self-built)

microCMS代替として「自作CMS」を検証するための最小PoCです。  
ローカルで投稿管理と公開表示を一通り試せます。

## 構成

- APIサーバー: Express
- データ保存: `data/posts.json`
- 管理画面: `/admin`（ログイン後に投稿CRUD）
- 公開画面: `/`（公開済み一覧）, `/post.html?slug=...`（詳細）

## セットアップ

```bash
npm install
copy .env.example .env
```

`.env` 例:

```env
PORT=3005
CMS_ADMIN_USER=admin
CMS_ADMIN_PASS=change-me
```

## 起動

```bash
npm run dev
```

- 公開一覧: `http://localhost:3005/`
- 管理画面: `http://localhost:3005/admin`

## このPoCで確認できること

- 投稿の作成/編集/削除
- `draft / published` 切り替え
- 公開済み記事のみをフロントに表示

## 注意

- 認証・権限・監査ログなどは最小実装で、本番品質ではない
- 保存先はJSONファイルのため、複数人同時編集や大規模運用には不向き
