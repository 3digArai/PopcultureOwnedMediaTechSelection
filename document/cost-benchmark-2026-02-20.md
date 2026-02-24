# 費用調査メモ（2026-02-20時点）

## 前提
- 価格はすべて `2026-02-20` 時点で公式ページ確認。
- 通貨/課金単位が異なるため、まずは `最低料金` と `従量課金の有無` で比較する。
- AWSは構成で大きく変動するため、固定プランがある `Lightsail` を基準値として併記する。

## 1) CMS費用（編集基盤）

| 要素 | 最低料金の目安 | 課金ポイント |
|---|---:|---|
| WordPress（OSS本体） | $0 | ソフト本体は無料。別途ホスティング費用が必要。 |
| WordPress.com（ホステッド） | Freeあり / Premium $18/月（年払い時の表示あり） / Business $40/月（年払い時の表示あり） | プラン課金（契約期間で単価変動）。 |
| microCMS | Hobby 0円/月 / Team 4,900円〜/月 / Business 75,000円〜/月 | プラン課金 + 一部従量（例: データ転送超過） |
| Sanity | Freeあり / Growth $15/席/月 | 席課金 + 従量（超過利用） |
| Markdown運用（CMSなし） | $0 | CMS費用なし（編集運用は別途設計が必要）。 |

## 2) フロントエンド費用（実装自体）

| 要素 | 最低料金の目安 | 課金ポイント |
|---|---:|---|
| Next.js | $0 | OSS。実行基盤（Vercel/AWS等）で費用発生。 |
| Astro | $0 | OSS。実行基盤で費用発生。 |
| 素のHTML/CSS/TS | $0 | 実装ツールは無料で始めやすい。配信基盤で費用発生。 |

## 3) サーバー/配信費用

| 要素 | 最低料金の目安 | 課金ポイント |
|---|---:|---|
| Vercel | Hobby: Free / Pro: $20/月 + usage | プラン課金 + 使用量課金 |
| Cloudflare Pages | Free: $0 / Pro: $25/月（Pagesページ記載） | 静的配信は無料枠が強い。FunctionsはWorkers課金 |
| Cloudflare Workers（Functions課金） | Free: 100,000 requests/日（Free plan） / Paid: $0.30/100万 requests、$0.02/100万 CPU ms | Functions利用時に従量課金 |
| AWS（Lightsailの目安） | WordPress構成の例: $5/月（インスタンス） + $1/月（オブジェクトストレージ） | 固定バンドル料金。超過転送は従量 |
| AWS（App Runnerの目安） | $0.064/vCPU-hour + $0.007/GB-hour（主要リージョン例） | 従量課金（リソース利用時間ベース） |
| マネージドWPホスティング（Kinsta） | Single 20GB: $35/月（初月無料キャンペーン表示あり） | プラン課金 + 超過/アドオン |

## 4) 初期候補向けの費用比較の見方

- 固定費を比較したい場合: `WordPress + マネージドWP` or `Lightsail` のような固定プランを優先。
- 変動費を抑えたい場合: `静的配信中心（Cloudflare Pages/Vercel Hobby）` を軸に構成。
- 編集運用を重視する場合: CMS費用（microCMS/Sanity/WordPress.com）を先に確定。

## 5) 参考URL（公式）

- microCMS 料金: https://microcms.io/pricing
- Sanity Pricing: https://www.sanity.io/pricing?product=service
- WordPress.com Pricing: https://wordpress.com/pricing/
- Vercel Pricing: https://vercel.com/pricing
- Cloudflare Pages Pricing: https://www.cloudflare.com/developer-platform/products/pages/
- Cloudflare Pages Functions Pricing: https://developers.cloudflare.com/pages/functions/pricing/
- Cloudflare Workers Pricing: https://workers.cloudflare.com/pricing
- Amazon Lightsail Pricing: https://aws.amazon.com/lightsail/pricing/
- AWS App Runner Pricing: https://aws.amazon.com/apprunner/pricing/
- Kinsta Pricing: https://kinsta.com/pricing/
