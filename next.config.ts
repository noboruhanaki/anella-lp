import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** サブディレクトリ /anella-work-b に配置する用 */
  basePath: "/anella-work-b",
  assetPrefix: "/anella-work-b",
  /** Xサーバー等の静的ホスティング用に静的エクスポート */
  output: "export",
};

export default nextConfig;
