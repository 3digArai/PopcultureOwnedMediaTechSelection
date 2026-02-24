export type MicroCmsPost = {
  id: string;
  createdAt?: string;
  publishedAt?: string;
  title: string;
  excerpt?: string;
  body?: string;
};

type MicroCmsListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function getConfig() {
  const serviceDomain = getRequiredEnv("MICROCMS_SERVICE_DOMAIN");
  const apiKey = getRequiredEnv("MICROCMS_API_KEY");
  const endpoint = process.env.MICROCMS_ENDPOINT ?? "posts";
  return { serviceDomain, apiKey, endpoint };
}

function getBaseUrl(): string {
  const { serviceDomain, endpoint } = getConfig();
  return `https://${serviceDomain}.microcms.io/api/v1/${endpoint}`;
}

export function getApiInfoForDisplay(): string {
  const endpoint = process.env.MICROCMS_ENDPOINT ?? "posts";
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN ?? "(unset)";
  return `${serviceDomain}.microcms.io / ${endpoint}`;
}

export async function getPosts(): Promise<MicroCmsPost[]> {
  const { apiKey } = getConfig();
  const url = `${getBaseUrl()}?limit=10&fields=id,title,excerpt,createdAt,publishedAt`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "X-MICROCMS-API-KEY": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }

  const data = (await res.json()) as MicroCmsListResponse<MicroCmsPost>;
  return data.contents;
}

export async function getPost(id: string): Promise<MicroCmsPost> {
  const { apiKey } = getConfig();
  const url = `${getBaseUrl()}/${id}`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "X-MICROCMS-API-KEY": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch post ${id}: ${res.status}`);
  }

  return (await res.json()) as MicroCmsPost;
}
