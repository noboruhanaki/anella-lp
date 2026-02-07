import { imagePath } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="px-5 pb-28 pt-10 md:pb-10" style={{ backgroundColor: "#6B5541" }}>
      <div className="mx-auto max-w-md text-center">
        <div className="mb-4 flex justify-center">
          <img
            src={imagePath("/images/anella-logo-footer.png")}
            alt="ANELLA CAFE ロゴ"
            className="h-14 w-auto"
          />
        </div>
        <p className="mb-1 text-xs" style={{ color: "#C4B89E" }}>
          {"アネラカフェ 川崎駅前店"}
        </p>
        <p className="text-xs" style={{ color: "#C4B89E" }}>
          {"就労継続支援B型"}
        </p>
      </div>
    </footer>
  )
}
