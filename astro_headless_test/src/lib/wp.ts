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

const defaultBase = "http://poppoint.local/wp-json/wp/v2";

function getBaseUrl(): string {
  return import.meta.env.PUBLIC_WP_API_BASE ?? defaultBase;
}

export function getApiBaseForDisplay(): string {
  return getBaseUrl();
}

export async function getPosts(): Promise<WpPostSummary[]> {
  const url = `${getBaseUrl()}/posts?per_page=10&_fields=id,date,title,excerpt`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  return (await res.json()) as WpPostSummary[];
}

export async function getPost(id: string): Promise<WpPostDetail> {
  const url = `${getBaseUrl()}/posts/${id}?_fields=id,date,title,content`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Failed to fetch post ${id}: ${res.status}`);
  }
  return (await res.json()) as WpPostDetail;
}
