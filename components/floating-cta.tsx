"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"

export function FloatingCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t bg-background px-4 py-3 shadow-lg transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ borderColor: "#D0EBE5" }}
    >
      <div className="mx-auto flex max-w-md items-center gap-3">
        <Button
          onClick={scrollToForm}
          size="lg"
          className="flex-1 rounded-full py-5 text-sm font-bold shadow-md transition-transform hover:scale-105"
          style={{ backgroundColor: "#E86833", color: "#FFFFFF" }}
        >
          <Mail className="mr-1.5 h-4 w-4" />
          {"無料相談"}
        </Button>
        <a
          href="tel:07085790695"
          className="flex items-center gap-1.5 rounded-full border-2 px-4 py-3 text-sm font-bold transition-opacity hover:opacity-80"
          style={{ borderColor: "#6B5541", color: "#6B5541" }}
        >
          <Phone className="h-4 w-4" />
          {"070-8579-0695"}
        </a>
      </div>
    </div>
  )
}
