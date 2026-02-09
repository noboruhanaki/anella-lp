"use client"

import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { imagePath } from "@/lib/constants"

export function Header() {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className="border-b bg-background shadow-sm"
      style={{ borderColor: "#D0EBE5" }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Logo - left on PC, centered on SP */}
        <a
          href="#"
          className="flex shrink-0 items-center md:justify-start justify-center flex-1 md:flex-none"
        >
          <img
            src={imagePath("/images/anella-logo-brown.png")}
            alt="ANELLA CAFE ロゴ"
            className="h-10 w-auto md:h-10"
          />
        </a>

        {/* PC: Right side - Phone + CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:07085790695"
            className="flex items-center gap-2 text-sm font-bold"
            style={{ color: "#6B5541" }}
          >
            <Phone className="h-4 w-4" />
            {"070-8579-0695"}
          </a>
          <Button
            onClick={scrollToForm}
            className="rounded-full px-6 py-2 text-sm font-bold shadow-md transition-transform hover:scale-105"
            style={{ backgroundColor: "#E86833", color: "#FFFFFF" }}
          >
            {"見学予約はこちら"}
          </Button>
        </div>
      </div>
    </header>
  )
}
