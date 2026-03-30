const SOURCES_WITHOUT_SITE_SEARCH = new Set(
  ["maison", "création du chef", "creation du chef"].map((s) =>
    s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()
  )
);

function normalizeSourceKey(source: string): string {
  return source
    .trim()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

/** Hostname without leading www., for site: queries */
export function hostnameForSiteSearch(url: string | null): string | null {
  if (!url) return null;
  try {
    const h = new URL(url).hostname.toLowerCase();
    return h.startsWith("www.") ? h.slice(4) : h;
  } catch {
    return null;
  }
}

/**
 * Google search URL for a recipe; optionally restricted to the source site.
 * @param siteHost - e.g. marmiton.org (no scheme); from recipe URL when available
 */
export function buildGoogleRecipeSearchUrl(
  title: string,
  source: string,
  siteHost: string | null
): string {
  const qTitle = `${title.trim()} recette`;
  const encodedTitle = encodeURIComponent(qTitle);

  const key = normalizeSourceKey(source);
  if (SOURCES_WITHOUT_SITE_SEARCH.has(key)) {
    return `https://www.google.com/search?q=${encodedTitle}`;
  }

  if (siteHost && siteHost.length > 0) {
    const q = encodeURIComponent(`site:${siteHost} ${qTitle}`);
    return `https://www.google.com/search?q=${q}`;
  }

  const raw = source.trim();
  if (raw.includes(".")) {
    const host = raw.replace(/^https?:\/\//i, "").split("/")[0];
    const q = encodeURIComponent(`site:${host} ${qTitle}`);
    return `https://www.google.com/search?q=${q}`;
  }

  const q = encodeURIComponent(`site:${raw} ${qTitle}`);
  return `https://www.google.com/search?q=${q}`;
}
