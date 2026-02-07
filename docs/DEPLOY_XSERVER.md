# Xサーバー（a-melo.com）への LP デプロイ手順

この LP を **https://a-melo.com/anella-work-b/** で公開するための手順です。  
ドメインは a-melo.com、CMS は WordPress、サーバーは Xサーバーで管理している前提です。

---

## 前提の整理

- **表示される LP** … Xサーバー上の **静的ファイル**（HTML/CSS/JS）として配置します。
- **お問い合わせフォーム** … Xサーバーでは Node.js の API が動かないため、**フォーム送信先だけ別のサービス**（Vercel または Google Apps Script）に任せます。

---

## 手順一覧

1. [ビルド用の環境変数を用意する（フォーム送信先）](#1-ビルド用の環境変数を用意するフォーム送信先)
2. [ローカルで静的ビルドする](#2-ローカルで静的ビルドする)
3. [Xサーバーに `anella-work-b` ディレクトリを作る](#3-xサーバーに-anella-work-b-ディレクトリを作る)
4. [ビルド成果物をアップロードする](#4-ビルド成果物をアップロードする)
5. [動作確認する](#5-動作確認する)

---

## 1. ビルド用の環境変数を用意する（フォーム送信先）

Xサーバーに置くのは **静的ファイルのみ** なので、お問い合わせは **外部の API URL** に送ります。

次のどちらかを使います。

### パターン A: Vercel に API をデプロイ（推奨）

同じリポジトリを Vercel にデプロイし、**API ルート**の URL をフォーム送信先にします。

**詳細な手順は [docs/VERCEL_FORM_API_SETUP.md](VERCEL_FORM_API_SETUP.md) を参照してください。**

- Vercel でプロジェクトをインポート → 環境変数（`RESEND_API_KEY` 必須など）を設定 → デプロイ。
- この LP は **basePath: /anella-work-b** のため、API の URL は次の形になります。  
  **`https://あなたのプロジェクト.vercel.app/anella-work-b/api/contact`**
- この URL をメモし、後述の「2. ローカルで静的ビルド」で `NEXT_PUBLIC_CONTACT_API_URL` に指定します。

### パターン B: Google Apps Script の Web アプリに送る

フォーム送信を GAS だけで完結させる場合は、GAS の「Web アプリ」の URL を用意し、その URL にフォーム内容を POST する形にします。  
（GAS 側でメール送信・スプレッドシート追記・Chatwork 等を実装する必要があります。）

その場合、ビルド時に `NEXT_PUBLIC_CONTACT_API_URL` に **GAS の Web アプリの URL** を設定します。  
※ 現在の LP のフォームは「JSON を POST する」仕様なので、GAS 側でも同じ形式で受け取る実装にしてください。

---

## 2. ローカルで静的ビルドする

プロジェクトのルートで次を実行します。

```bash
cd /Users/hanakinoboru/Desktop/anella-lp
npm ci
```

フォーム送信先の URL を環境変数で渡してビルドします。

**パターン A（Vercel の API を使う場合）の例:**

```bash
NEXT_PUBLIC_CONTACT_API_URL=https://あなたのプロジェクト.vercel.app/anella-work-b/api/contact npm run build
```

**パターン B（GAS の URL を使う場合）の例:**

```bash
NEXT_PUBLIC_CONTACT_API_URL=https://script.google.com/macros/s/xxxx/exec npm run build
```

ビルドが完了すると、**`out`** フォルダに静的ファイルが出力されます。  
この **`out` の中身** をそのまま `anella-work-b` にアップロードします。

---

## 3. Xサーバーに `anella-work-b` ディレクトリを作る

1. **Xサーバーのサーバーパネル**にログインする。
2. **「ファイル管理」**（または FTP の情報）を開く。
3. ドメイン **a-melo.com** の **公開ディレクトリ** に移動する。  
   - 多くの場合、`/home/あなたのサーバーID/a-melo.com/public_html` のようなパスです。  
   - WordPress をルートで使っている場合は、この `public_html` がサイトのドキュメントルートです。
4. その直下に **`anella-work-b`** という名前のフォルダを作成する。  
   - パス例: `public_html/anella-work-b`

---

## 4. ビルド成果物をアップロードする

- **アップロードするもの**: ローカルの **`out` フォルダの中身すべて**。
- **アップロード先**: Xサーバー上の **`anella-work-b`** の中（`anella-work-b` の直下に `index.html` や `_next` が来るようにする）。

### 方法 A: FTP ソフト（FileZilla など）を使う

1. Xサーバーの **FTP アカウント**（サーバーパネルで確認）で接続する。
2. リモート側で `public_html/anella-work-b` に移動する。
3. ローカルで `anella-lp/out` を開き、**中身のファイル・フォルダをすべて** 選択してアップロードする。  
   （`out` フォルダ自体をアップロードするのではなく、`out` の**中身**を `anella-work-b` に置く。）

### 方法 B: サーバーパネルの「ファイル管理」を使う

1. サーバーパネルの「ファイル管理」で `anella-work-b` を開く。
2. **アップロード**機能で、`out` 内のファイルをまとめてアップロードする。  
   - `index.html` が `anella-work-b/index.html` になるようにする。
   - `_next` フォルダごとアップロードする。

### アップロード後の目安

- `anella-work-b/index.html` が存在する
- `anella-work-b/_next/` がある
- `anella-work-b/anella-work-b/` に静的アセットがある（`basePath` によりこのような構造になります）

---

## 5. 動作確認する

1. ブラウザで **https://a-melo.com/anella-work-b/** を開く。  
   - LP が表示され、スタイルや画像が崩れていなければ OK。
2. お問い合わせフォームにテスト内容を入力して送信する。  
   - メール・Chatwork・スプレッドシートなど、設定した経路に届くか確認する。

---

## 補足

### ローカルで確認したいとき

`basePath` を有効にしたまま開発サーバーで見る場合:

```bash
npm run dev
```

ブラウザで **http://localhost:3000/anella-work-b/** を開いてください。

### フォームが送信できない場合

- ブラウザの開発者ツール（F12）の **Network** タブで、送信先 URL とレスポンスを確認する。
- `NEXT_PUBLIC_CONTACT_API_URL` を間違えていないか、ビルドし直して再度アップロードする。
- Vercel や GAS 側の環境変数・権限設定を見直す。

### WordPress との関係

- LP は **静的ファイル** なので、WordPress のテーマやプラグインの影響は受けません。
- **https://a-melo.com/** はこれまで通り WordPress、**https://a-melo.com/anella-work-b/** がこの LP という構成で問題ありません。

### 更新するとき

1. ローカルでコードを修正する。
2. 再度 `NEXT_PUBLIC_CONTACT_API_URL=... npm run build` でビルドする。
3. 新しい `out` の中身で、Xサーバーの `anella-work-b` の中身を**上書き**する。

以上で、a-melo.com の `/anella-work-b` に LP を公開する手順は完了です。
