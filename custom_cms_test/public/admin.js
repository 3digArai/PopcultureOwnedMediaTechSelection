const authMsg = document.getElementById("auth-msg");
const editMsg = document.getElementById("edit-msg");
const listEl = document.getElementById("admin-list");

const fields = {
  id: document.getElementById("post-id"),
  title: document.getElementById("post-title"),
  slug: document.getElementById("post-slug"),
  excerpt: document.getElementById("post-excerpt"),
  body: document.getElementById("post-body"),
  status: document.getElementById("post-status")
};

function setEditMessage(msg) {
  editMsg.textContent = msg;
}

function clearForm() {
  fields.id.value = "";
  fields.title.value = "";
  fields.slug.value = "";
  fields.excerpt.value = "";
  fields.body.value = "";
  fields.status.value = "draft";
}

function fillForm(post) {
  fields.id.value = post.id;
  fields.title.value = post.title ?? "";
  fields.slug.value = post.slug ?? "";
  fields.excerpt.value = post.excerpt ?? "";
  fields.body.value = post.body ?? "";
  fields.status.value = post.status ?? "draft";
}

async function login() {
  const username = document.getElementById("login-user").value;
  const password = document.getElementById("login-pass").value;
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  authMsg.textContent = res.ok ? "ログインしました" : "ログイン失敗";
  if (res.ok) await loadPosts();
}

async function logout() {
  await fetch("/api/admin/logout", { method: "POST" });
  authMsg.textContent = "ログアウトしました";
  listEl.innerHTML = "";
}

async function loadPosts() {
  const res = await fetch("/api/admin/posts");
  if (!res.ok) {
    listEl.innerHTML = "<p class='muted'>ログインしてください。</p>";
    return;
  }
  const posts = await res.json();
  listEl.innerHTML = posts
    .map(
      (p) => `
      <article class="card">
        <h3>${p.title}</h3>
        <p class="meta">${p.status} / ${p.slug}</p>
        <div class="row">
          <button type="button" data-id="${p.id}" data-action="edit">編集</button>
          <button type="button" data-id="${p.id}" data-action="delete">削除</button>
        </div>
      </article>
    `
    )
    .join("");

  listEl.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      const action = button.dataset.action;
      const target = posts.find((p) => p.id === id);
      if (!target) return;
      if (action === "edit") fillForm(target);
      if (action === "delete") await deletePost(id);
    });
  });
}

async function savePost() {
  const payload = {
    title: fields.title.value,
    slug: fields.slug.value,
    excerpt: fields.excerpt.value,
    body: fields.body.value,
    status: fields.status.value
  };
  const id = fields.id.value;
  const res = await fetch(id ? `/api/admin/posts/${id}` : "/api/admin/posts", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const e = await res.json();
    setEditMessage(`保存失敗: ${e.message ?? res.status}`);
    return;
  }
  const saved = await res.json();
  fillForm(saved);
  setEditMessage("保存しました");
  await loadPosts();
}

async function deletePost(id) {
  if (!confirm("削除しますか？")) return;
  const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
  if (!res.ok) {
    setEditMessage("削除失敗");
    return;
  }
  setEditMessage("削除しました");
  if (fields.id.value === id) clearForm();
  await loadPosts();
}

document.getElementById("login-btn").addEventListener("click", login);
document.getElementById("logout-btn").addEventListener("click", logout);
document.getElementById("save-btn").addEventListener("click", savePost);
document.getElementById("new-btn").addEventListener("click", clearForm);
document.getElementById("delete-btn").addEventListener("click", async () => {
  if (!fields.id.value) return;
  await deletePost(fields.id.value);
});

loadPosts();
