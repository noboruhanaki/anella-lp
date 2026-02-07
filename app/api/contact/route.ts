import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import { Resend } from "resend"

export type ContactFormBody = {
  name: string
  phone: string
  email: string
  message?: string
}

const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO ?? "anella.kawasaki@gmail.com"
const CONTACT_EMAIL_FROM =
  process.env.CONTACT_EMAIL_FROM ?? "Anella LP <onboarding@resend.dev>"
const CHATWORK_API_TOKEN = process.env.CHATWORK_API_TOKEN
const CHATWORK_ROOM_ID = process.env.CHATWORK_ROOM_ID

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID
const GOOGLE_SHEET_NAME = process.env.GOOGLE_SHEET_NAME ?? "Sheet1"
const GOOGLE_SERVICE_ACCOUNT_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
const GOOGLE_APPS_SCRIPT_WEB_URL = process.env.GOOGLE_APPS_SCRIPT_WEB_URL

/** フォーム内容をメール本文・Chatwork用テキストに整形 */
function formatContactMessage(body: ContactFormBody): string {
  const lines = [
    "【LPフォーム】無料見学・体験のお申し込み",
    "",
    `お名前: ${body.name}`,
    `電話番号: ${body.phone}`,
    `メール: ${body.email}`,
    "",
    "ご希望の日時・ご質問:",
    body.message?.trim() || "（未記入）",
  ]
  return lines.join("\n")
}

/** Resend で Gmail 宛に送信 */
async function sendEmail(body: ContactFormBody): Promise<{ ok: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    return { ok: false, error: "RESEND_API_KEY is not set" }
  }
  const resend = new Resend(RESEND_API_KEY)
  const text = formatContactMessage(body)
  const { error } = await resend.emails.send({
    from: CONTACT_EMAIL_FROM,
    to: [CONTACT_EMAIL_TO],
    replyTo: body.email,
    subject: `【Anella】見学・体験申込: ${body.name}`,
    text,
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

/** Chatwork ルームにメッセージ投稿 */
async function sendToChatwork(body: ContactFormBody): Promise<{ ok: boolean; error?: string }> {
  if (!CHATWORK_API_TOKEN || !CHATWORK_ROOM_ID) {
    return { ok: false, error: "CHATWORK_API_TOKEN or CHATWORK_ROOM_ID is not set" }
  }
  const message = formatContactMessage(body)
  const form = new URLSearchParams({ body: message })
  const res = await fetch(
    `https://api.chatwork.com/v2/rooms/${CHATWORK_ROOM_ID}/messages`,
    {
      method: "POST",
      headers: {
        "X-ChatWorkToken": CHATWORK_API_TOKEN,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    }
  )
  if (!res.ok) {
    const t = await res.text()
    return { ok: false, error: `${res.status}: ${t}` }
  }
  return { ok: true }
}

/** Google Apps Script の Web アプリに POST してスプレッドシートに追記（キー不要）。 */
async function appendViaAppsScript(
  body: ContactFormBody
): Promise<{ ok: boolean; error?: string }> {
  if (!GOOGLE_APPS_SCRIPT_WEB_URL) return { ok: true }
  try {
    const res = await fetch(GOOGLE_APPS_SCRIPT_WEB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const text = await res.text()
    console.log("[Contact API] Apps Script response:", res.status, text.slice(0, 300))
    if (!res.ok) return { ok: false, error: `${res.status}: ${text.slice(0, 200)}` }
    const trimmed = text.trim()
    if (!trimmed.startsWith("{")) {
      return { ok: false, error: `GASがJSONではなく返しました: ${trimmed.slice(0, 150)}` }
    }
    const data = (() => {
      try {
        return JSON.parse(text) as { success?: boolean; error?: string }
      } catch {
        return {}
      }
    })()
    if (data.success === false) return { ok: false, error: data.error ?? text.slice(0, 200) }
    return { ok: true }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error("[Contact API] Apps Script fetch error:", msg)
    return { ok: false, error: msg }
  }
}

/** Google スプレッドシートに1行追記（日時・お名前・電話・メール・ご希望・質問）。未設定時はスキップ。 */
async function appendToSpreadsheet(
  body: ContactFormBody
): Promise<{ ok: boolean; error?: string }> {
  if (GOOGLE_APPS_SCRIPT_WEB_URL) {
    return appendViaAppsScript(body)
  }
  if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_JSON) {
    return { ok: true }
  }
  try {
    const credentials = JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON) as {
      client_email?: string
      private_key?: string
      [key: string]: unknown
    }
    if (credentials.private_key && typeof credentials.private_key === "string") {
      credentials.private_key = credentials.private_key.replace(/\\n/g, "\n")
    }
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })
    const sheets = google.sheets({ version: "v4", auth })
    const now = new Date()
    const row = [
      now.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
      body.name,
      "'" + body.phone,
      body.email,
      body.message?.trim() ?? "",
      "",
    ]
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${GOOGLE_SHEET_NAME}!A:F`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    })
    return { ok: true }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return { ok: false, error: msg }
  }
}

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json()
    const name = typeof raw?.name === "string" ? raw.name.trim() : ""
    const phone = typeof raw?.phone === "string" ? raw.phone.trim() : ""
    const email = typeof raw?.email === "string" ? raw.email.trim() : ""
    const message = typeof raw?.message === "string" ? raw.message.trim() : undefined

    if (!name || !phone || !email) {
      return NextResponse.json(
        { success: false, error: "お名前・電話番号・メールアドレスは必須です。" },
        { status: 400 }
      )
    }

    const body: ContactFormBody = { name, phone, email, message }

    const [emailResult, chatworkResult, sheetResult] = await Promise.all([
      sendEmail(body),
      sendToChatwork(body),
      appendToSpreadsheet(body),
    ])

    if (!emailResult.ok && !chatworkResult.ok) {
      const errors = [
        emailResult.error && `メール: ${emailResult.error}`,
        chatworkResult.error && `Chatwork: ${chatworkResult.error}`,
      ].filter(Boolean)
      return NextResponse.json(
        { success: false, error: errors.join(" / ") },
        { status: 502 }
      )
    }
    if (!sheetResult.ok) {
      console.warn("[Contact API] スプレッドシート追記に失敗:", sheetResult.error)
    }

    return NextResponse.json({
      success: true,
      ...(sheetResult.ok ? {} : { sheetError: sheetResult.error }),
    })
  } catch (e) {
    console.error("Contact API error:", e)
    return NextResponse.json(
      { success: false, error: "送信処理でエラーが発生しました。" },
      { status: 500 }
    )
  }
}
