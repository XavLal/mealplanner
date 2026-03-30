/** Probe whether a public recipe URL responds with 404/410. SSRF-safe URL whitelist. */

const FETCH_TIMEOUT_MS = 10_000;

function ipv4Parts(host: string): [number, number, number, number] | null {
  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (!m) return null;
  const a = Number(m[1]);
  const b = Number(m[2]);
  const c = Number(m[3]);
  const d = Number(m[4]);
  if ([a, b, c, d].some((n) => n > 255)) return null;
  return [a, b, c, d];
}

export function isAllowlistedRecipeUrl(urlStr: string): boolean {
  let u: URL;
  try {
    u = new URL(urlStr);
  } catch {
    return false;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return false;
  const host = u.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host === "0.0.0.0" ||
    host.endsWith(".onion")
  ) {
    return false;
  }
  const parts = ipv4Parts(host);
  if (parts) {
    const [a, b] = parts;
    if (a === 127 || a === 0) return false;
    if (a === 10) return false;
    if (a === 172 && b >= 16 && b <= 31) return false;
    if (a === 192 && b === 168) return false;
    if (a === 169 && b === 254) return false;
  }
  if (host.includes(":")) {
    const h = host.replace(/^\[|\]$/g, "");
    if (h === "::1" || /^(f[cd][0-9a-f]{1,2}):/i.test(h)) return false;
  }
  return true;
}

async function probeStatus(
  url: string,
  method: "HEAD" | "GET"
): Promise<number> {
  const res = await fetch(url, {
    method,
    redirect: "follow",
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    headers: {
      Accept: method === "HEAD" ? "*/*" : "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
      "User-Agent": "PrepprUrlCheck/1.0 (meal planning app; +https://github.com/)",
    },
  });
  if (method === "GET" && res.body) {
    await res.body.cancel().catch(() => undefined);
  }
  return res.status;
}

/**
 * Returns HTTP status if we could reach the server, or null if the check failed (network, etc.).
 */
export async function probeRecipeUrlHttpStatus(url: string): Promise<number | null> {
  if (!isAllowlistedRecipeUrl(url)) return null;
  try {
    const headStatus = await probeStatus(url, "HEAD");
    if (headStatus === 405 || headStatus === 501) {
      return await probeStatus(url, "GET");
    }
    return headStatus;
  } catch {
    try {
      return await probeStatus(url, "GET");
    } catch {
      return null;
    }
  }
}
