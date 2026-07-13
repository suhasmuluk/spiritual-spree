globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { d as defineHandler, H as HTTPError, t as toEventHandler, a as defineLazyEventHandler, b as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/assets/FloatingPetals-DZoP9FaE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"335-BB2fP9QqFuaQw7yeXmzeCsIXyh8"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 821,
    "path": "../client/assets/FloatingPetals-DZoP9FaE.js"
  },
  "/assets/admin-D9dPKWvD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ced-XFdudMMXOFdwB2wB3DEKnjw65YU"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 3309,
    "path": "../client/assets/admin-D9dPKWvD.js"
  },
  "/assets/admin.categories-BFt_yyOm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"854-Wgo4YhSaLMQXpNldfXQ9i+yVV/8"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 2132,
    "path": "../client/assets/admin.categories-BFt_yyOm.js"
  },
  "/assets/admin.payment-logs-BvdlOEN9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"211f-3cNC7wOragwQMFHZZBfPlB1UT6U"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 8479,
    "path": "../client/assets/admin.payment-logs-BvdlOEN9.js"
  },
  "/assets/admin.orders-C_QX_FcI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f48-ZwWlN81DluND7Q2NYizNaJN3ia0"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 36680,
    "path": "../client/assets/admin.orders-C_QX_FcI.js"
  },
  "/assets/admin.index-Ce1318Hs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"637-CPD6DEZY8X2JnqTJzWf2PU0wJHc"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 1591,
    "path": "../client/assets/admin.index-Ce1318Hs.js"
  },
  "/assets/admin.products--R7vZ8c_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"20ec-6BDzpXxSax/5w19E4fvQFy/UWdo"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 8428,
    "path": "../client/assets/admin.products--R7vZ8c_.js"
  },
  "/assets/auth-CRO4BNru.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9df-oJSQPrU3n1/0Vv1pBf8ew+ML77U"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 2527,
    "path": "../client/assets/auth-CRO4BNru.js"
  },
  "/assets/about-DpbKscoU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1434-Side/ObKMCNGFtMM3oL86t51HXQ"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 5172,
    "path": "../client/assets/about-DpbKscoU.js"
  },
  "/assets/badge-DJAE0lGW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"598-6pPVH5wbNVK6kDOMGMXQr5JDcWY"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 1432,
    "path": "../client/assets/badge-DJAE0lGW.js"
  },
  "/assets/cart-BLE7XdYe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e4e-zfmkXE0gcWXNT8KNEQhug83nBls"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 3662,
    "path": "../client/assets/cart-BLE7XdYe.js"
  },
  "/assets/contact-JOyjxudN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1296-6nBaEtT72Qt0VPxTZ50dEQ6FTQA"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 4758,
    "path": "../client/assets/contact-JOyjxudN.js"
  },
  "/assets/faq-OV6OhICT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b50-tv2nj4Otdfr6CwNoNNmS1EZjL7U"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 2896,
    "path": "../client/assets/faq-OV6OhICT.js"
  },
  "/assets/guruji-DC72Adw_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1293-dbUWLHhGz4Hix7Ra0ei07uasBiU"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 4755,
    "path": "../client/assets/guruji-DC72Adw_.js"
  },
  "/assets/index-Ceke63_t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"20f4-HQpV2w0Q/CeVGuboNPOL8P7J20w"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 8436,
    "path": "../client/assets/index-Ceke63_t.js"
  },
  "/assets/hero-ganesh-CKocZ05U.jpg": {
    "type": "image/jpeg",
    "etag": '"2564d-eFImDpTTKUusOiUAjDxVrBFhMjE"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 153165,
    "path": "../client/assets/hero-ganesh-CKocZ05U.jpg"
  },
  "/assets/charts-DqsxrLxN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"67999-TU6BswKX5qKj9oMDBAmXACzG34s"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 424345,
    "path": "../client/assets/charts-DqsxrLxN.js"
  },
  "/assets/logo-varad-vinayak-n0PQ5i9p.jpeg": {
    "type": "image/jpeg",
    "etag": '"e8d0-YfitGdqQsutSjDoEjzQLnFq1X4o"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 59600,
    "path": "../client/assets/logo-varad-vinayak-n0PQ5i9p.jpeg"
  },
  "/assets/lucide-BnGG70AQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"33b3-tIt5VqBal3LtAPcfZRx7V32OSF4"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 13235,
    "path": "../client/assets/lucide-BnGG70AQ.js"
  },
  "/assets/index-BnHmDbEY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7216d-bPOdmLQmAWpv/JJeoLnzv60tzss"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 467309,
    "path": "../client/assets/index-BnHmDbEY.js"
  },
  "/assets/makhar-2-CL2JBNPO.jpg": {
    "type": "image/jpeg",
    "etag": '"32d48-NslX7W5uf6HUbYNs1LEaT/fMcRw"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 208200,
    "path": "../client/assets/makhar-2-CL2JBNPO.jpg"
  },
  "/assets/makhar-3-s2-VfZ6-.jpg": {
    "type": "image/jpeg",
    "etag": '"2c406-gC2kuRF0zqcqDhIrhLEz5o3nTkg"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 181254,
    "path": "../client/assets/makhar-3-s2-VfZ6-.jpg"
  },
  "/assets/checkout-tOmrLg5r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3092-Rf3w4bWnfKaJaYLEzIWduQrNrmg"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 12434,
    "path": "../client/assets/checkout-tOmrLg5r.js"
  },
  "/assets/makhar-1-BitcYVFm.jpg": {
    "type": "image/jpeg",
    "etag": '"337b7-y4NJpo9IY1tYN0YV8BJq4jj4RYU"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 210871,
    "path": "../client/assets/makhar-1-BitcYVFm.jpg"
  },
  "/assets/abhijit-pathare-C18ti-4D.jpg": {
    "type": "image/jpeg",
    "etag": '"9b6a0-X7544b/yJ9qxF6FWieYyfeFwrP0"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 636576,
    "path": "../client/assets/abhijit-pathare-C18ti-4D.jpg"
  },
  "/assets/order-success-D_HzdPqC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"58d-fv1yxmY5jFqlPQUw7qvTkvjzM78"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 1421,
    "path": "../client/assets/order-success-D_HzdPqC.js"
  },
  "/assets/makhar-4-Cp4oPe-J.jpg": {
    "type": "image/jpeg",
    "etag": '"e694-x5Un2sWm3aKMK3YX/LJXtpoD2oc"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 59028,
    "path": "../client/assets/makhar-4-Cp4oPe-J.jpg"
  },
  "/assets/product-decor-DUaAirks.jpg": {
    "type": "image/jpeg",
    "etag": '"9172-sHVV7amqEVEtc0kWRiV63Hfi8lA"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 37234,
    "path": "../client/assets/product-decor-DUaAirks.jpg"
  },
  "/assets/makhar-5-wMg2pxzH.jpg": {
    "type": "image/jpeg",
    "etag": '"33cc4-7Yuyx8APG/wbqCFN4fd3Tmbobe0"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 212164,
    "path": "../client/assets/makhar-5-wMg2pxzH.jpg"
  },
  "/assets/products._slug-h0sUvJy3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1294-5s802SY/MwuTXTGgoCvxYrC4aZ8"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 4756,
    "path": "../client/assets/products._slug-h0sUvJy3.js"
  },
  "/assets/product-eco-ganesh-BseAg8VO.jpg": {
    "type": "image/jpeg",
    "etag": '"c0c3-D6DQadsJgnt7i7JCsoge9/WCgZo"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 49347,
    "path": "../client/assets/product-eco-ganesh-BseAg8VO.jpg"
  },
  "/assets/products.index-BGqkXWki.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"abe-oT6eA6zSkklhsLoUInFt3qVr4g0"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 2750,
    "path": "../client/assets/products.index-BGqkXWki.js"
  },
  "/assets/queries-Dk3Gr8bY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e15-EQIkmT7pQ5gOCQPZtyIUyHeGDYo"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 3605,
    "path": "../client/assets/queries-Dk3Gr8bY.js"
  },
  "/assets/product-pooja-kit-DYochGJf.jpg": {
    "type": "image/jpeg",
    "etag": '"175b6-ldXRVmI4LWFsXg79hFCFC0vrmV4"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 95670,
    "path": "../client/assets/product-pooja-kit-DYochGJf.jpg"
  },
  "/assets/shipping-returns-CSowKINL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ad6-jFU/ae2QnR01hg7cjHGMTFR5xmU"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 2774,
    "path": "../client/assets/shipping-returns-CSowKINL.js"
  },
  "/assets/radix-CbVdKaJb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1008a-Mt0IU4P819Oebm0VJVR9VeqCRIo"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 65674,
    "path": "../client/assets/radix-CbVdKaJb.js"
  },
  "/assets/react-dom-B0wubzxa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3491f-UHEfQCiuGQtG7nqwdt0V8hddPwU"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 215327,
    "path": "../client/assets/react-dom-B0wubzxa.js"
  },
  "/assets/makhar-6-BgHZMbLm.jpg": {
    "type": "image/jpeg",
    "etag": '"374d8-Dm1OBItyj7xGg9G7JRAQdg8GyaI"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 226520,
    "path": "../client/assets/makhar-6-BgHZMbLm.jpg"
  },
  "/assets/styles-mIpJ02FV.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"199cc-yv13G+27+SS/URQLQe+mNrouWng"',
    "mtime": "2026-06-08T15:28:01.125Z",
    "size": 104908,
    "path": "../client/assets/styles-mIpJ02FV.css"
  },
  "/assets/types-CL71hP_G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"267-REyUq6XmNvAza+2hy9KK+c192OU"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 615,
    "path": "../client/assets/types-CL71hP_G.js"
  },
  "/assets/useQuery-r_2f9YUZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"22a7-dOQguVPoyTg7ZgO3UN8qVtDNUlM"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 8871,
    "path": "../client/assets/useQuery-r_2f9YUZ.js"
  },
  "/assets/utils-Bc0_-y7I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"66f5-B8ENzXtFpDqEJxv13iKunQu7bD8"',
    "mtime": "2026-06-08T15:28:01.126Z",
    "size": 26357,
    "path": "../client/assets/utils-Bc0_-y7I.js"
  },
  "/assets/team-DS9CXEeV.jpg": {
    "type": "image/jpeg",
    "etag": '"6667d-LC5CTN9B86KnNhB7S2JAVDG0Qxw"',
    "mtime": "2026-06-08T15:28:01.121Z",
    "size": 419453,
    "path": "../client/assets/team-DS9CXEeV.jpg"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _attSPk = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_j21Qvj = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_j21Qvj };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_attSPk)
].filter(Boolean);
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
function createNitroApp() {
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({ error, context: errorCtx });
      }
    }
  };
  const h3App = createH3App({
    onError(error, event) {
      return errorHandler(error, event);
    }
  });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  return {
    fetch: appHandler,
    h3: h3App,
    hooks: void 0,
    captureError
  };
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  h3App["~getMiddleware"] = (event, route) => {
    const pathname = event.url.pathname;
    const method = event.req.method;
    const middleware = [];
    const routeRules = getRouteRules(method, pathname);
    event.context.routeRules = routeRules?.routeRules;
    if (routeRules?.routeRuleMiddleware.length) {
      middleware.push(...routeRules.routeRuleMiddleware);
    }
    middleware.push(...h3App["~middleware"]);
    if (route?.data?.middleware?.length) {
      middleware.push(...route.data.middleware);
    }
    return middleware;
  };
  return h3App;
}
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
