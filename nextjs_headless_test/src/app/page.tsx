import Link from "next/link";
import styles from "./page.module.css";

type WpPost = {
  id: number;
  date?: string;
  title: { rendered: string };
  excerpt: { rendered: string };
};

async function getPosts(): Promise<WpPost[]> {
  const base =
    process.env.NEXT_PUBLIC_WP_API_BASE ??
    "http://poppoint.local/wp-json/wp/v2";
  const url = `${base}/posts?per_page=10&_fields=id,date,title,excerpt`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }

  return (await res.json()) as WpPost[];
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.badge}>Headless Test</p>
          <h1>WordPress Posts in Next.js</h1>
          <p className={styles.lead}>
            WordPressの投稿を <code>/wp-json/wp/v2/posts</code> から取得して表示します。
          </p>
        </header>

        <section className={styles.list}>
          {posts.map((post) => (
            <article key={post.id} className={styles.card}>
              <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <p className={styles.meta}>
                {post.date
                  ? new Date(post.date).toLocaleDateString("ja-JP")
                  : "date unknown"}
              </p>
              <div
                className={styles.excerpt}
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <Link className={styles.link} href={`/posts/${post.id}`}>
                詳細を見る
              </Link>
            </article>
          ))}
        </section>

        <div className={styles.note}>
          <p>
            API Base: {" "}
            <code>
              {process.env.NEXT_PUBLIC_WP_API_BASE ??
                "http://poppoint.local/wp-json/wp/v2"}
            </code>
          </p>
        </div>
      </main>
    </div>
  );
}
