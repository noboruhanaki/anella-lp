"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, Send, Shield } from "lucide-react"
import { toast } from "sonner"

export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = (fd.get("name") ?? "").toString().trim()
    const phone = (fd.get("phone") ?? "").toString().trim()
    const email = (fd.get("email") ?? "").toString().trim()
    const message = (fd.get("message") ?? "").toString().trim() || undefined

    setSending(true)
    try {
      const apiUrl =
        typeof process.env.NEXT_PUBLIC_CONTACT_API_URL === "string" &&
        process.env.NEXT_PUBLIC_CONTACT_API_URL.trim() !== ""
          ? process.env.NEXT_PUBLIC_CONTACT_API_URL.trim()
          : "/api/contact"
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data?.error ?? "送信に失敗しました。お手数ですがお電話でご連絡ください。")
        return
      }
      if (data?.sheetError) {
        toast.warning(`申し込みは送信されましたが、スプレッドシートの記録に失敗しました: ${data.sheetError}`)
      }
      setSubmitted(true)
    } catch {
      toast.error("送信に失敗しました。お手数ですがお電話でご連絡ください。")
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <section id="contact-form" className="px-5 py-16" style={{ backgroundColor: "#D0EBE5" }}>
        <div className="mx-auto max-w-md text-center">
          <CheckCircle2 className="mx-auto mb-4 h-12 w-12" style={{ color: "#6B5541" }} />
          <h3 className="mb-2 text-lg font-bold" style={{ color: "#6B5541" }}>
            {"お申し込みありがとうございます"}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#4A6B5E" }}>
            {"担当スタッフより折り返しご連絡いたします。"}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="contact-form" className="px-5 py-16" style={{ backgroundColor: "#D0EBE5" }}>
      <div className="mx-auto max-w-md">
        <h2
          className="mb-3 text-center text-lg font-bold leading-relaxed text-balance"
          style={{ color: "#6B5541" }}
        >
          {"まずは「保護犬猫カフェ」に遊びに来る感覚で、見学にいらっしゃいませんか？"}
        </h2>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {["見学無料", "相談無料", "履歴書不要"].map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: "#6B5541", color: "#FFFFFF" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl bg-background p-6 shadow-lg">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm font-medium" style={{ color: "#6B5541" }}>
              {"お名前"}
              <span className="ml-1 text-xs" style={{ color: "#C4956A" }}>{"必須"}</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="山田 太郎"
              required
              disabled={sending}
              className="rounded-lg border-2 focus-visible:ring-0"
              style={{ borderColor: "#D0EBE5", color: "#6B5541" }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="text-sm font-medium" style={{ color: "#6B5541" }}>
              {"電話番号"}
              <span className="ml-1 text-xs" style={{ color: "#C4956A" }}>{"必須"}</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="090-0000-0000"
              required
              disabled={sending}
              className="rounded-lg border-2 focus-visible:ring-0"
              style={{ borderColor: "#D0EBE5", color: "#6B5541" }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-medium" style={{ color: "#6B5541" }}>
              {"メールアドレス"}
              <span className="ml-1 text-xs" style={{ color: "#C4956A" }}>{"必須"}</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              required
              disabled={sending}
              className="rounded-lg border-2 focus-visible:ring-0"
              style={{ borderColor: "#D0EBE5", color: "#6B5541" }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="message" className="text-sm font-medium" style={{ color: "#6B5541" }}>
              {"ご希望の日時・ご質問"}
              <span className="ml-1 text-xs" style={{ color: "#9A8573" }}>{"任意"}</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="〇月〇日の〇〇時から見学させていただきたいのですが、大丈夫でしょうか。"
              rows={4}
              disabled={sending}
              className="rounded-lg border-2 focus-visible:ring-0"
              style={{ borderColor: "#D0EBE5", color: "#6B5541" }}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={sending}
            className="w-full rounded-full py-6 text-base font-bold shadow-lg transition-transform hover:scale-105 disabled:opacity-70"
            style={{ backgroundColor: "#E86833", color: "#FFFFFF" }}
          >
            {sending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {"送信中…"}
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                {"無料見学・体験に申し込む"}
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 text-center">
            <Shield className="h-3.5 w-3.5" style={{ color: "#9A8573" }} />
            <p className="text-xs leading-relaxed" style={{ color: "#9A8573" }}>
              {"無理な勧誘は一切いたしませんのでご安心ください。"}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
