// يرجّع المسار الصحيح للأصول داخل public/ مع BASE_URL
export const asset = (path = "") => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;            // اترك الروابط الخارجية كما هي
  return import.meta.env.BASE_URL + path.replace(/^\/+/, ""); // أزل أي / من البداية
};
