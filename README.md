This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## お問い合わせフォーム

LP の「無料見学・体験に申し込む」フォームは送信時に以下を行います。

- **Gmail**（`anella.kawasaki@gmail.com`）にメール送信（[Resend](https://resend.com) 使用）
- **Chatwork** の指定ルームにメッセージ投稿（即時通知・架電用）

スプレッドシートへの記録が必要な場合は [docs/FORM_SUBMISSION_DESIGN.md](docs/FORM_SUBMISSION_DESIGN.md) を参照してください。

### 環境変数

フォーム送信を有効にするには `.env.local` に以下を設定してください。`.env.example` をコピーして値を埋めるとよいです。

| 変数名 | 説明 |
|--------|------|
| `RESEND_API_KEY` | Resend の API キー（必須） |
| `CONTACT_EMAIL_TO` | 申し込みを受け取るメールアドレス（任意・未設定時は anella.kawasaki@gmail.com） |
| `CONTACT_EMAIL_FROM` | 送信元表示（任意） |
| `CHATWORK_API_TOKEN` | Chatwork API トークン（必須） |
| `CHATWORK_ROOM_ID` | 通知先のルーム ID（必須） |
| `GOOGLE_SHEET_ID` | スプレッドシートID（任意・追記する場合） |
| `GOOGLE_SHEET_NAME` | シート名（任意・未設定時は Sheet1） |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | サービスアカウントのJSON（任意・スプレッドシート用） |

スプレッドシートの詳細な設定手順は [docs/GOOGLE_SHEETS_SETUP.md](docs/GOOGLE_SHEETS_SETUP.md) を参照してください。

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
