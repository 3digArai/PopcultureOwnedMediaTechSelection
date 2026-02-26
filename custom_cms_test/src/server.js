import cookieParser from "cookie-parser";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const dataPath = path.join(rootDir, "data", "posts.json");

const app = express();
const port = Number(process.env.PORT ?? 3005);
const adminUser = process.env.CMS_ADMIN_USER ?? "admin";
const adminPass = process.env.CMS_ADMIN_PASS ?? "change-me";

const sessions = new Map();

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(express.static(publicDir));

function readPosts() {
  const text = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(text);
}

function writePosts(posts) {
  fs.writeFileSync(dataPath, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
}

function createId() {
  return crypto.randomUUID().slice(0, 8);
}

function toSlug(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

function requireAuth(req, res, next) {
  const sid = req.cookies.cms_session;
  if (!sid || !sessions.has(sid)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return next();
}

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body ?? {};
  if (username !== adminUser || password !== adminPass) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const sid = crypto.randomUUID();
  sessions.set(sid, { username, createdAt: Date.now() });
  res.cookie("cms_session", sid, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 1000 * 60 * 60 * 8
  });
  return res.json({ ok: true });
});

app.post("/api/admin/logout", (req, res) => {
  const sid = req.cookies.cms_session;
  if (sid) sessions.delete(sid);
  res.clearCookie("cms_session");
  return res.json({ ok: true });
});

app.get("/api/posts", (req, res) => {
  const includeDraft = req.query.includeDraft === "1";
  const posts = readPosts()
    .filter((p) => (includeDraft ? true : p.status === "published"))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      status: p.status,
      updatedAt: p.updatedAt,
      publishedAt: p.publishedAt
    }));
  return res.json(posts);
});

app.get("/api/posts/:slug", (req, res) => {
  const post = readPosts().find((p) => p.slug === req.params.slug && p.status === "published");
  if (!post) return res.status(404).json({ message: "Not found" });
  return res.json(post);
});

app.get("/api/admin/posts", requireAuth, (req, res) => {
  return res.json(readPosts().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
});

app.post("/api/admin/posts", requireAuth, (req, res) => {
  const now = new Date().toISOString();
  const title = String(req.body?.title ?? "").trim();
  const excerpt = String(req.body?.excerpt ?? "").trim();
  const body = String(req.body?.body ?? "").trim();
  const status = req.body?.status === "published" ? "published" : "draft";

  if (!title || !body) {
    return res.status(400).json({ message: "title and body are required" });
  }

  const posts = readPosts();
  const baseSlug = toSlug(req.body?.slug || title) || `post-${createId()}`;
  let slug = baseSlug;
  let index = 1;
  while (posts.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${index++}`;
  }

  const post = {
    id: createId(),
    slug,
    title,
    excerpt,
    body,
    status,
    createdAt: now,
    updatedAt: now,
    publishedAt: status === "published" ? now : null
  };

  posts.push(post);
  writePosts(posts);
  return res.status(201).json(post);
});

app.put("/api/admin/posts/:id", requireAuth, (req, res) => {
  const posts = readPosts();
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx < 0) return res.status(404).json({ message: "Not found" });

  const current = posts[idx];
  const nextStatus = req.body?.status === "published" ? "published" : "draft";
  const now = new Date().toISOString();

  const updated = {
    ...current,
    title: String(req.body?.title ?? current.title).trim(),
    excerpt: String(req.body?.excerpt ?? current.excerpt).trim(),
    body: String(req.body?.body ?? current.body).trim(),
    slug: toSlug(req.body?.slug ?? current.slug) || current.slug,
    status: nextStatus,
    updatedAt: now,
    publishedAt:
      nextStatus === "published"
        ? current.publishedAt ?? now
        : null
  };

  if (!updated.title || !updated.body) {
    return res.status(400).json({ message: "title and body are required" });
  }

  posts[idx] = updated;
  writePosts(posts);
  return res.json(updated);
});

app.delete("/api/admin/posts/:id", requireAuth, (req, res) => {
  const posts = readPosts();
  const nextPosts = posts.filter((p) => p.id !== req.params.id);
  if (nextPosts.length === posts.length) return res.status(404).json({ message: "Not found" });
  writePosts(nextPosts);
  return res.json({ ok: true });
});

app.get("/admin", (_req, res) => {
  res.sendFile(path.join(publicDir, "admin.html"));
});

app.listen(port, () => {
  console.log(`custom_cms_test listening on http://localhost:${port}`);
});
