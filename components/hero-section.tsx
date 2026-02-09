"use client"

import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { imagePath } from "@/lib/constants"

const img = (path: string) =>
  process.env.NODE_ENV === "development" ? path : imagePath(path)

const benefitImages = [
  { src: img("/images/jikyu400.png"), alt: "時給換算400円以上" },
  { src: img("/images/obento.png"), alt: "弁当付100円" },
  { src: img("/images/kawasaki.png"), alt: "川崎駅徒歩圏内" },
] as const

/** 競合参考: 白い円まわりにうっすら広がるソフトなシャドー */
const benefitCircleShadow =
  "0 2px 8px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.06)"

export function HeroSection() {
  const scrollToForm = () => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden">
      {/* --- SP Layout --- */}
      <div className="md:hidden" style={{ backgroundColor: "#D0EBE5" }}>
        <div className="px-5 pt-8 text-center">
          <p
            className="mb-2 text-sm font-medium"
            style={{ color: "#6B5541" }}
          >
            {"動物カフェ×就労支援B型事業所"}
          </p>
          <h1
            className="mb-4 text-2xl font-bold leading-relaxed text-balance"
            style={{ color: "#6B5541" }}
          >
            {"保護犬・猫に囲まれて、"}
            <br />
            {"自分らしく働く。"}
          </h1>
          {/* 3点リーダー: jikyu400, obento, kawasaki（各丸にうっすらシャドー） */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {benefitImages.map(({ src, alt }) => (
              <span
                key={alt}
                className="inline-block rounded-full"
                style={{ boxShadow: benefitCircleShadow }}
              >
                <img src={src} alt={alt} className="h-20 w-20 object-contain" />
              </span>
            ))}
          </div>
        </div>

        <div className="relative px-5 pb-6 pt-4">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[40%]"
            style={{
              background: "linear-gradient(to bottom, #D0EBE5 0%, #D0EBE5 20%, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[30%]"
            style={{
              background: "linear-gradient(to top, #D0EBE5 0%, transparent 100%)",
            }}
          />
          <img
            src={imagePath("/images/e5-ba-97-e8-88-97-e7-94-bb-e5-83-8f1.jpeg")}
            alt="アネラカフェ店内で犬と触れ合うスタッフの様子"
            className="h-[300px] w-full object-cover"
          />
        </div>

        <div className="px-5 pb-6 pt-4">
          <p
            className="mb-2 text-center text-xs font-bold tracking-wider"
            style={{ color: "#E86833" }}
          >
            {"\\  カンタン30秒で完了！ /"}
          </p>
          <Button
            onClick={scrollToForm}
            size="lg"
            className="w-full rounded-full py-6 text-base font-bold shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: "#E86833", color: "#FFFFFF" }}
          >
            <Mail className="mr-2 h-5 w-5" />
            {"無料の個別相談はコチラ"}
          </Button>
        </div>
      </div>

      {/* --- PC Layout --- */}
      <div className="hidden md:block" style={{ backgroundColor: "#D0EBE5" }}>
        <div className="mx-auto flex max-w-5xl items-center gap-0">
          <div className="flex-1 py-16 pl-8 pr-4">
            <p
              className="mb-2 text-lg font-medium"
              style={{ color: "#6B5541" }}
            >
              {"動物カフェ×就労支援B型事業所"}
            </p>
            <h1
              className="mb-4 text-4xl font-bold leading-snug text-balance"
              style={{ color: "#6B5541" }}
            >
              {"保護犬・猫に囲まれて、"}
              <br />
              <span style={{ color: "#E86833" }}>{"自分らしく"}</span>
              {"働く。"}
            </h1>
            {/* 3点リーダー: jikyu400, obento, kawasaki（各丸にうっすらシャドー） */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
              {benefitImages.map(({ src, alt }) => (
                <span
                  key={alt}
                  className="inline-block rounded-full"
                  style={{ boxShadow: benefitCircleShadow }}
                >
                  <img src={src} alt={alt} className="h-24 w-24 object-contain" />
                </span>
              ))}
            </div>
            <div className="max-w-xs">
              <p
                className="mb-2 text-xs font-bold tracking-wider"
                style={{ color: "#E86833" }}
              >
                {"\\  カンタン30秒で完了！ /"}
              </p>
              <Button
                onClick={scrollToForm}
                size="lg"
                className="w-full rounded-full py-6 text-base font-bold shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: "#E86833", color: "#FFFFFF" }}
              >
                <Mail className="mr-2 h-5 w-5" />
                {"無料の個別相談はコチラ"}
              </Button>
            </div>
          </div>
          <div className="relative flex-1">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[30%]"
              style={{
                background: "linear-gradient(to right, #D0EBE5 0%, transparent 100%)",
              }}
            />
            <img
              src={imagePath("/images/e5-ba-97-e8-88-97-e7-94-bb-e5-83-8f1.jpeg")}
              alt="アネラカフェ店内で犬と触れ合うスタッフの様子"
              className="h-[480px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
