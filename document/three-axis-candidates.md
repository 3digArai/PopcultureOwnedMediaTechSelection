# 3軸候補一覧（CMS / フロント / サーバー）

## 目的
- 技術選定を `CMS` `フロントエンド` `サーバー/配信` の3軸で分離して検討できるようにする。

## 1. CMS候補（編集基盤）

### 単体表示できるCMS
- WordPress
- Movable Type
- Drupal
- Ghost

### Headless前提CMS
- microCMS
- Contentful
- Sanity
- Hygraph
- Strapi

### CMSなし（Git/ファイル運用）
- Markdown（Astro/Hugo/Next MDX）
- JSON/YAML管理

## 2. フロントエンド候補（表示実装）

### React系
- Next.js
- Astro（必要箇所だけIsland）
- React + Vite

### Vue系
- Nuxt 3

### その他
- SvelteKit
- 素のHTML/CSS/TS

## 3. サーバー/配信候補（実行基盤）

### 静的配信（CDN中心）
- Vercel（Static/Edge）
- Cloudflare Pages
- Netlify
- AWS S3 + CloudFront

### Nodeアプリ配信（SSR含む）
- Vercel（Node/Edge）
- Render
- Fly.io
- AWS（ECS/Fargate, EC2）

### CMSホスティング/マネージド
- WordPressマネージドホスティング（Kinsta/WP Engine 等）
- Headless CMS SaaS標準ホスティング（microCMS/Contentful/Sanity等）

### BaaS連携
- Supabase
- Firebase
- Appwrite（Self-host可）
- PocketBase（Self-host）

## 4. まず比較対象に残す最小セット（初期案）

- CMS: `WordPress` `microCMS` `Sanity` `Markdown運用`
- フロント: `Next.js` `Astro` `素のHTML/CSS/TS`
- サーバー/配信: `Vercel` `Cloudflare Pages` `AWS` `マネージドWPホスティング`

## 5. 次ステップ
- この最小セットから組み合わせ案を作る（例: `WordPress + Next.js + Vercel`）。
- 組み合わせ単位で `evaluation-criteria.md` に沿って採点する。

## 6. 段階比較基準（組み合わせ爆発を防ぐ）

### Gate 1: 軸ごとの確認（除外より条件整理）

#### CMS軸
- 非エンジニアが更新できること（または運用体制で補えること）
- 引き継ぎ資料を作りやすいこと
- 日本語運用で致命的な障壁がないこと

#### フロント軸
- 必要なブランド表現を実装できること
- SEO要件（メタ/OGP/構造化）を実装可能であること
- 運用チームの技術力で保守可能であること

#### サーバー/配信軸
- 社内方針（AWS利用）と矛盾しないこと
- セキュリティ・運用責任範囲が明確であること
- 想定トラフィックに対応可能であること

### Gate 2: 軸単体の評価（最低1案は残す）
- CMSは `最低1案`（推奨2〜3案）を残す
- フロントは `最低1案`（推奨2案）を残す
- サーバー/配信は `最低1案`（推奨2案）を残す
- どのカテゴリも「0件にはしない」

### Gate 3: 相性NGは「即除外」ではなく要注意フラグ
- `素のHTML/CSS/TS` × `非エンジニア大量更新` は原則除外
- `Headless CMS` × `フロント実装体制なし` は除外
- `運用体制にない技術`（例: 専門人材不在）を含む案は除外

※ 上記はまず「要注意」として記録し、最終比較の対象には最低1案残す。

### Gate 4: 最終比較対象を3〜5案に制限
- 例:
  - `WordPress + Astro + AWS`
  - `WordPress + Next.js + AWS`
  - `microCMS + Next.js + AWS`
  - `Sanity + Astro + AWS`
  - `Markdown運用 + Astro + AWS`

### Gate 5: 最終採点と意思決定
- 最終候補3〜5案だけを `evaluation-criteria.md` で採点
- 1位案 + 次点案（バックアップ）を決める
- 採用理由と不採用理由を短く記録して引き継ぐ

## 7. 全要素カバレッジ用 組み合わせ案

`初期案`にある要素（CMS 4種 / フロント3種 / サーバー4種）を、最低1回ずつ出すための実務向けセット。

※ `マネージドWPホスティング` は実質 `WordPress` とセットになるため、現実的には `5案` が必要。

| No | CMS | フロント | サーバー/配信 | ねらい |
|---|---|---|---|---|
| 1 | WordPress | Next.js | AWS | WP運用 + 高自由度フロント + 社内基盤適合 |
| 2 | microCMS | Astro | Vercel | Headlessの軽量高速運用を確認 |
| 3 | Sanity | 素のHTML/CSS/TS | Cloudflare Pages | Headless + 最小フロントの実現性確認 |
| 4 | Markdown運用 | Astro | AWS | CMSなし静的運用の最小コスト案を確認 |
| 5 | WordPress | 素のHTML/CSS/TS | マネージドWPホスティング | WP単体運用寄りの現実解を確認 |

### カバレッジ確認
- CMS: `WordPress` `microCMS` `Sanity` `Markdown運用` を網羅
- フロント: `Next.js` `Astro` `素のHTML/CSS/TS` を網羅
- サーバー/配信: `Vercel` `Cloudflare Pages` `AWS` `マネージドWPホスティング` を網羅
