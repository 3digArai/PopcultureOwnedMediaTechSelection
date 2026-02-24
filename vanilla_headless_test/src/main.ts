import "./style.css";
import { getApiBase, getPosts } from "./wp";

const listEl = document.querySelector<HTMLElement>("#post-list");
const errorEl = document.querySelector<HTMLElement>("#error-message");
const apiBaseEl = document.querySelector<HTMLElement>("#api-base");

if (!listEl || !errorEl || !apiBaseEl) {
  throw new Error("Required elements are missing");
}

const postList = listEl;
const errorMessage = errorEl;
const apiBase = apiBaseEl;

apiBase.textContent = getApiBase();

function toDate(date?: string): string {
  if (!date) return "date unknown";
  return new Date(date).toLocaleDateString("ja-JP");
}

async function render(): Promise<void> {
  try {
    const posts = await getPosts();
    postList.innerHTML = posts
      .map(
        (post) => `
          <article class="card">
            <h2>${post.title.rendered}</h2>
            <p class="meta">${toDate(post.date)}</p>
            <div class="excerpt">${post.excerpt.rendered}</div>
            <a class="link" href="/post.html?id=${post.id}">詳細を見る</a>
          </article>
        `,
      )
      .join("");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    errorMessage.hidden = false;
    errorMessage.textContent = `投稿取得エラー: ${message}`;
  }
}

render();
