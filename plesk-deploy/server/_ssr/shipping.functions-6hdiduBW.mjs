import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
const ORIGIN = {
  lat: 19.0048,
  lng: 72.8302,
  pincode: "400013"
};
const STATE_CENTROIDS = {
  "Maharashtra": {
    lat: 19.7515,
    lng: 75.7139
  },
  "Gujarat": {
    lat: 22.2587,
    lng: 71.1924
  },
  "Goa": {
    lat: 15.2993,
    lng: 74.124
  },
  "Karnataka": {
    lat: 15.3173,
    lng: 75.7139
  },
  "Kerala": {
    lat: 10.8505,
    lng: 76.2711
  },
  "Tamil Nadu": {
    lat: 11.1271,
    lng: 78.6569
  },
  "Andhra Pradesh": {
    lat: 15.9129,
    lng: 79.74
  },
  "Telangana": {
    lat: 18.1124,
    lng: 79.0193
  },
  "Madhya Pradesh": {
    lat: 22.9734,
    lng: 78.6569
  },
  "Chhattisgarh": {
    lat: 21.2787,
    lng: 81.8661
  },
  "Odisha": {
    lat: 20.9517,
    lng: 85.0985
  },
  "West Bengal": {
    lat: 22.9868,
    lng: 87.855
  },
  "Jharkhand": {
    lat: 23.6102,
    lng: 85.2799
  },
  "Bihar": {
    lat: 25.0961,
    lng: 85.3131
  },
  "Uttar Pradesh": {
    lat: 26.8467,
    lng: 80.9462
  },
  "Uttarakhand": {
    lat: 30.0668,
    lng: 79.0193
  },
  "Rajasthan": {
    lat: 27.0238,
    lng: 74.2179
  },
  "Haryana": {
    lat: 29.0588,
    lng: 76.0856
  },
  "Punjab": {
    lat: 31.1471,
    lng: 75.3412
  },
  "Delhi": {
    lat: 28.7041,
    lng: 77.1025
  },
  "Himachal Pradesh": {
    lat: 31.1048,
    lng: 77.1734
  },
  "Jammu and Kashmir": {
    lat: 33.7782,
    lng: 76.5762
  },
  "Ladakh": {
    lat: 34.1526,
    lng: 77.5771
  },
  "Assam": {
    lat: 26.2006,
    lng: 92.9376
  },
  "Meghalaya": {
    lat: 25.467,
    lng: 91.3662
  },
  "Manipur": {
    lat: 24.6637,
    lng: 93.9063
  },
  "Mizoram": {
    lat: 23.1645,
    lng: 92.9376
  },
  "Nagaland": {
    lat: 26.1584,
    lng: 94.5624
  },
  "Tripura": {
    lat: 23.9408,
    lng: 91.9882
  },
  "Arunachal Pradesh": {
    lat: 28.218,
    lng: 94.7278
  },
  "Sikkim": {
    lat: 27.533,
    lng: 88.5122
  },
  "Chandigarh": {
    lat: 30.7333,
    lng: 76.7794
  },
  "Puducherry": {
    lat: 11.9416,
    lng: 79.8083
  },
  "Andaman and Nicobar Islands": {
    lat: 11.7401,
    lng: 92.6586
  },
  "Dadra and Nagar Haveli and Daman and Diu": {
    lat: 20.1809,
    lng: 73.0169
  },
  "Lakshadweep": {
    lat: 10.5667,
    lng: 72.6417
  }
};
async function fromZippopotam(pincode) {
  try {
    const res = await fetch(`https://api.zippopotam.us/in/${pincode}`);
    if (!res.ok) return null;
    const data = await res.json();
    const p = data?.places?.[0];
    if (!p) return null;
    return {
      lat: parseFloat(p.latitude),
      lng: parseFloat(p.longitude),
      place: p["place name"] || "",
      state: p.state || ""
    };
  } catch {
    return null;
  }
}
async function fromPostalPincode(pincode) {
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    if (!res.ok) return null;
    const data = await res.json();
    const entry = Array.isArray(data) ? data[0] : null;
    if (!entry || entry.Status !== "Success") return null;
    const po = entry.PostOffice?.[0];
    if (!po) return null;
    const state = po.State || "";
    const centroid = STATE_CENTROIDS[state];
    if (!centroid) return null;
    return {
      lat: centroid.lat,
      lng: centroid.lng,
      place: [po.Name, po.District].filter(Boolean).join(", "),
      state
    };
  } catch {
    return null;
  }
}
async function getCoordsForPincode(pincode) {
  return await fromZippopotam(pincode) ?? await fromPostalPincode(pincode);
}
function haversineKm(a, b) {
  const R = 6371;
  const toRad = (d) => d * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}
function feeForDistance(km) {
  if (km <= 50) return 100;
  if (km <= 200) return 200;
  if (km <= 500) return 300;
  if (km <= 1e3) return 400;
  if (km <= 1500) return 500;
  if (km <= 2e3) return 600;
  return 750;
}
const calculateShipping_createServerFn_handler = createServerRpc({
  id: "87fa976c53e2ed770ba0a10b119bddda639806f28586797d6826bfe67748b182",
  name: "calculateShipping",
  filename: "src/lib/shipping.functions.ts"
}, (opts) => calculateShipping.__executeServer(opts));
const calculateShipping = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  pincode: stringType().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  subtotal: numberType().min(0).optional()
})).handler(calculateShipping_createServerFn_handler, async ({
  data
}) => {
  if (data.pincode === ORIGIN.pincode) {
    return {
      ok: true,
      pincode: data.pincode,
      place: "Lower Parel, Mumbai",
      state: "Maharashtra",
      distanceKm: 0,
      shipping: 60
    };
  }
  const dest = await getCoordsForPincode(data.pincode);
  if (!dest) {
    return {
      ok: false,
      error: "Could not locate this pincode. Please check and retry."
    };
  }
  const distance = haversineKm(ORIGIN, dest);
  const km = Math.round(distance);
  return {
    ok: true,
    pincode: data.pincode,
    place: dest.place,
    state: dest.state,
    distanceKm: km,
    shipping: feeForDistance(km)
  };
});
export {
  calculateShipping_createServerFn_handler
};
