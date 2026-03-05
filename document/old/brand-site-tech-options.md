# ブランドサイト向け 技術候補一覧

## 前提
- 目的: ポップカルチャー紹介を主軸にしたブランドサイト/オウンドメディアの構築
- 重視: 継続運用、将来の引き継ぎ、更新しやすさ、必要十分な拡張性

## 技術候補（定番 + 発展）

| 区分 | 構成例 | サイト例（タイプ） | 向いているケース | 強み | 注意点 |
|---|---|---|---|---|---|
| 定番CMS | WordPress（テーマ + 必要最小限プラグイン） | 記事中心のブランドメディア、ニュース更新型 | 記事更新が多い、編集者主体、引き継ぎ重視 | 導入実績が多く人材確保しやすい。管理画面が分かりやすい。 | プラグイン依存や保守設計を誤ると負債化しやすい。 |
| Headless | Headless CMS（microCMS/Contentful/Sanity等）+ Next.js/Nuxt | 世界観重視のブランドサイト、特集LP量産型 | 体験設計や表示速度、拡張性を重視 | フロントの自由度が高く、将来のチャネル展開に強い。 | 実装・運用の難易度とコストが上がる。 |
| 静的サイト | Astro/Hugo/Eleventy + CMS or Markdown | 企業ブランドサイト + お知らせ、読み物数が中程度 | ページ構成が比較的固定、堅牢性重視 | 高速・低コスト・セキュアにしやすい。 | 編集導線を作らないと非エンジニア運用が難しい。 |
| 自作フロント | HTML + CSS + TypeScript（必要に応じてVite等） | キャンペーンサイト、短期公開の特設ページ | 短期立ち上げ、限定機能、技術者運用 | 学習コストが低く開始が速い。自由度が高い。 | 属人化しやすく、CMS機能を後から作ると急激に重くなる。 |
| GitベースCMS | Astro/Next + Decap CMS（Git連携） | 開発チーム主導の小規模ブランドメディア | GitHub運用に慣れた小規模チーム | 低コストでレビュー履歴を残しやすい。 | 非エンジニアには運用ハードルが残る。 |
| ノーコードCMS | Webflow + CMS / STUDIO + CMS | デザイン先行のブランドサイト、少人数運用 | ブランド表現重視、少人数で高速運用 | デザイン変更が速く、制作フローが短い。 | 高度な要件で制約が出る。将来移行時の設計配慮が必要。 |
| Backend as a Service | Supabase/Firebase + Next/Astro | コミュニティ機能付きブランドサイト | 会員機能、投稿、リアルタイム要素を持つサイト | 認証・DB・配信を短期間で組み込める。 | 設計次第でランニングコスト/依存度が高まる。 |
| モノレポ運用 | Turborepo + Next/Astro + 共通UI | 複数ブランド/複数国サイトを同時展開 | 複数サイトやLP群を継続的に展開 | 再利用性と開発効率を高めやすい。 | 初期設計を誤ると複雑化しやすい。 |
| 生成支援運用 | 既存構成 + AI補助（記事下書き、画像タグ、SEO案） | 更新量が多い編集チームの運用基盤 | 更新頻度が高く制作工数を抑えたい | 編集速度の改善に効く。運用標準化しやすい。 | 品質担保フロー（レビュー/校正）を必ず設計する。 |

## 具体例（全候補）

※ 2026-02-17時点で確認。公開情報またはHTMLシグネチャベースのため、将来変更される可能性あり。

| 技術候補 | 具体例（サイト/公開事例） | 確認ポイント |
|---|---|---|
| WordPress（通常CMS） | LIGブログ https://liginc.co.jp | `wp-content` / `wp-includes` リソースを確認。 |
| Headless / Next.js系 | Zenn https://zenn.dev / ファミ通 https://www.famitsu.com | `/_next/static/` 配信パスを確認。 |
| 静的サイト（軽量構成） | ほぼ日刊イトイ新聞 https://www.1101.com/home.html | 記事導線が中心で、`.html`ベースの軽量公開構成が確認できる。 |
| HTML/CSS/JS直書きに近い構成 | デイリーポータルZ https://dailyportalz.jp | 記事更新型メディアを、比較的シンプルなフロント構成で運用している例。 |
| GitベースCMS（Decap CMS） | Decap CMS公式 https://decapcms.org / Decap CMSリポジトリ https://github.com/decaporg/decap-cms | Git連携で運用する構成の公開事例。 |
| ノーコードCMS（Webflow/STUDIO） | STUDIO公式 https://studio.design/ja / Huuuu https://huuuu.jp | `production-os-assets` 配信シグネチャを確認。 |
| Backend as a Service（Supabase/Firebase） | Next.js + Firebase例 https://github.com/vercel/next.js/tree/canary/examples/with-firebase / Supabase事例 https://supabase.com/customers | 認証・DBを外部サービスで持つ構成の公開事例。 |
| モノレポ運用（Turborepo） | Turborepo公式 https://turborepo.com/docs / Vercelテンプレート https://vercel.com/templates/next.js/monorepo-turborepo | 複数アプリを1リポジトリ管理する運用の公開例。 |
| 生成支援運用（AI補助） | STUDIOブログ https://studio.design/ja/blog / Notion AI https://www.notion.com/ja/product/ai | 記事制作の下書き・要約・改善を補助する運用機能の公開例。 |

参照:
- STUDIO導入事例: https://studio.design/ja/customers

## ブランドサイト用途での見方

- ブランド表現最優先: `Headless` / `ノーコードCMS`
- 継続運用・引き継ぎ最優先: `WordPress（定番CMS）`
- 高速・堅牢・低コスト優先: `静的サイト`
- まず小さく検証したい: `自作フロント` or `ノーコードCMS`

## 実務上の初期候補（比較テーブルに残すべき軸）

1. WordPress（通常CMS）
2. Headless CMS + Next.js
3. Astro等の静的サイト + CMS
4. HTML/CSS/TS自作（限定採用条件付き）
5. ノーコードCMS（Webflow/STUDIO）

この5案を基準に、次ステップで「運用体制・予算・更新頻度・将来拡張」をパラメータ化すると、採用判断の説明責任を満たしやすい。

※ 補足: 将来、物販や会員購入導線を強く持たせる方針に変わる場合のみ `Shopify活用` を再検討する。
