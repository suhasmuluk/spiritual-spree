const makhar1 = "/assets/makhar-1-BitcYVFm.jpg";
const makhar2 = "/assets/makhar-2-CL2JBNPO.jpg";
const makhar3 = "/assets/makhar-3-s2-VfZ6-.jpg";
const makhar4 = "/assets/makhar-4-Cp4oPe-J.jpg";
const makhar5 = "/assets/makhar-5-wMg2pxzH.jpg";
const makhar6 = "/assets/makhar-6-BgHZMbLm.jpg";
const poojaImg = "/assets/product-pooja-kit-DYochGJf.jpg";
const ecoImg = "/assets/product-eco-ganesh-BseAg8VO.jpg";
const decorImg = "/assets/product-decor-DUaAirks.jpg";
function resolveImage(url) {
  if (!url) return makhar1;
  if (url.includes("makhar-1")) return makhar1;
  if (url.includes("makhar-2")) return makhar2;
  if (url.includes("makhar-3")) return makhar3;
  if (url.includes("makhar-4")) return makhar4;
  if (url.includes("makhar-5")) return makhar5;
  if (url.includes("makhar-6")) return makhar6;
  if (url.includes("makhar")) return makhar1;
  if (url.includes("pooja")) return poojaImg;
  if (url.includes("eco")) return ecoImg;
  if (url.includes("decor")) return decorImg;
  return url;
}
export {
  resolveImage as r
};
