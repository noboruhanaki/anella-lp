import type { NextConfig } from "next";

/** 本番でサブディレクトリに配置するときだけ basePath を使う（開発は / で表示） */
const basePath =
  process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : ""

/**
 * 静的エクスポートは「BUILD_STATIC=1 かつ Vercel ではない」ときだけ。
 * Vercel では VERCEL=1 が自動で入るので、ここでは必ず API が含まれる。
 */
const useStaticExport =
  process.env.BUILD_STATIC === "1" && process.env.VERCEL !== "1"

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  ...(useStaticExport ? { output: "export" as const } : {}),
}

export default nextConfig;
