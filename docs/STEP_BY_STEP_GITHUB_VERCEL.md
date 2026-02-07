# ゼロからやる手順（Git ・ GitHub ・ Vercel）

**プログラミングが初めてでも、この順に「写す・クリックする」だけで進められます。**

---

## やることの全体像

1. **Git** … このフォルダの「変更を1つのまとまりで保存」する（もう中身の追加はこちらで済ませてあります）
2. **GitHub** … そのまとまりをネット上に置く場所を作る
3. **Vercel** … GitHub とつなげて、フォーム送信用の API を動かす

---

## ステップ1: コミット（変更をまとめて保存する）

**注意:** Cursor の内蔵ターミナルだと `git commit` が失敗することがあります。  
**Mac の「ターミナル」アプリ**（または iTerm など）を開いて、そこで実行してください。

1. **ターミナル**を開く（Spotlight で「ターミナル」と検索 → Enter）。
2. 次の **1行ずつ** コピーして貼り付けて Enter。全部で3回です。

```bash
cd /Users/hanakinoboru/Desktop/anella-lp
```

```bash
git add .
```

```bash
git commit -m "Anella LP complete"
```

- 3つ目で `[main xxxxx] Anella LP complete` のように出れば OK です。
- 「nothing to commit」と出た場合は、すでにコミット済みなので **ステップ2 へ** 進んで大丈夫です。

---

## ステップ2: GitHub で「空の箱」を作る

1. ブラウザで **https://github.com** を開く。
2. ログイン（アカウントがなければ **Sign up** で作成）。
3. 右上の **＋** → **New repository** をクリック。
4. 次のように入力・選択する：
   - **Repository name:** `anella-lp`（この名前のまま推奨）
   - **Description:** 空で OK
   - **Public** を選ぶ
   - **「Add a README file」にはチェックを入れない**（重要）
   - **Create repository** をクリック。
5. 次の画面で **「…or push an existing repository from the command line」** という枠が出ているはず。その中に **2行のコマンド** が書いてあります。  
   例：
   ```text
   git remote add origin https://github.com/【あなたのユーザー名】/anella-lp.git
   git push -u origin main
   ```
   この **2行** をメモ（またはその画面を開いたまま）にして、次のステップ3 で使います。

---

## ステップ3: このパソコンから GitHub に送る（push）

1. **ターミナル**（Mac のターミナル）を開いたまま、次のコマンドを **1行目だけ** 実行する。  
   **`【あなたのユーザー名】` の部分は、ステップ2 で表示されたあなたの GitHub のユーザー名に置き換えてください。**

```bash
git remote add origin https://github.com/【あなたのユーザー名】/anella-lp.git
```

- すでに `origin` があると出た場合は、次のようにしてからもう一度実行するか、2行目だけ実行してください。
  ```bash
  git remote remove origin
  git remote add origin https://github.com/【あなたのユーザー名】/anella-lp.git
  ```

2. 続けて、次の **1行** を実行する。

```bash
git push -u origin main
```

- 初回は **GitHub のユーザー名とパスワード** を聞かれることがあります。  
  - パスワードは、GitHub の **Settings → Developer settings → Personal access tokens** で作った **トークン** を入れる場合があります（通常のパスワードでは通らないことがあります）。
- 成功すると、GitHub のリポジトリのページを更新すると、ファイル一覧が表示されます。

ここまでで **「この LP のコードが GitHub に上がった」** 状態になります。

---

## ステップ4: Vercel にログインしてプロジェクトを作る

1. ブラウザで **https://vercel.com** を開く。
2. **Sign Up** または **Log In** をクリック。
3. **Continue with GitHub** を選ぶ → GitHub の認証を許可する。
4. ログイン後、**Add New…** → **Project** をクリック。
5. **Import Git Repository** の一覧に **anella-lp** が出ているはずなので、その横の **Import** をクリック。
6. **Configure Project** の画面では、そのまま **Deploy** をクリックしてよいです（設定は後から変えられます）。
7. しばらく待つと「Congratulations!」のような画面になり、**Visit** や **Domains** に URL が出ます。  
   例: `https://anella-lp-xxxx.vercel.app`  
   この **xxxx の部分を含めた URL 全体** をメモしてください。

---

## ステップ5: Vercel に「環境変数」を入れる（フォームが動くようにする）

1. Vercel の画面で、いまデプロイした **anella-lp** プロジェクトを開く。
2. 上の方の **Settings** をクリック。
3. 左メニューで **Environment Variables** をクリック。
4. 次のように **1つずつ** 追加する：
   - **Key:** `RESEND_API_KEY`
   - **Value:** （Resend の API キー。後述の「Resend のキーを取る」を参照）
   - **Environment:** **Production** にチェック
   - **Save** をクリック。
5. 環境変数を入れたら、**Deployments** タブに戻り、いちばん上のデプロイの **⋯（縦三点）** → **Redeploy** をクリック。これで新しい設定が反映されます。

### Resend のキーを取る（メール送信用・必須）

1. **https://resend.com** を開く。
2. **Sign Up** またはログイン（Google でログインでも可）。
3. ログイン後、左メニューなどから **API Keys** を開く。
4. **Create API Key** をクリック → 名前（例: anella-lp）を入れて作成。
5. 表示された **キー（re_ で始まる長い文字列）** をコピー。  
   これが **Value** に入れる `RESEND_API_KEY` の値です。**このキーはもう一度表示されないので、必ずコピーして保存してください。**

---

## ステップ6: フォーム送信先の URL をメモする

Vercel にデプロイしたこの LP では、**フォームの送信先（API）** は次の URL です。

```text
https://【あなたのVercelのドメイン】/anella-work-b/api/contact
```

- 例: ドメインが `https://anella-lp-abc123.vercel.app` なら  
  → **https://anella-lp-abc123.vercel.app/anella-work-b/api/contact**

この URL を、**Xサーバー用のビルド** のときに使います（別の手順書「DEPLOY_XSERVER.md」の「2. ローカルで静的ビルド」で使う `NEXT_PUBLIC_CONTACT_API_URL` の値です）。

---

## ここまでできたら

- **Git** … この LP の変更が1つのコミットとして保存されている  
- **GitHub** … その内容が GitHub の `anella-lp` リポジトリに上がっている  
- **Vercel** … そのリポジトリから LP（と API）がデプロイされ、フォーム送信先の URL が決まっている  

あとは **docs/DEPLOY_XSERVER.md** の「2. ローカルで静的ビルド」以降に従って、  
`NEXT_PUBLIC_CONTACT_API_URL` に上記の URL を入れてビルドし、`out` の中身を Xサーバーの `anella-work-b` にアップロードすれば完了です。

---

## よくあるつまずき

- **「git なんて知らない」**  
  → この手順では「写して Enter」だけで大丈夫です。ステップ1〜3 をその通りにやれば、Git の最低限の操作だけになります。

- **「git push でパスワードを聞かれて通らない」**  
  → GitHub では「パスワード」の代わりに **Personal access token** を使います。  
  GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Generate new token** でトークンを作り、そのトークンを「パスワード」の欄に貼り付けてください。

- **「Vercel に anella-lp が一覧に出てこない」**  
  → ステップ3 の `git push` が成功しているか、GitHub の anella-lp リポジトリを開いてファイルが並んでいるか確認してください。表示されていれば、Vercel の **Import** 一覧を一度更新（F5）してみてください。

- **「Cursor のターミナルで git commit が失敗する」**  
  → Cursor の仕様で、内部でオプションが付くことがあります。**Mac の「ターミナル」アプリ** を開き、そこに同じコマンドを貼り付けて実行してください。
