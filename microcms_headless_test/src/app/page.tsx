import styles from "./page.module.css";
import { getApiInfoForDisplay, getPosts, type MicroCmsPost } from "@/lib/microcms";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  let posts: MicroCmsPost[] = [];
  let errorMessage = "";

  try {
    posts = await getPosts();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unknown error";
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.badge}>Headless Test</p>
          <h1>microCMS Posts in Next.js</h1>
          <p className={styles.lead}>
            microCMSのコンテンツをAPIで取得して一覧表示します。
          </p>
        </header>

        {errorMessage ? (
          <p className={styles.error}>投稿取得エラー: {errorMessage}</p>
        ) : (
          <section className={styles.list}>
            {posts.map((post) => (
              <article key={post.id} className={styles.card}>
                <h2>{post.title}</h2>
                <p className={styles.meta}>
                  {post.publishedAt || post.createdAt
                    ? new Date(post.publishedAt ?? post.createdAt ?? "").toLocaleDateString("ja-JP")
                    : "date unknown"}
                </p>
                {post.excerpt ? (
                  <p className={styles.excerpt}>{post.excerpt}</p>
                ) : (
                  <p className={styles.excerpt}>excerptなし</p>
                )}
                <Link className={styles.link} href={`/posts/${post.id}`}>
                  詳細を見る
                </Link>
              </article>
            ))}
          </section>
        )}

        <div className={styles.note}>
          <p>
            API Info: <code>{getApiInfoForDisplay()}</code>
          </p>
        </div>
      </main>
    </div>
  );
}
