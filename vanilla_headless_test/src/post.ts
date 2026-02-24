import "./style.css";
import { getPost } from "./wp";

const titleEl = document.querySelector<HTMLElement>("#post-title");
const dateEl = document.querySelector<HTMLElement>("#post-date");
const contentEl = document.querySelector<HTMLElement>("#post-content");
const errorEl = document.querySelector<HTMLElement>("#error-message");

if (!titleEl || !dateEl || !contentEl || !errorEl) {
  throw new Error("Required elements are missing");
}

const postTitle = titleEl;
const postDate = dateEl;
const postContent = contentEl;
const errorMessage = errorEl;

function getPostId(): string {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) {
    throw new Error("URLに投稿IDがありません");
  }
  return id;
}

async function render(): Promise<void> {
  try {
    const id = getPostId();
    const post = await getPost(id);
    document.title = `${post.title.rendered} | HTML/CSS/TS`;
    postTitle.innerHTML = post.title.rendered;
    postDate.textContent = post.date
      ? new Date(post.date).toLocaleDateString("ja-JP")
      : "date unknown";
    postContent.innerHTML = post.content.rendered;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    errorMessage.hidden = false;
    errorMessage.textContent = `投稿表示エラー: ${message}`;
  }
}

render();
