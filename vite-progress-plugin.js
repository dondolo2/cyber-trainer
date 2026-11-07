// Saves study progress to data/progress.json inside the project folder.
// Works with both `npm run dev` and `npm run preview`.
// GET  /api/progress -> { saved, updatedAt, data }
// POST /api/progress -> writes the file (atomic write, plus safety snapshots in data/backups)
import fs from "node:fs";
import path from "node:path";

const MAX_BYTES = 2 * 1024 * 1024;
const KEEP_BACKUPS = 40;

function isObj(x) { return x && typeof x === "object" && !Array.isArray(x); }
function valid(p) { return isObj(p) && isObj(p.ans) && isObj(p.match) && isObj(p.open); }
function countEntries(p) {
  return Object.keys(p.ans).length + Object.keys(p.match).length + Object.keys(p.open).length;
}

export default function progressStore() {
  let root = process.cwd();
  const P = () => {
    const dir = path.join(root, "data");
    return { dir, file: path.join(dir, "progress.json"), backups: path.join(dir, "backups") };
  };

  function send(res, code, obj) {
    res.statusCode = code;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify(obj));
  }

  function readSaved() {
    const { file } = P();
    try {
      const data = JSON.parse(fs.readFileSync(file, "utf8"));
      if (!valid(data)) return null;
      return { data, updatedAt: fs.statSync(file).mtime.toISOString() };
    } catch (e) {
      return null;
    }
  }

  function snapshot(tag) {
    const { file, backups } = P();
    if (!fs.existsSync(file)) return;
    fs.mkdirSync(backups, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    fs.copyFileSync(file, path.join(backups, `progress-${stamp}-${tag}.json`));
    const files = fs.readdirSync(backups).filter((f) => f.startsWith("progress-")).sort();
    files.slice(0, Math.max(0, files.length - KEEP_BACKUPS)).forEach((f) => {
      try { fs.unlinkSync(path.join(backups, f)); } catch (e) { /* ignore */ }
    });
  }

  function write(data) {
    const { dir, file, backups } = P();
    fs.mkdirSync(dir, { recursive: true });
    const prev = readSaved();
    if (prev) {
      if (JSON.stringify(prev.data) === JSON.stringify(data)) {
        const now = new Date();
        fs.utimesSync(file, now, now);
        return now.toISOString();
      }
      const today = new Date().toISOString().slice(0, 10);
      if (countEntries(data) < countEntries(prev.data)) {
        snapshot("before-reset");
      } else {
        const hasToday = fs.existsSync(backups) &&
          fs.readdirSync(backups).some((f) => f.startsWith("progress-" + today));
        if (!hasToday) snapshot("daily");
      }
    }
    const tmp = file + ".tmp";
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2) + "\n");
    fs.renameSync(tmp, file);
    return fs.statSync(file).mtime.toISOString();
  }

  function handler(req, res, next) {
    const url = (req.url || "").split("?")[0];
    if (url !== "/api/progress") return next();

    // Refuse requests that come from another website.
    const origin = req.headers.origin;
    if (origin) {
      try {
        if (new URL(origin).host !== req.headers.host) return send(res, 403, { error: "cross-origin request refused" });
      } catch (e) {
        return send(res, 403, { error: "bad origin" });
      }
    }

    if (req.method === "GET") {
      const s = readSaved();
      return send(res, 200, s ? { saved: true, updatedAt: s.updatedAt, data: s.data } : { saved: false });
    }

    if (req.method === "POST") {
      let size = 0;
      let aborted = false;
      const chunks = [];
      req.on("data", (c) => {
        size += c.length;
        if (size > MAX_BYTES) { aborted = true; send(res, 413, { error: "too large" }); req.destroy(); }
        else chunks.push(c);
      });
      req.on("end", () => {
        if (aborted) return;
        try {
          const data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
          if (!valid(data)) return send(res, 400, { error: "invalid progress data" });
          send(res, 200, { ok: true, updatedAt: write(data) });
        } catch (e) {
          send(res, 400, { error: "could not save" });
        }
      });
      return;
    }
    send(res, 405, { error: "method not allowed" });
  }

  return {
    name: "progress-store",
    configureServer(server) { root = server.config.root; server.middlewares.use(handler); },
    configurePreviewServer(server) { root = server.config.root; server.middlewares.use(handler); },
  };
}
