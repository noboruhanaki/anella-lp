# フォーム送信先：Vercel で API を動かす（詳細手順）

Xサーバーに置く LP から、お問い合わせフォームの送信先として **Vercel にデプロイした API** を使うための手順です。

---

## 全体の流れ

1. このプロジェクトを **Git のリポジトリ** に入れる（まだなら）
2. **Vercel** にアカウント作成・ログイン
3. Vercel で **プロジェクトをインポート**（Git 連携）
4. **環境変数** を Vercel に登録する
5. **デプロイ** して API の URL を確認する
6. その URL を、Xサーバー用ビルド時の **フォーム送信先** に指定する

---

## 1. プロジェクトを Git に入れる（まだの場合）

Vercel は Git（GitHub / GitLab / Bitbucket）と連携してデプロイする前提です。

- すでに Git 管理している場合は **2. へ**。
- まだの場合は、ターミナルでプロジェクトのフォルダに入り、次を実行してください。

```bash
cd /Users/hanakinoboru/Desktop/anella-lp
git init
git add .
git commit -m "Initial commit: Anella LP"
```

その後、GitHub などに **新しいリポジトリ** を作成し、そこに push します。

```bash
# 例: GitHub で anella-lp リポジトリを作成した場合
git remote add origin https://github.com/あなたのユーザー名/anella-lp.git
git branch -M main
git push -u origin main
```

---

## 2. Vercel にログインする

1. ブラウザで **https://vercel.com** を開く。
2. **Sign Up / Log In** から、**GitHub**（または GitLab / Bitbucket）でログインする。  
   （Git のアカウントと連携すると、リポジトリ一覧が Vercel に表示されます。）

---

## 3. プロジェクトを Vercel にインポートする

1. Vercel のダッシュボードで **「Add New…」→「Project」** をクリック。
2. **Import Git Repository** で、`anella-lp` のリポジトリを選ぶ。
3. **Configure Project** で次を確認する：
   - **Framework Preset**: Next.js のまま（自動検出）
   - **Root Directory**: 空のまま（リポジトリのルートがプロジェクトルート）
   - **Build Command**: `next build` のまま
   - **Output Directory**: 空のまま
4. **Environment Variables** はこの段階では空でよい。あとでまとめて設定します。
5. **Deploy** をクリックして、いったんデプロイを開始する。  
   （環境変数なしだとフォーム送信は失敗しますが、API の URL を確認するために一度デプロイして問題ありません。）

---

## 4. 環境変数を Vercel に登録する

デプロイが終わったら、**Project → Settings → Environment Variables** を開き、次の変数を **Production** 向けに追加します。

### 必須（メール送信）

| 名前 | 値 | 説明 |
|------|-----|------|
| `RESEND_API_KEY` | （Resend の API キー） | Resend のダッシュボードで発行。フォーム内容をメールで送るために必須。 |

- Resend の API キー: https://resend.com にログイン → **API Keys** で作成。

### 推奨（送信先メール・差出人）

| 名前 | 値 | 説明 |
|------|-----|------|
| `CONTACT_EMAIL_TO` | `anella.kawasaki@gmail.com` | フォームの内容が届くメールアドレス。未設定時もこのアドレスが使われます。 |
| `CONTACT_EMAIL_FROM` | 例: `Anella LP <noreply@あなたのドメイン.com>` | メールの「差出人」。Resend でドメイン認証したアドレスを指定するとよい。未設定時は `Anella LP <onboarding@resend.dev>` が使われます。 |

### 任意（Chatwork に通知）

| 名前 | 値 | 説明 |
|------|-----|------|
| `CHATWORK_API_TOKEN` | （Chatwork の API トークン） | Chatwork の設定で発行。 |
| `CHATWORK_ROOM_ID` | （ルーム ID） | 通知を投稿するルームの ID。 |

### 任意（スプレッドシートに記録）

次の **どちらか** を設定すると、フォーム内容をスプレッドシートに 1 行ずつ追記できます。

**方法 A: Google Apps Script の Web アプリを使う（キー不要）**

| 名前 | 値 | 説明 |
|------|-----|------|
| `GOOGLE_APPS_SCRIPT_WEB_URL` | （GAS の Web アプリの URL） | 「デプロイ」→「ウェブアプリ」で「誰でも」実行可能にした URL。 |

**方法 B: Google Sheets API（サービスアカウント）を使う**

| 名前 | 値 | 説明 |
|------|-----|------|
| `GOOGLE_SHEET_ID` | スプレッドシートの ID（URL の `/d/` と `/edit` の間） | 追記先のスプレッドシート。 |
| `GOOGLE_SHEET_NAME` | 例: `Sheet1` | 追記するシート名。未設定時は `Sheet1`。 |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | サービスアカウントの JSON を **1 行の文字列** で | 鍵の JSON の中身をそのまま貼る。改行は `\n` のままでも可。 |

- スプレッドシートの設定手順は **docs/GOOGLE_SHEETS_SETUP.md** を参照。

---

### 環境変数の登録手順（Vercel 上）

1. **Settings → Environment Variables** を開く。
2. **Key** に変数名（例: `RESEND_API_KEY`）、**Value** に値を入力。
3. **Environment** で **Production** にチェックを入れる（Preview も使う場合は両方でよい）。
4. **Save** で保存。
5. 必要な変数分、同様に追加する。

環境変数を追加・変更したあとは、**Deployments** タブで **最新のデプロイの「⋯」→ Redeploy** を実行すると、新しい値が反映されます。

---

## 5. API の URL を確認する

このプロジェクトでは **basePath** が `/anella-work-b` になっているため、Vercel にデプロイしたときの API の URL は次の形になります。

```
https://【あなたのプロジェクトのドメイン】/anella-work-b/api/contact
```

**確認方法**

1. Vercel の **Project → Deployments** で、直近のデプロイを開く。
2. **Domains** またはデプロイ結果の **Visit** で表示される URL を確認する。  
   例: `https://anella-lp-xxxx.vercel.app`
3. そのドメインに **`/anella-work-b/api/contact`** を付けた URL が、フォーム送信先の API URL です。

**例**

- ドメインが `https://anella-lp-abc123.vercel.app` の場合  
  → フォーム送信先は **`https://anella-lp-abc123.vercel.app/anella-work-b/api/contact`**

この URL をメモし、Xサーバー用の静的ビルドで使います。

---

## 6. 動作確認（Vercel の API だけ）

ブラウザや curl で、Vercel の API に直接 POST してテストできます。

```bash
curl -X POST "https://【あなたのドメイン】/anella-work-b/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"テスト","phone":"090-0000-0000","email":"test@example.com","message":"テスト送信"}'
```

- 成功時: `{"success":true}` のような JSON が返る。
- 届いたメール（および Chatwork・スプレッドシート）を確認する。

---

## 7. Xサーバー用ビルドでこの URL を使う

Xサーバーにアップロードする **静的 LP** をビルドするとき、フォームの送信先に上記の Vercel の API URL を指定します。

```bash
cd /Users/hanakinoboru/Desktop/anella-lp
npm ci
NEXT_PUBLIC_CONTACT_API_URL=https://【あなたのVercelドメイン】/anella-work-b/api/contact npm run build
```

**例**

```bash
NEXT_PUBLIC_CONTACT_API_URL=https://anella-lp-abc123.vercel.app/anella-work-b/api/contact npm run build
```

ビルドでできた **`out`** の中身を、Xサーバーの **`anella-work-b`** にアップロードすれば、LP 上のフォームが Vercel の API に送信されます。

---

## まとめチェックリスト

- [ ] プロジェクトを Git に入れ、GitHub 等に push した
- [ ] Vercel にログインし、このリポジトリをインポートしてデプロイした
- [ ] Vercel の **Environment Variables** に `RESEND_API_KEY` を設定した（必須）
- [ ] 必要に応じて `CONTACT_EMAIL_TO` / Chatwork / スプレッドシート用の変数を設定した
- [ ] 環境変数設定後に **Redeploy** した
- [ ] API の URL（`https://xxx.vercel.app/anella-work-b/api/contact`）をメモした
- [ ] Xサーバー用ビルドで `NEXT_PUBLIC_CONTACT_API_URL` にその URL を指定してビルドした

以上で、フォーム送信先を Vercel にする設定は完了です。Xサーバーへのアップロード手順は **docs/DEPLOY_XSERVER.md** を参照してください。
