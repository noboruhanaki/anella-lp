import React from "react"
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
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
        {/* Meta Pixel Code - head相当で読み込み（beforeInteractiveで初期HTMLに含まれる） */}
        <Script
          id="meta-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1265449258783286');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1265449258783286&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
