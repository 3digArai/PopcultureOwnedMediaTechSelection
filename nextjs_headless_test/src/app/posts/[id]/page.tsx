import Link from "next/link";
import styles from "../../page.module.css";

type WpPostDetail = {
  id: number;
  date?: string;
  title: { rendered: string };
  content: { rendered: string };
};

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getPost(id: string): Promise<WpPostDetail> {
  const base =
    process.env.NEXT_PUBLIC_WP_API_BASE ??
    "http://poppoint.local/wp-json/wp/v2";
  const url = `${base}/posts/${id}?_fields=id,date,title,content`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch post ${id}: ${res.status}`);
  }

  return (await res.json()) as WpPostDetail;
}

export default async function PostDetail({ params }: PageProps) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p className={styles.badge}>Post Detail</p>
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <p className={styles.meta}>
          {post.date
            ? new Date(post.date).toLocaleDateString("ja-JP")
            : "date unknown"}
        </p>

        <article
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <p>
          <Link className={styles.link} href="/">
            一覧へ戻る
          </Link>
        </p>
      </main>
    </div>
  );
}
