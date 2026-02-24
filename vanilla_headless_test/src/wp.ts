export type WpPostSummary = {
  id: number;
  date?: string;
  title: { rendered: string };
  excerpt: { rendered: string };
};

export type WpPostDetail = {
  id: number;
  date?: string;
  title: { rendered: string };
  content: { rendered: string };
};

const defaultApiBase = "http://poppoint.local/wp-json/wp/v2";

export function getApiBase(): string {
  return import.meta.env.VITE_WP_API_BASE ?? defaultApiBase;
}

export async function getPosts(): Promise<WpPostSummary[]> {
  const url = `${getApiBase()}/posts?per_page=10&_fields=id,date,title,excerpt`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  return (await res.json()) as WpPostSummary[];
}

export async function getPost(id: string): Promise<WpPostDetail> {
  const url = `${getApiBase()}/posts/${id}?_fields=id,date,title,content`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Failed to fetch post ${id}: ${res.status}`);
  }
  return (await res.json()) as WpPostDetail;
}
