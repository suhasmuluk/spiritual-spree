#!/usr/bin/env node
/**
 * Bundles a Plesk-ready deployment folder after `vite build --config vite.config.plesk.ts`.
 *
 * Expects a Nitro `node-server` build at dist/ with:
 *   dist/server/<entry>.mjs   (Node HTTP server entry — listens on PORT)
 *   dist/client/...            (static client assets)
 *
 * Output layout (upload CONTENTS of plesk-deploy/ to site root):
 *   plesk-deploy/
 *     app.js               (Plesk/iisnode startup file — boots Node server on PORT)
 *     index.html, assets/  (client assets at root)
 *     server/<entry>.mjs   (Nitro node-server bundle)
 *     package.json         (type: module, main: app.js)
 *     web.config           (IIS + iisnode rewrite to app.js)
 */
import { cp, mkdir, rm, writeFile, readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "plesk-deploy");

// Detect Node server entry. Nitro node-server preset commonly emits
// `index.mjs`; older configurations emitted `server.js`/`server.mjs`. Probe
// the most likely names in both dist/ and .output/.
const ENTRY_CANDIDATES = ["index.mjs", "server.mjs", "server.js", "index.js"];
let buildDir = null;
let serverEntry = null;
for (const candidate of ["dist", ".output"]) {
  for (const entry of ENTRY_CANDIDATES) {
    if (existsSync(path.join(root, candidate, "server", entry))) {
      buildDir = candidate;
      serverEntry = entry;
      break;
    }
  }
  if (buildDir) break;
}
if (!buildDir || !serverEntry) {
  console.error(
    "✗ No Node server entry found. Looked for:\n" +
      ENTRY_CANDIDATES.map((e) => `    dist/server/${e}, .output/server/${e}`).join("\n"),
  );
  console.error("  Run `npm run build:plesk` (uses vite.config.plesk.ts → node-server preset).");
  process.exit(1);
}
console.log(`→ Detected build output: ${buildDir}/server/${serverEntry}`);

console.log("→ Cleaning plesk-deploy/");
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

// Copy client assets to the ROOT of plesk-deploy (so /assets/* serves at root).
const clientDir = path.join(root, buildDir, "client");
if (existsSync(clientDir)) {
  console.log(`→ Copying ${buildDir}/client/* → plesk-deploy/`);
  for (const entry of await readdir(clientDir)) {
    await cp(path.join(clientDir, entry), path.join(out, entry), { recursive: true });
  }
} else {
  console.warn(`⚠ ${buildDir}/client not found — skipping client copy.`);
}

// Copy server bundle to plesk-deploy/server/
const serverSrc = path.join(root, buildDir, "server");
const serverOut = path.join(out, "server");
console.log(`→ Copying ${buildDir}/server/ → plesk-deploy/server/`);
await cp(serverSrc, serverOut, { recursive: true });

// app.js — iisnode startup file.
//
// iisnode injects process.env.PORT as a Windows NAMED PIPE
// (e.g. "\\\\.\\pipe\\xxxxx"), NOT a numeric port. The Nitro node-server
// bundle does `parseInt(process.env.PORT)` → NaN → falls back to 3000, so it
// never binds to the pipe iisnode is waiting on (HRESULT 0x2 / HTTP 500.1001).
//
// Workaround: redirect Nitro to bind to a local TCP port on 127.0.0.1, then
// run a small HTTP proxy on the actual iisnode pipe that forwards to it.
const appJs = `// Plesk / iisnode startup file (CommonJS — iisnode require()s this file
// synchronously, so we cannot use ESM top-level await here).
const { createServer, request: httpRequest } = require("node:http");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

// Load .env from the same directory as this file (Plesk-friendly fallback).
try {
  require("dotenv").config({ path: path.join(__dirname, ".env") });
} catch (e) {
  console.warn("[app.js] dotenv not loaded:", e && e.message);
}

const iisTarget = process.env.PORT; // may be a \\\\.\\pipe\\... value

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
  path.join(__dirname, "server", "${serverEntry}"),
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
`;
await writeFile(path.join(out, "app.js"), appJs);


// Minimal package.json — main points at app.js so \`npm start\` and Plesk
// both have a sensible default. server/ entry is the real bundle.
const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const runtimePkg = {
  name: pkg.name ?? "plesk-deploy",
  version: pkg.version ?? "1.0.0",
  private: true,
  
  main: "app.js",
  scripts: { start: "node app.js" },
  engines: { node: ">=20" },
  dependencies: pkg.dependencies ?? {},
};
await writeFile(
  path.join(out, "package.json"),
  JSON.stringify(runtimePkg, null, 2) + "\n",
);

// web.config — IIS + iisnode. Route everything to app.js, except static files.
const webConfig = `<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="app.js" verb="*" modules="iisnode" />
    </handlers>
    <rewrite>
      <rules>
        <rule name="StaticAssets" stopProcessing="true">
          <match url="^(assets/.*|favicon\\.ico|robots\\.txt|.*\\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|map))$" />
          <action type="None" />
        </rule>
        <rule name="DynamicContent">
          <match url="/*" />
          <action type="Rewrite" url="app.js" />
        </rule>
      </rules>
    </rewrite>
    <iisnode devErrorsEnabled="true" loggingEnabled="true" />
  </system.webServer>
</configuration>
`;
await writeFile(path.join(out, "web.config"), webConfig);

const readme = `# Plesk deployment bundle

Upload the CONTENTS of this folder to your Plesk site root (e.g. httpdocs/).

Layout:
  httpdocs/
    app.js               (Application Startup File)
    index.html
    assets/...
    server/${serverEntry}  (Nitro node-server bundle)
    server/...
    package.json
    web.config           (IIS + iisnode)

## Plesk Node.js panel
- Application startup file: app.js
- Application mode: production
- Click "NPM Install", then "Restart App"

## Required environment variables
SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_SERVICE_ROLE_KEY,
VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY,
RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET

## Update later
  npm run build:plesk
  # re-upload contents of plesk-deploy/ and Restart App
`;
await writeFile(path.join(out, "README.md"), readme);

console.log("\n✓ Done. Upload the contents of ./plesk-deploy/ to Plesk.");
console.log(`  Startup file: app.js → server/${serverEntry}`);
