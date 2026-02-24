# wordpress_test

このフォルダは、WordPressで「自分でコーディングしてデザインを試す」ための最小テーマです。

## 構成
- `wp-content/themes/pc-minimal-theme/style.css`
  - 色、文字、カードUIなど見た目を変更する場所
- `wp-content/themes/pc-minimal-theme/index.php`
  - 画面構造（ヘッダー、記事カードなど）を変更する場所
- `wp-content/themes/pc-minimal-theme/functions.php`
  - CSS/JS読み込みなどの処理を書く場所

## 試し方（LocalWP等を使う場合）
1. WordPressローカル環境を作る
2. この `wp-content/themes/pc-minimal-theme` をサイトの `wp-content/themes/` に置く
3. 管理画面の `外観 > テーマ` で `PC Minimal Theme` を有効化
4. `style.css` の色や余白を変更して、見た目が変わるか確認

## まず触ると分かりやすい箇所
- `style.css` の `--accent` を変更（リンク色が変わる）
- `style.css` の `body` 背景を変更
- `index.php` の `site-title` を増やして構造変更を確認

## 注意
- これは検証用の最小テーマです。
- 本番利用前に、テンプレート分割（header.php / footer.php など）やアクセシビリティ対応を追加してください。
