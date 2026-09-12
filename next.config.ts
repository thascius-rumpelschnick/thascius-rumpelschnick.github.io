import type { NextConfig } from "next"

// GitHub Pages serves plain files, so the app is a static export:
// `pnpm build` writes the site to `out/` and no server features are available.
const nextConfig: NextConfig = {
  output: "export",
  // Emit `ti/index.html` instead of `ti.html` so nested routes resolve on Pages.
  trailingSlash: true,
  // The default next/image loader needs a server; Pages has none.
  images: { unoptimized: true },
}

export default nextConfig
