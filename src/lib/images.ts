/** Hosts next/image may load from. Keep in sync with next.config.ts. */
export const IMAGE_HOSTS = ["i.ibb.co", "upload.wikimedia.org", "link.fobshanghai.com"];

export const FALLBACK_IMAGE = "/no_image.png";

/**
 * next/image throws for hosts that aren't configured, so unknown or malformed
 * URLs coming from the database are dropped and the fallback is shown instead.
 */
export function safeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const { protocol, hostname } = new URL(url);
    return protocol === "https:" && IMAGE_HOSTS.includes(hostname) ? url : null;
  } catch {
    return null;
  }
}
