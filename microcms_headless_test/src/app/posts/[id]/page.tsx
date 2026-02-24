import Link from "next/link";
import styles from "../../page.module.css";
import { getPost } from "@/lib/microcms";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function normalizeBody(raw: string): string {
  if (raw.includes("&lt;")) {
    return decodeHtmlEntities(raw);
  }
  return raw;
}

export default async function PostDetail({ params }: PageProps) {
  const { id } = await params;
  let post: Awaited<ReturnType<typeof getPost>> | null = null;
  let errorMessage = "";

  try {
    post = await getPost(id);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unknown error";
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {post ? (
          <>
            <p className={styles.badge}>Post Detail</p>
            <h1>{post.title}</h1>
            <p className={styles.meta}>
              {post.publishedAt || post.createdAt
                ? new Date(post.publishedAt ?? post.createdAt ?? "").toLocaleDateString("ja-JP")
                : "date unknown"}
            </p>
            <article
              className={styles.postContent}
              dangerouslySetInnerHTML={{
                __html: normalizeBody(post.body ?? "<p>本文がありません。</p>"),
              }}
            />
          </>
        ) : (
          <p className={styles.error}>投稿表示エラー: {errorMessage}</p>
        )}

        <p>
          <Link className={styles.link} href="/">
            一覧へ戻る
          </Link>
        </p>
      </main>
    </div>
  );
}
