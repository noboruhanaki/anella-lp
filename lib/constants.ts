/** next.config の basePath と一致させる（Xサーバー /anella-work-b 用） */
export const BASE_PATH = "/anella-work-b"

/** 画像など public 配下のパスに basePath を付ける（サブディレクトリ配置で必須） */
export function imagePath(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`
  return `${BASE_PATH}${encodeURI(p)}`
}
