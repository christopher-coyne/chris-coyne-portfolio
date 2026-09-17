// Sync photos and videos from a shared Google Photos album into the site.
//
// Usage:  npm run photos:sync            # pull new items, update manifest
//         npm run photos:sync -- --force # re-download everything
//
// Approval model: whatever is in the shared album is published. Items removed
// from the album are marked `published: false` in the manifest but their files
// are kept, so a broken fetch can never wipe the gallery. Captions in the
// manifest are preserved across syncs, as are tags, location and the hidden flag.
//
// The only Google-specific piece is `fetchAlbumItems()`. If Google changes the
// shared-album page markup, replace that one function; everything else stays.

import { mkdir, readFile, writeFile, access, unlink } from "node:fs/promises";
import path from "node:path";

const ALBUM_URL = "https://photos.app.goo.gl/SmoVfwejHTEKPKPg9";
const ROOT = new URL("..", import.meta.url).pathname;
const FULL_DIR = path.join(ROOT, "public/images/photos");
const THUMB_DIR = path.join(FULL_DIR, "thumbs");
const VIDEO_DIR = path.join(FULL_DIR, "videos");
const MANIFEST = path.join(ROOT, "src/data/photos/manifest.json");
const FULL_SIZE = 2000; // longest edge, px
const THUMB_SIZE = 600;
const VIDEO_QUALITY = "m22"; // Google transcode: m18 = 360p, m22 = 720p, dv = original
const CONCURRENCY = 4;
const FORCE = process.argv.includes("--force");

// Plain UA: Google's deep-link page serves an interstitial to browser UAs but a
// clean 302 to non-browser ones.
const HEADERS = { "User-Agent": "curl/8.0" };

async function fetchAlbumItems(albumUrl) {
  const res = await fetch(albumUrl, { headers: HEADERS, redirect: "follow" });
  if (!res.ok) throw new Error(`Album fetch failed: ${res.status}`);
  const html = await res.text();

  // Each media item is serialised as:
  //   ["<mediaId>",["<baseUrl>",<w>,<h>,...],<takenMs>,"<hash>",<tzOffsetMs>,...
  // Videos additionally carry a "76647426":[<durationMs>,null,<w>,<h>,...] block.
  const head =
    /\["(AF1Qip[\w-]+)",\["(https:\/\/lh3\.googleusercontent\.com\/pw\/[\w-]+)",(\d+),(\d+)/g;
  const tail = /\],(\d{13}),"[^"]*",(-?\d+),/;
  const video = /"76647426":\[(\d+),null,(\d+),(\d+)/;

  const matches = [...html.matchAll(head)];
  const items = new Map();
  matches.forEach((m, i) => {
    const [, id, baseUrl, w, h] = m;
    if (items.has(id)) return;
    const start = m.index + m[0].length;
    const end = matches[i + 1]?.index ?? start + 3000;
    const record = html.slice(start, end);
    const t = tail.exec(record.slice(0, 600));
    if (!t) return;
    const v = video.exec(record);
    items.set(id, {
      id,
      baseUrl,
      type: v ? "video" : "photo",
      width: Number(v ? v[2] : w),
      height: Number(v ? v[3] : h),
      durationMs: v ? Number(v[1]) : undefined,
      takenAt: toLocalIso(Number(t[1]), Number(t[2])),
    });
  });
  if (items.size === 0) {
    throw new Error(
      "No media items found in album page. Google may have changed the markup; see fetchAlbumItems().",
    );
  }
  return [...items.values()];
}

function toLocalIso(ms, tzOffsetMs) {
  const local = new Date(ms + tzOffsetMs).toISOString().slice(0, 19);
  const sign = tzOffsetMs < 0 ? "-" : "+";
  const abs = Math.abs(tzOffsetMs) / 60000;
  const hh = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm = String(abs % 60).padStart(2, "0");
  return `${local}${sign}${hh}:${mm}`;
}

function baseNameFor(item) {
  return `${item.takenAt.slice(0, 10)}-${item.id.slice(-8)}`;
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function download(url, dest, attempts = 3) {
  for (let i = 1; ; i++) {
    const res = await fetch(url, { headers: HEADERS, redirect: "follow" });
    if (res.ok) {
      await writeFile(dest, Buffer.from(await res.arrayBuffer()));
      return;
    }
    // Google's video transcodes occasionally 500 transiently; back off and retry.
    if (i >= attempts) throw new Error(`${res.status} downloading ${url}`);
    await new Promise((r) => setTimeout(r, 1500 * i));
  }
}

async function downloadIfMissing(url, dest) {
  if (!FORCE && (await exists(dest))) return false;
  await download(url, dest);
  return true;
}

async function loadManifest() {
  try {
    return JSON.parse(await readFile(MANIFEST, "utf8"));
  } catch {
    return { albumUrl: ALBUM_URL, photos: [] };
  }
}

async function runPool(tasks, n) {
  const queue = [...tasks];
  const workers = Array.from({ length: n }, async () => {
    while (queue.length) await queue.shift()();
  });
  await Promise.all(workers);
}

async function main() {
  await mkdir(THUMB_DIR, { recursive: true });
  await mkdir(VIDEO_DIR, { recursive: true });
  await mkdir(path.dirname(MANIFEST), { recursive: true });

  const manifest = await loadManifest();
  const existing = new Map(manifest.photos.map((p) => [p.id, p]));

  console.log(`Fetching album…`);
  const items = await fetchAlbumItems(ALBUM_URL);
  const nVideos = items.filter((i) => i.type === "video").length;
  console.log(`Album has ${items.length} items (${nVideos} videos).`);

  const inAlbum = new Set(items.map((i) => i.id));
  let added = 0;
  let unpublished = 0;
  const failed = [];

  const tasks = items.map((item) => async () => {
    try {
      await syncItem(item);
    } catch (err) {
      // Leave the manifest entry as it was; the item is retried next run.
      failed.push(item.id);
      console.warn(`  FAILED  ${item.id.slice(-8)}: ${err.message}`);
    }
  });

  async function syncItem(item) {
    const prev = existing.get(item.id);
    // Manual override: `hidden: true` in the manifest keeps an item off the
    // site even while it's in the album. Nothing is downloaded for it.
    if (prev?.hidden) {
      existing.set(item.id, { ...prev, published: true });
      return;
    }
    const base = prev?.file?.replace(/\.webp$/, "") ?? baseNameFor(item);
    const file = `${base}.webp`;
    const fullPath = path.join(FULL_DIR, file);
    const thumbPath = path.join(THUMB_DIR, file);
    const thumbUrl = `${item.baseUrl}=w${THUMB_SIZE}-h${THUMB_SIZE}-rw`;

    let changed = await downloadIfMissing(thumbUrl, thumbPath);
    let videoFile;
    if (item.type === "video") {
      videoFile = `${base}.mp4`;
      changed =
        (await downloadIfMissing(
          `${item.baseUrl}=${VIDEO_QUALITY}`,
          path.join(VIDEO_DIR, videoFile),
        )) || changed;
      // A video only needs its poster thumb; drop any stray full-size frame.
      if (await exists(fullPath)) await unlink(fullPath);
    } else {
      changed =
        (await downloadIfMissing(
          `${item.baseUrl}=w${FULL_SIZE}-h${FULL_SIZE}-rw`,
          fullPath,
        )) || changed;
    }

    if (!prev) added++;
    existing.set(item.id, {
      id: item.id,
      type: item.type,
      file,
      ...(videoFile && { video: videoFile, durationMs: item.durationMs }),
      width: item.width,
      height: item.height,
      takenAt: item.takenAt,
      caption: prev?.caption ?? "",
      tags: prev?.tags ?? [],
      location: prev?.location ?? "",
      published: true,
    });
    if (changed)
      console.log(`  ${prev ? "refreshed" : "added"}  ${videoFile ?? file}`);
  }
  await runPool(tasks, CONCURRENCY);

  for (const p of existing.values()) {
    if (!inAlbum.has(p.id) && p.published) {
      p.published = false;
      unpublished++;
      console.log(`  unpublished  ${p.file} (no longer in album)`);
    }
  }

  const photos = [...existing.values()].sort((a, b) =>
    b.takenAt.localeCompare(a.takenAt),
  );
  await writeFile(
    MANIFEST,
    JSON.stringify(
      { albumUrl: ALBUM_URL, syncedAt: new Date().toISOString(), photos },
      null,
      2,
    ) + "\n",
  );

  console.log(
    `Done. ${added} added, ${unpublished} unpublished, ${photos.filter((p) => p.published).length} published total.`,
  );
  if (failed.length) {
    console.warn(
      `${failed.length} item(s) failed to download; re-run to retry.`,
    );
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
