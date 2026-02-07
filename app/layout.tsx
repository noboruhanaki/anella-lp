import React from "react"
import type { Metadata, Viewport } from 'next'
import { M_PLUS_Rounded_1c } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const mplus = M_PLUS_Rounded_1c({
  weight: ['300', '400', '500', '700', '800'],
  subsets: ['latin'],
  variable: '--font-mplus',
})

export const metadata: Metadata = {
  title: 'アネラカフェ 川崎駅前店 | 保護犬猫カフェ×就労継続支援B型',
  description:
    '保護犬・猫に囲まれて、自分らしく働く。川崎駅徒歩圏内の就労継続支援B型事業所「アネラカフェ」。アニマルセラピー効果で心の安定を。見学・体験無料。',
}

export const viewport: Viewport = {
  themeColor: '#D0EBE5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${mplus.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
