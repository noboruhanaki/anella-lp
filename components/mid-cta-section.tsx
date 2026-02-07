"use client"

import { Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MidCtaSection() {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="px-5 py-12 bg-background">
      <div className="mx-auto max-w-md">
        <div className="relative overflow-hidden rounded-2xl p-6 shadow-lg" style={{ backgroundColor: "#FFF8F3" }}>
          {/* Decorative top accent */}
          <div
            className="absolute left-0 right-0 top-0 h-1.5"
            style={{ backgroundColor: "#E86833" }}
          />

          <p
            className="mb-1 mt-2 text-center text-xs font-bold tracking-wider"
            style={{ color: "#E86833" }}
          >
            {"\\  カンタン30秒で完了！ /"}
          </p>

          <Button
            onClick={scrollToForm}
            size="lg"
            className="mt-3 w-full rounded-full py-6 text-base font-bold shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: "#E86833", color: "#FFFFFF" }}
          >
            <Mail className="mr-2 h-5 w-5" />
            {"無料の個別相談はコチラ"}
          </Button>

          {/* Phone number */}
          <div className="mt-4 flex flex-col items-center gap-1">
            <a
              href="tel:07085790695"
              className="flex items-center gap-2 text-xl font-bold transition-opacity hover:opacity-80"
              style={{ color: "#6B5541" }}
            >
              <Phone className="h-5 w-5" />
              {"070-8579-0695"}
            </a>
            <p className="text-xs" style={{ color: "#9A8573" }}>
              {"受付時間 10:00〜19:00（年中無休）"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
