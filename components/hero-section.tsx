"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Coins, Mail } from "lucide-react"

export function HeroSection() {
  const scrollToForm = () => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden">
      {/* --- SP Layout: Stacked (text above image, blended seamlessly) --- */}
      <div className="md:hidden" style={{ backgroundColor: "#D0EBE5" }}>
        {/* Text area - large bottom padding + deep negative margin for overlap */}
        <div className="relative z-10 -mb-24 px-5 pb-28 pt-8 text-center">
          <h1
            className="mb-3 text-2xl font-bold leading-relaxed text-balance"
            style={{ color: "#6B5541" }}
          >
            {"保護犬・猫に囲まれて、"}
            <br />
            {"自分らしく働く。"}
          </h1>
          <div
            className="flex flex-wrap items-center justify-center gap-2 text-xs"
            style={{ color: "#6B5541" }}
          >
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {"川崎駅徒歩圏内"}
            </span>
            <span className="opacity-40">|</span>
            <span>{"保護犬猫カフェ×就労継続支援B型"}</span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1">
              <Coins className="h-3.5 w-3.5" />
              {"時給400円〜"}
            </span>
          </div>
        </div>

        {/* Image area with top + bottom gradient overlays */}
        <div className="relative">
          {/* Top gradient: mint green → transparent (40% height for smooth blend) */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[40%]"
            style={{
              background: "linear-gradient(to bottom, #D0EBE5 0%, #D0EBE5 20%, transparent 100%)",
            }}
          />
          {/* Bottom gradient: transparent → mint green */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[30%]"
            style={{
              background: "linear-gradient(to top, #D0EBE5 0%, transparent 100%)",
            }}
          />
          <img
            src="/images/e5-ba-97-e8-88-97-e7-94-bb-e5-83-8f1.jpeg"
            alt="アネラカフェ店内で犬と触れ合うスタッフの様子"
            className="h-[300px] w-full object-cover"
          />
        </div>

        {/* CTA below image - seamless mint green continuation */}
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

      {/* --- PC Layout: Side by side (text left, image right) like StudyHub --- */}
      <div className="hidden md:block" style={{ backgroundColor: "#D0EBE5" }}>
        <div className="mx-auto flex max-w-5xl items-center gap-0">
          {/* Left: Text + CTA */}
          <div className="flex-1 py-16 pl-8 pr-4">
            <h1
              className="mb-4 text-4xl font-bold leading-snug text-balance"
              style={{ color: "#6B5541" }}
            >
              {"保護犬・猫に囲まれて、"}
              <br />
              <span style={{ color: "#E86833" }}>{"自分らしく"}</span>
              {"働く。"}
            </h1>
            <p
              className="mb-8 text-base leading-relaxed"
              style={{ color: "#6B5541" }}
            >
              {"保護犬猫カフェ×就労継続支援B型"}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: "#6B5541" }}>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {"川崎駅徒歩圏内"}
              </span>
              <span className="opacity-40">|</span>
              <span className="flex items-center gap-1">
                <Coins className="h-4 w-4" />
                {"時給400円〜"}
              </span>
            </div>

            <div className="mt-8 max-w-xs">
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

          {/* Right: Image with left gradient blend */}
          <div className="relative flex-1">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[30%]"
              style={{
                background: "linear-gradient(to right, #D0EBE5 0%, transparent 100%)",
              }}
            />
            <img
              src="/images/e5-ba-97-e8-88-97-e7-94-bb-e5-83-8f1.jpeg"
              alt="アネラカフェ店内で犬と触れ合うスタッフの様子"
              className="h-[480px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
