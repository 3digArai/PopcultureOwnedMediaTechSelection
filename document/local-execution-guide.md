# 検証プロジェクト実行手順書

## 目的
- このリポジトリで実際に試した検証プロジェクトを、同じ手順で再実行できるようにする。

## 共通前提
- Node.js と npm がインストール済み
- ルートディレクトリ: `PopcultureOwnedMediaTechSelection`
- WordPress連携系は `poppoint.local` のWordPressが起動済み

## LocalWPインストールとWordPress起動手順
1. LocalWPをインストール
- 公式サイトから `Local` をダウンロードしてインストール
- 初回起動時にアカウント作成/ログイン（必要な場合）

2. ローカルサイトを作成
- `Create a new site` を選択
- サイト名を入力（例: `poppoint`）
- 環境は `Preferred` で作成してOK
- WordPress管理者ユーザーを設定して作成完了

3. サイトを起動
- Localのサイト一覧から `poppoint` を選択
- `Start site` を押す

4. WordPress管理画面を開く
- Localの `WP Admin` ボタンから開く
- URLは通常 `http://poppoint.local/wp-admin/`

5. REST APIのベースURL確認
- ブラウザで `http://poppoint.local/wp-json/wp/v2/posts` を開く
- JSONが表示されればAPIアクセスOK
- このベースURL `http://poppoint.local/wp-json/wp/v2` を `.env` に設定する

## 実行一覧（クイック参照）
- `nextjs_headless_test`: `npm run dev` -> `http://localhost:3001`
- `astro_headless_test`: `npm run dev` -> `http://localhost:3002`
- `vanilla_headless_test`: `npm run dev` -> `http://localhost:3003`
- `microcms_headless_test`: `npm run dev` -> `http://localhost:3004`
- `custom_cms_test`: `npm run dev` -> `http://localhost:3005`
- `image-to-code-test`: `index.html` をブラウザで直接開く
- `wordpress_test`: LocalWP上のWordPressでテーマ有効化

## 1. Next.js + WordPress Headless
- 対象: `nextjs_headless_test`

### セットアップ
```powershell
cd nextjs_headless_test
npm install
Copy-Item .env.local.example .env.local
```

`.env.local` 例:
```env
NEXT_PUBLIC_WP_API_BASE=http://poppoint.local/wp-json/wp/v2
```

`NEXT_PUBLIC_WP_API_BASE` の確認方法:
- LocalWPで対象サイトを起動
- Localに表示される `Site domain`（例: `poppoint.local`）を確認
- `http://<Site domain>/wp-json/wp/v2/posts` にアクセスしてJSONが返ることを確認
- `http://<Site domain>/wp-json/wp/v2` を `.env.local` に設定
- 例: サイトドメインが `mymedia.local` なら `http://mymedia.local/wp-json/wp/v2`

### 起動
```powershell
npm run dev
```

### 確認
- 一覧: `http://localhost:3001/`
- 詳細: `http://localhost:3001/posts/{id}`

## 2. Astro + WordPress Headless
- 対象: `astro_headless_test`

### セットアップ
```powershell
cd astro_headless_test
npm install
Copy-Item .env.example .env
```

`.env` 例:
```env
PUBLIC_WP_API_BASE=http://poppoint.local/wp-json/wp/v2
```

### 起動
```powershell
npm run dev
```

### 確認
- 一覧: `http://localhost:3002/`
- 詳細: `http://localhost:3002/posts/{id}`

## 3. Vanilla HTML/CSS/TS + WordPress Headless
- 対象: `vanilla_headless_test`

### セットアップ
```powershell
cd vanilla_headless_test
npm install
Copy-Item .env.example .env
```

`.env` 例:
```env
VITE_WP_API_BASE=http://poppoint.local/wp-json/wp/v2
```

### 起動
```powershell
npm run dev
```

### 確認
- 一覧: `http://localhost:3003/`
- 詳細: `http://localhost:3003/post.html?id={id}`

## 4. microCMS + Next.js Headless
- 対象: `microcms_headless_test`

### microCMS側の事前準備（アカウント・API設定）
1. アカウント作成
- `https://microcms.io/` でサインアップ
- メール認証を完了してログイン

2. サービス作成
- ダッシュボードで新規サービスを作成
- サービスID（`xxx.microcms.io` の `xxx` 部分）を控える

3. API作成（例: `posts`）
- 種別は通常の「リスト形式」を選択
- エンドポイント名を `posts` に設定

4. フィールド定義
- `title`（テキスト）
- `excerpt`（テキストエリア）
- `body`（テキストエリア推奨。リッチエディタでも可）
- 必要に応じて `thumbnail`（画像）も追加

5. APIキー発行
- 対象APIにアクセス可能なキーを発行
- 少なくとも `GET` 権限を有効化
- 発行したAPIキーを控える

6. テストコンテンツ作成
- `posts` に1件以上公開コンテンツを作成
- 下書きではなく「公開」状態にする

### セットアップ
```powershell
cd microcms_headless_test
npm install
Copy-Item .env.local.example .env.local
```

`.env.local` 例:
```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
MICROCMS_ENDPOINT=posts
```

### 起動
```powershell
npm run dev
```

### 確認
- 一覧: `http://localhost:3004/`
- 詳細: `http://localhost:3004/posts/{id}`

## 5. 自作CMS検証（Express）
- 対象: `custom_cms_test`

### セットアップ
```powershell
cd custom_cms_test
npm install
Copy-Item .env.example .env
```

`.env` 例:
```env
PORT=3005
CMS_ADMIN_USER=admin
CMS_ADMIN_PASS=change-me
```

### 起動
```powershell
npm run dev
```

### 確認
- 公開一覧: `http://localhost:3005/`
- 管理画面: `http://localhost:3005/admin`

## 6. Image to Code 検証
- 対象: `image-to-code-test`

### 起動
- `image-to-code-test/index.html` をブラウザで開く

## 7. WordPressテーマ検証（LocalWP）
- 対象: `wordpress_test`

### 前提
- LocalWPでサイト（例: `poppoint`）作成済み

### テーマ配置
- 検証テーマ:
  - `wordpress_test/wp-content/themes/pc-minimal-theme`
  - `wordpress_test/wp-content/themes/pc-massively-theme`
- LocalWPの対象サイト配下 `app/public/wp-content/themes/` にコピー

### 有効化
- WordPress管理画面: `外観 > テーマ`
- `PC Minimal Theme` または `PC Massively Inspired` を有効化

### `PC Massively Inspired` の追加手順
1. 固定ページを2つ作成（例: `Main` と `投稿一覧`）
2. `Main` にショートコードを記載
```text
[pc_featured_post]
[pc_post_list title="Latest Posts" posts_per_page="6"]
```
3. `設定 > 表示設定`:
- ホームページ: `Main`
- 投稿ページ: `投稿一覧`
4. 必要なら `外観 > カスタマイズ > Hero Settings` でヒーロー背景画像を設定

## トラブル時チェック
- ポート重複: 別プロセス停止 or `package.json` のポート変更
- 環境変数未設定: `.env` / `.env.local` のファイル名とキー名を再確認
- WordPress API取得失敗: `poppoint.local/wp-json/wp/v2/posts` にブラウザでアクセス確認
- microCMS取得失敗: サービスドメイン、APIキー、エンドポイント名を再確認
