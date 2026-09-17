// Local tagging UI for the photos manifest.
//
// Usage:  npm run photos:tag     → opens http://localhost:4322
//
// Dev-only. Serves a page showing every item in src/data/photos/manifest.json
// and writes tags / location / captions / hidden flags straight back into it.
// Nothing here ships to the site.

import http from "node:http";
import { readFile, writeFile, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";

const PORT = Number(process.env.PORT) || 4322;
const ROOT = new URL("..", import.meta.url).pathname;
const PUBLIC = path.join(ROOT, "public");
const MANIFEST = path.join(ROOT, "src/data/photos/manifest.json");

const MIME = {
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

const normaliseTags = (tags) => [
  ...new Set(
    (Array.isArray(tags) ? tags : [])
      .map((t) => String(t).trim().toLowerCase())
      .filter(Boolean),
  ),
];

async function loadManifest() {
  return JSON.parse(await readFile(MANIFEST, "utf8"));
}

async function saveManifest(m) {
  await writeFile(MANIFEST, JSON.stringify(m, null, 2) + "\n");
}

function json(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

async function serveStatic(res, urlPath) {
  const file = path.normalize(path.join(PUBLIC, urlPath));
  if (!file.startsWith(PUBLIC)) return json(res, 403, { error: "forbidden" });
  try {
    const s = await stat(file);
    if (!s.isFile()) throw new Error();
  } catch {
    return json(res, 404, { error: "not found" });
  }
  res.writeHead(200, {
    "Content-Type": MIME[path.extname(file)] || "application/octet-stream",
    "Cache-Control": "max-age=3600",
  });
  createReadStream(file).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  try {
    if (req.method === "GET" && url.pathname === "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(PAGE);
    }
    if (req.method === "GET" && url.pathname === "/api/manifest") {
      return json(res, 200, await loadManifest());
    }
    const m = url.pathname.match(/^\/api\/items\/([\w-]+)$/);
    if (req.method === "POST" && m) {
      const patch = await readBody(req);
      const manifest = await loadManifest();
      const item = manifest.photos.find((p) => p.id === m[1]);
      if (!item) return json(res, 404, { error: "no such item" });
      if ("tags" in patch) item.tags = normaliseTags(patch.tags);
      if ("caption" in patch) item.caption = String(patch.caption ?? "").trim();
      if ("location" in patch)
        item.location = String(patch.location ?? "").trim();
      if ("hidden" in patch) {
        if (patch.hidden) item.hidden = true;
        else delete item.hidden;
      }
      await saveManifest(manifest);
      return json(res, 200, item);
    }
    if (req.method === "GET" && url.pathname.startsWith("/images/")) {
      return serveStatic(res, url.pathname);
    }
    json(res, 404, { error: "not found" });
  } catch (err) {
    json(res, 500, { error: err.message });
  }
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Photo tagger running at ${url}  (Ctrl+C to stop)`);
  if (process.platform === "darwin" && !process.argv.includes("--no-open"))
    exec(`open ${url}`);
});

const PAGE = /* html */ `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Photo tagger</title>
<style>
  :root {
    --bg: #111; --panel: #1a1a1a; --line: #2a2a2a; --ink: #eee; --muted: #999;
    --accent: #6ea8fe; --chip: #262626; --chip-on: #2b4a7a;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font: 14px/1.4 -apple-system, system-ui, sans-serif; }
  button, input, textarea { font: inherit; color: inherit; }
  header {
    position: sticky; top: 0; z-index: 2; display: flex; align-items: center; gap: 16px;
    padding: 10px 16px; background: var(--panel); border-bottom: 1px solid var(--line);
  }
  header h1 { font-size: 15px; margin: 0; font-weight: 600; }
  header .stat { color: var(--muted); }
  header label { display: inline-flex; align-items: center; gap: 6px; color: var(--muted); cursor: pointer; }
  header .filter { margin-left: auto; display: flex; gap: 6px; flex-wrap: wrap; max-width: 60vw; }
  .layout { display: grid; grid-template-columns: 1fr 380px; min-height: calc(100vh - 45px); }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; padding: 12px; align-content: start; }
  .tile { position: relative; padding: 0; border: 2px solid transparent; border-radius: 6px; overflow: hidden; background: #000; cursor: pointer; aspect-ratio: 1; }
  .tile img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .tile.selected { border-color: var(--accent); }
  .tile.hidden-item img { opacity: 0.3; }
  .tile .badge { position: absolute; left: 6px; bottom: 6px; padding: 2px 6px; border-radius: 999px; background: rgba(0,0,0,.7); font-size: 11px; }
  .tile .badge.none { background: rgba(200,80,80,.8); }
  .tile .vid { position: absolute; right: 6px; top: 6px; padding: 2px 6px; border-radius: 4px; background: rgba(0,0,0,.7); font-size: 11px; }
  .tile .hid { position: absolute; left: 6px; top: 6px; padding: 2px 6px; border-radius: 4px; background: rgba(0,0,0,.7); font-size: 11px; color: #f88; }
  aside { position: sticky; top: 45px; height: calc(100vh - 45px); overflow: auto; padding: 14px; border-left: 1px solid var(--line); background: var(--panel); }
  aside .preview { width: 100%; aspect-ratio: 4/3; background: #000; border-radius: 6px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  aside .preview img, aside .preview video { max-width: 100%; max-height: 100%; }
  aside .meta { color: var(--muted); font-size: 12px; margin: 8px 0 14px; display: flex; justify-content: space-between; }
  aside h2 { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); margin: 16px 0 6px; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .chip { padding: 4px 10px; border-radius: 999px; background: var(--chip); border: 1px solid transparent; cursor: pointer; }
  .chip.on { background: var(--chip-on); border-color: var(--accent); }
  .chip.loc { background: #1f2a22; }
  .chip.loc.on { background: #2b5a3a; border-color: #6ec28a; }
  .chip .x { margin-left: 6px; color: var(--muted); }
  .chip:hover .x { color: #fff; }
  input[type=text], textarea { width: 100%; padding: 8px 10px; background: #0d0d0d; border: 1px solid var(--line); border-radius: 6px; outline: none; }
  input[type=text]:focus, textarea:focus { border-color: var(--accent); }
  textarea { resize: vertical; min-height: 60px; }
  .row { display: flex; align-items: center; gap: 8px; margin-top: 10px; }
  .status { color: var(--muted); font-size: 12px; margin-left: auto; }
  .status.saving { color: var(--accent); }
  .help { color: var(--muted); font-size: 12px; margin-top: 18px; line-height: 1.6; }
  kbd { background: #0d0d0d; border: 1px solid var(--line); border-radius: 4px; padding: 0 5px; font-size: 11px; }
  .empty { color: var(--muted); padding: 40px; text-align: center; }
</style>
</head>
<body>
<header>
  <h1>Photo tagger</h1>
  <span class="stat" id="stat"></span>
  <label><input type="checkbox" id="untaggedOnly" /> untagged only</label>
  <div class="filter" id="filter"></div>
</header>
<div class="layout">
  <div class="grid" id="grid"></div>
  <aside id="aside"><div class="empty">Select an item</div></aside>
</div>
<script>
(async () => {
  const $ = (s, el = document) => el.querySelector(s);
  let manifest = await (await fetch("/api/manifest")).json();
  let items = manifest.photos;
  let selected = -1;
  let filterTag = null;
  let untaggedOnly = false;
  let saveTimer = null;

  const thumb = (p) => "/images/photos/thumbs/" + p.file;
  const full = (p) => p.type === "video" ? "/images/photos/videos/" + p.video : "/images/photos/" + p.file;
  const tagsOf = (p) => p.tags || [];
  const allTags = () => {
    const c = new Map();
    for (const p of items) for (const t of tagsOf(p)) c.set(t, (c.get(t) || 0) + 1);
    return [...c.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  };
  const allLocations = () => {
    const c = new Map();
    for (const p of items) if (p.location) c.set(p.location, (c.get(p.location) || 0) + 1);
    return [...c.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  };
  // Reuse an existing spelling when the same place is typed with different case.
  const canonLocation = (v) => {
    const t = v.trim();
    return allLocations().find(([l]) => l.toLowerCase() === t.toLowerCase())?.[0] ?? t;
  };
  let filterLoc = null;
  const visible = () => items.filter((p) =>
    (!filterLoc || p.location === filterLoc) &&
    (!untaggedOnly || tagsOf(p).length === 0) && (!filterTag || tagsOf(p).includes(filterTag)));

  function renderHeader() {
    const tagged = items.filter((p) => tagsOf(p).length).length;
    $("#stat").textContent = tagged + " / " + items.length + " tagged";
    const f = $("#filter");
    f.innerHTML = "";
    for (const [t, n] of allTags()) {
      const b = document.createElement("button");
      b.className = "chip" + (filterTag === t ? " on" : "");
      b.textContent = t + " " + n;
      b.onclick = () => { filterTag = filterTag === t ? null : t; renderAll(); };
      f.appendChild(b);
    }
    for (const [l, n] of allLocations()) {
      const b = document.createElement("button");
      b.className = "chip loc" + (filterLoc === l ? " on" : "");
      b.textContent = "⌖ " + l + " " + n;
      b.onclick = () => { filterLoc = filterLoc === l ? null : l; renderAll(); };
      f.appendChild(b);
    }
  }

  function renderGrid() {
    const g = $("#grid");
    g.innerHTML = "";
    const vis = visible();
    if (!vis.length) { g.innerHTML = '<div class="empty">Nothing matches</div>'; return; }
    for (const p of vis) {
      const i = items.indexOf(p);
      const b = document.createElement("button");
      b.className = "tile" + (i === selected ? " selected" : "") + (p.hidden ? " hidden-item" : "");
      b.dataset.index = i;
      const n = tagsOf(p).length;
      b.innerHTML = '<img src="' + thumb(p) + '" loading="lazy" alt="" />'
        + '<span class="badge ' + (n ? "" : "none") + '">' + (n ? n + " tag" + (n > 1 ? "s" : "") : "untagged") + '</span>'
        + (p.type === "video" ? '<span class="vid">▶</span>' : "")
        + (p.hidden ? '<span class="hid">hidden</span>' : "");
      b.onclick = () => select(i);
      g.appendChild(b);
    }
  }

  function renderAside() {
    const a = $("#aside");
    if (selected < 0) { a.innerHTML = '<div class="empty">Select an item</div>'; return; }
    const p = items[selected];
    const media = p.type === "video"
      ? '<video src="' + full(p) + '" poster="' + thumb(p) + '" controls muted playsinline></video>'
      : '<img src="' + full(p) + '" alt="" />';
    const date = new Date(p.takenAt.slice(0, 10) + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    a.innerHTML =
      '<div class="preview">' + media + '</div>'
      + '<div class="meta"><span>' + date + (p.type === "video" ? " · video" : "") + '</span><span>' + p.file + '</span></div>'
      + '<h2>Tags</h2><div class="chips" id="itemTags"></div>'
      + '<div class="row"><input type="text" id="tagInput" placeholder="add tag, enter to save" list="tagList" autocomplete="off" /><datalist id="tagList"></datalist></div>'
      + '<h2>All tags</h2><div class="chips" id="vocab"></div>'
      + '<h2>Location</h2><div class="row"><input type="text" id="locInput" placeholder="where was this? enter to save" list="locList" autocomplete="off" /><datalist id="locList"></datalist></div>'
      + '<div class="chips" id="locVocab" style="margin-top:8px"></div>'
      + '<h2>Caption</h2><textarea id="caption" placeholder="optional"></textarea>'
      + '<div class="row"><label><input type="checkbox" id="hidden" /> hidden from site</label><span class="status" id="status"></span></div>'
      + '<div class="help"><kbd>←</kbd> <kbd>→</kbd> previous / next &nbsp; <kbd>enter</kbd> add tag &nbsp; <kbd>,</kbd> separates several &nbsp; click a chip to toggle it &nbsp; location is one value per item</div>';
    $("#caption").value = p.caption || "";
    $("#hidden").checked = !!p.hidden;
    renderItemTags();
    const input = $("#tagInput");
    input.focus();
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const add = input.value.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
        if (add.length) { setTags([...tagsOf(p), ...add]); input.value = ""; }
      }
    });
    renderLocation();
    const loc = $("#locInput");
    loc.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); setLocation(loc.value); }
    });
    loc.addEventListener("blur", () => { if (loc.value.trim() !== (p.location || "")) setLocation(loc.value); });
    $("#caption").addEventListener("input", () => { p.caption = $("#caption").value; queueSave(p); });
    $("#hidden").addEventListener("change", () => { p.hidden = $("#hidden").checked; if (!p.hidden) delete p.hidden; queueSave(p); renderGrid(); });
  }

  function renderItemTags() {
    const p = items[selected];
    const box = $("#itemTags");
    box.innerHTML = tagsOf(p).length ? "" : '<span style="color:var(--muted)">none yet</span>';
    for (const t of tagsOf(p)) {
      const b = document.createElement("button");
      b.className = "chip on";
      b.innerHTML = t + '<span class="x">×</span>';
      b.onclick = () => setTags(tagsOf(p).filter((x) => x !== t));
      box.appendChild(b);
    }
    const vocab = $("#vocab");
    vocab.innerHTML = "";
    const dl = $("#tagList");
    dl.innerHTML = "";
    for (const [t] of allTags()) {
      const on = tagsOf(p).includes(t);
      const b = document.createElement("button");
      b.className = "chip" + (on ? " on" : "");
      b.textContent = t;
      b.onclick = () => setTags(on ? tagsOf(p).filter((x) => x !== t) : [...tagsOf(p), t]);
      vocab.appendChild(b);
      const o = document.createElement("option");
      o.value = t;
      dl.appendChild(o);
    }
    if (!vocab.children.length) vocab.innerHTML = '<span style="color:var(--muted)">tags you add will collect here</span>';
  }

  function renderLocation() {
    const p = items[selected];
    const input = $("#locInput");
    if (input) input.value = p.location || "";
    const box = $("#locVocab");
    const dl = $("#locList");
    box.innerHTML = "";
    dl.innerHTML = "";
    for (const [l] of allLocations()) {
      const on = p.location === l;
      const b = document.createElement("button");
      b.className = "chip loc" + (on ? " on" : "");
      b.textContent = l;
      b.onclick = () => setLocation(on ? "" : l);
      box.appendChild(b);
      const o = document.createElement("option");
      o.value = l;
      dl.appendChild(o);
    }
    if (!box.children.length) box.innerHTML = '<span style="color:var(--muted)">locations you add will collect here</span>';
  }

  function setLocation(value) {
    const p = items[selected];
    p.location = canonLocation(value);
    queueSave(p);
    renderLocation();
    renderHeader();
  }

  function setTags(tags) {
    const p = items[selected];
    p.tags = [...new Set(tags.map((t) => t.trim().toLowerCase()).filter(Boolean))];
    queueSave(p);
    renderItemTags();
    renderHeader();
    const tile = $('.tile[data-index="' + selected + '"]');
    if (tile) tile.querySelector(".badge").outerHTML =
      '<span class="badge ' + (p.tags.length ? "" : "none") + '">' + (p.tags.length ? p.tags.length + " tag" + (p.tags.length > 1 ? "s" : "") : "untagged") + '</span>';
  }

  function queueSave(p) {
    const s = $("#status");
    if (s) { s.textContent = "saving…"; s.className = "status saving"; }
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      const res = await fetch("/api/items/" + p.id, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags: p.tags || [], location: p.location || "", caption: p.caption || "", hidden: !!p.hidden }),
      });
      const s2 = $("#status");
      if (s2) { s2.textContent = res.ok ? "saved" : "save failed"; s2.className = "status"; }
    }, 250);
  }

  function select(i) {
    selected = i;
    document.querySelectorAll(".tile").forEach((t) => t.classList.toggle("selected", Number(t.dataset.index) === i));
    renderAside();
    $('.tile[data-index="' + i + '"]')?.scrollIntoView({ block: "nearest" });
  }

  function step(dir) {
    const vis = visible();
    if (!vis.length) return;
    const pos = vis.indexOf(items[selected]);
    const next = vis[(pos + dir + vis.length) % vis.length];
    select(items.indexOf(next));
  }

  function renderAll() { renderHeader(); renderGrid(); }

  document.addEventListener("keydown", (e) => {
    const inText = e.target.tagName === "TEXTAREA" || (e.target.tagName === "INPUT" && e.target.type === "text" && e.target.value);
    if (inText) return;
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  });
  $("#untaggedOnly").addEventListener("change", (e) => { untaggedOnly = e.target.checked; renderAll(); });

  renderAll();
  if (items.length) select(0);
})();
</script>
</body>
</html>`;
