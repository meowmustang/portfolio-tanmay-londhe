/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
// If deploying to https://<user>.github.io/<repo>, set NEXT_PUBLIC_BASE_PATH="/<repo>"
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",          // static export → GitHub Pages compatible
  trailingSlash: true,       // /solutions/fundflow-agent/index.html
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
