import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/tarot-app",
  assetPrefix: "/tarot-app",
};

export default nextConfig;
