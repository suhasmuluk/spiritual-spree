// Plesk / iisnode startup file (CommonJS — iisnode require()s this file
// synchronously, so we cannot use ESM top-level await here).
//
// iisnode sets process.env.PORT to a Windows named pipe. The bundled Nitro
// node-server only understands numeric ports, so we (1) point Nitro at a
// local TCP port and (2) proxy the iisnode pipe to it.
const { createServer, request: httpRequest } = require("node:http");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

// Load .env from the same directory as this file (Plesk-friendly fallback).
// On Plesk you can drop a .env next to app.js to inject env vars without
// using the Node.js panel UI.
try {
  require("dotenv").config({ path: path.join(__dirname, ".env") });
} catch (e) {
  console.warn("[app.js] dotenv not loaded:", e && e.message);
}

const iisTarget = process.env.PORT; // may be a \\.\pipe\... value

const INTERNAL_PORT = Number(process.env.INTERNAL_PORT) || 17231;
process.env.PORT = String(INTERNAL_PORT);
process.env.NITRO_PORT = String(INTERNAL_PORT);
process.env.HOST = "127.0.0.1";
process.env.NITRO_HOST = "127.0.0.1";

function waitForUpstream(port, timeoutMs = 15000) {
  return new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      const req = httpRequest(
        { host: "127.0.0.1", port, path: "/", method: "HEAD", timeout: 500 },
        (res) => { res.resume(); resolve(true); },
      );
      req.on("error", () => {
        if (Date.now() - start > timeoutMs) return resolve(false);
        setTimeout(tick, 150);
      });
      req.on("timeout", () => {
        req.destroy();
        if (Date.now() - start > timeoutMs) return resolve(false);
        setTimeout(tick, 150);
      });
      req.end();
    };
    tick();
  });
}

const serverEntry = pathToFileURL(
  path.join(__dirname, "server", "index.mjs"),
).href;

(async () => {
  try {
    await import(serverEntry);
    await waitForUpstream(INTERNAL_PORT);

    const proxy = createServer((req, res) => {
      const upstream = httpRequest(
        {
          host: "127.0.0.1",
          port: INTERNAL_PORT,
          path: req.url,
          method: req.method,
          headers: req.headers,
        },
        (pres) => {
          res.writeHead(pres.statusCode || 502, pres.headers);
          pres.pipe(res);
        },
      );
      upstream.on("error", (err) => {
        console.error("[proxy] upstream error:", err);
        if (!res.headersSent) res.writeHead(502, { "content-type": "text/plain" });
        res.end("Upstream error: " + err.message);
      });
      req.pipe(upstream);
    });

    const listenTarget = iisTarget || 8080;
    proxy.listen(listenTarget, () => {
      console.log("[proxy] listening on", listenTarget, "→ 127.0.0.1:" + INTERNAL_PORT);
    });
  } catch (err) {
    console.error("[app.js] fatal startup error:", err);
    process.exit(1);
  }
})();
