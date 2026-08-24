const ASSET_PREFIX = "/__l5e/assets-v1/";
const ASSET_HOST =
  import.meta.env.VITE_LOVABLE_ASSET_HOST?.trim() ||
  "id-preview--866b6666-ff25-4956-8dc6-9ff5181cc85c.lovable.app";

/**
 * Media lives in the project's private cloud storage bucket and is served
 * through the app's own public image endpoint, so URLs stay stable on any host.
 */
export function resolveAssetUrl(path: string): string {
  if (!path.startsWith(ASSET_PREFIX)) return path;
  return ASSET_HOST ? `https://${ASSET_HOST}${path}` : path;
}
