# スプレッドシートへのフォーム追記の設定手順

フォーム送信時に Google スプレッドシートへ自動で1行ずつ追記するための設定です。**任意**です。設定しない場合はメールと Chatwork のみ動作します。

---

## 「サービスアカウントキーの作成が無効」と出る場合

組織ポリシー（`iam.disableServiceAccountKeyCreation`）で **サービスアカウントキーが作れない** 場合は、次のどちらかで対応できます。

### 方法A: 個人用 Google アカウントで新規プロジェクトを作る

**会社・学校のアカウントではなく、個人の Gmail（例: anella.kawasaki@gmail.com）** で [Google Cloud Console](https://console.cloud.google.com/) にログインし、**新しいプロジェクト** を作成してから、同じ手順（サービスアカウント → キー作成）をやり直します。個人のプロジェクトには組織ポリシーがかからないことが多いです。

### 方法B: Google Apps Script を使う（キー不要・おすすめ）

**サービスアカウントもキーも不要**です。スプレッドシートに紐づいた「Webアプリ」を1本用意し、LP の API からそこに POST する方式です。  
→ 手順は下の **「方法B: Google Apps Script で追記する（キー不要）」** を参照してください。

---

## 方法1: サービスアカウントで追記する（キーが作れる場合）

---

## 1. スプレッドシートを用意する

1. [Google スプレッドシート](https://sheets.google.com) で新規作成（または既存のスプレッドシートを開く）。
2. **1行目に次のヘッダー**を入力しておくと分かりやすいです（2行目以降に自動で追記されます）。F列「進捗」は架電状況のメモ用です。

   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | 日時 | お名前 | 電話番号 | メール | ご希望・ご質問 | 進捗 |

3. スプレッドシートの **URL** をコピーします。  
   例: `https://docs.google.com/spreadsheets/d/【ここがスプレッドシートID】/edit`  
   **スプレッドシートID**（`/d/` と `/edit` の間の英数字）を控えます。

---

## 2. Google Cloud でプロジェクトとサービスアカウントを作る

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセスし、Google アカウントでログイン。
2. 画面上部のプロジェクト選択 → **「新しいプロジェクト」** で作成（例: `anella-lp-form`）。
3. 左メニュー **「APIとサービス」→「ライブラリ」** で「Google Sheets API」を検索し **有効化**。
4. 左メニュー **「APIとサービス」→「認証情報」** → **「認証情報を作成」** → **「サービスアカウント」**。
5. サービスアカウント名（例: `anella-form-writer`）を入力 → **作成して続行** → ロールは「編集者」でOK → **完了**。
6. 作成したサービスアカウントをクリック → **「キー」** タブ → **「鍵を追加」** → **「新しい鍵を作成」** → **JSON** を選んで **作成**。  
   JSON ファイルがダウンロードされます。**この中身をそのまま使います（後述の環境変数に貼り付け）。**

---

## 3. スプレッドシートをサービスアカウントに共有する

1. ダウンロードした JSON を開き、**`client_email`** の値（例: `xxx@xxx.iam.gserviceaccount.com`）をコピー。
2. 手順1で用意した **スプレッドシート** を開く → 右上 **「共有」**。
3. **「ユーザーやグループを追加」** に、その `client_email` を貼り付け。
4. 権限を **「編集者」** にし、**送信**（通知は不要でOK）。

これで、Next.js からそのスプレッドシートに追記できるようになります。

---

## 4. 環境変数を設定する

`.env.local` に次の2つ（＋任意で1つ）を追加します。

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `GOOGLE_SHEET_ID` | スプレッドシートのID（URL の `/d/○○○/edit` の ○○○） | `1ABC...xyz` |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | サービスアカウントの JSON を **1行の文字列** でそのまま貼り付け | `{"type":"service_account",...}` |
| `GOOGLE_SHEET_NAME` | シート名（省略時は `Sheet1`） | `Sheet1` または `フォーム申込` |

### GOOGLE_SERVICE_ACCOUNT_JSON の入れ方

- ダウンロードした JSON を開き、**改行をすべて削除して1行にした文字列** をコピーするか、
- または **改行はそのまま** で、`.env.local` では値全体を `"..."` で囲む（複数行は多くの環境で扱いづらいので、1行にまとめる方が確実です）。

例（`.env.local`）:

```bash
GOOGLE_SHEET_ID=1ABCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_SHEET_NAME=Sheet1
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n","client_email":"...@....iam.gserviceaccount.com",...}
```

`private_key` 内の改行は、JSON 上は `\n` のまま（バックスラッシュ + n）で問題ありません。コード側で `\n` に変換しています。

---

## 5. 動作確認

1. `npm run dev` で開発サーバーを起動。
2. LP のフォームからテスト送信。
3. スプレッドシートを開き、2行目に「日時・お名前・電話番号・メール・ご希望・ご質問」が1行で追加されていればOKです。

---

## トラブルシューティング

- **403 / 権限エラー**  
  - スプレッドシートをサービスアカウントの `client_email` と **共有** しているか確認。  
  - Google Sheets API がプロジェクトで **有効** か確認。

- **404 / スプレッドシートが見つからない**  
  - `GOOGLE_SHEET_ID` が URL の `/d/○○○/edit` の ○○○ と一致しているか確認。  
  - `GOOGLE_SHEET_NAME` が実際のシート名と一致しているか確認（先頭のシートなら通常は `Sheet1`）。

- **Vercel などにデプロイする場合**  
  - 上記3つの環境変数を、デプロイ先の「Environment Variables」に同じように設定してください。

---

## 方法B: Google Apps Script で追記する（キー不要）

組織ポリシーでキーが作れない場合や、設定を簡単にしたい場合に使えます。**サービスアカウント・JSON キーは不要**です。

### B-1. スプレッドシートを用意する

1. [Google スプレッドシート](https://sheets.google.com) で新規作成（または既存のスプレッドシートを開く）。
2. **1行目に次のヘッダー**を入力（2行目以降に自動で追記されます）。F列「進捗」はスタッフが架電状況をメモする用です。

   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | 日時 | お名前 | 電話番号 | メール | ご希望・ご質問 | 進捗 |

### B-2. Apps Script を追加してコードを貼る

1. そのスプレッドシートのメニュー **「拡張機能」** → **「Apps Script」** を開く。
2. **1行目**に、あなたのスプレッドシートIDを設定します。  
   スプレッドシートのURL `https://docs.google.com/spreadsheets/d/【ここがID】/edit` の **【ここがID】** をコピーし、下のコードの `"ここにスプレッドシートID"` をそれに置き換えてください。
3. 表示されたエディタの **コード.gs** を、次のコード **だけ**（「\`\`\`javascript」と「\`\`\`」の行は含めない）に置き換えて保存（Ctrl+S / Cmd+S）。

```javascript
var SPREADSHEET_ID = "ここにスプレッドシートID";

function doPost(e) {
  var result = { success: false, error: "" };
  try {
    if (!e || !e.postData || !e.postData.contents) {
      result.error = "POST body がありません";
      return jsonResponse(result);
    }
    var body = JSON.parse(e.postData.contents);
    var name = body.name || "";
    var phone = body.phone || "";
    var email = body.email || "";
    var message = body.message || "";
    // 電話番号を文字列として保存（先頭の0が消えないように "'" を付与）
    var phoneAsText = "'" + String(phone);

    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = spreadsheet.getActiveSheet();
    var now = new Date();
    var timeStr = Utilities.formatDate(now, "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");

    // A列にデータがある最後の行の「次」に追記（F列だけ埋まった行は無視する）
    var lastRowAny = sheet.getLastRow();
    var nextRow = 2;
    if (lastRowAny > 0) {
      var colA = sheet.getRange("A1:A" + lastRowAny).getValues();
      for (var r = colA.length - 1; r >= 0; r--) {
        var val = colA[r][0];
        if (val !== null && val !== "" && String(val).trim() !== "") {
          nextRow = r + 2;
          break;
        }
      }
    }
    sheet.getRange(nextRow, 1, 1, 6).setValues([[timeStr, name, phoneAsText, email, message, ""]]);

    result.success = true;
    return jsonResponse(result);
  } catch (err) {
    result.error = err.toString();
    return jsonResponse(result);
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

- **重要**: 「\`\`\`javascript」や「\`\`\`」の行は **コピーしないでください**。  
- **SPREADSHEET_ID**: あなたのシートのURLは `.../d/1ImDoahlNH3nQJaGrppBLNaLIGrf2OTvtv9FANc24As0/edit` なら、`var SPREADSHEET_ID = "1ImDoahlNH3nQJaGrppBLNaLIGrf2OTvtv9FANc24As0";` にします。

### B-3. Web アプリとしてデプロイする

1. エディタ右上 **「デプロイ」** → **「新しいデプロイ」**。
2. 種類で **「ウェブアプリ」** を選択。
3. **「次のユーザーとして実行」**: 自分のメール（**自分**）。
4. **「アクセスできるユーザー」**: **「全員」**（LP のサーバーから呼ぶため）。
5. **「デプロイ」** をクリック。
6. 表示された **「ウェブアプリの URL」** をコピー（例: `https://script.google.com/macros/s/AKfy.../exec`）。**この URL を環境変数に設定します。**

### B-4. 環境変数を設定する

`.env.local` に **次の1行だけ** 追加します（サービスアカウント用の変数は不要です）。

```bash
GOOGLE_APPS_SCRIPT_WEB_URL=https://script.google.com/macros/s/【あなたのデプロイURL】/exec
```

- **注意**: `GOOGLE_SHEET_ID` や `GOOGLE_SERVICE_ACCOUNT_JSON` は **設定しないでください**。Apps Script 方式のときは `GOOGLE_APPS_SCRIPT_WEB_URL` のみ使います。

### B-5. 動作確認

1. `npm run dev` で開発サーバーを起動。
2. LP のフォームからテスト送信。
3. 手順 B-1 で用意したスプレッドシートを開き、2行目に1行追加されていればOKです。

### B-6. 進捗管理列の使い方（F列「ステータス」など）

**同じシートで進捗を管理するのはおすすめです。** 架電したらその行のF列だけメモするだけで、一覧で状況が分かります。

- **追記のルール**
  - 新しい申込は **「A列にデータがある最後の行」のすぐ下** にだけ追記します。F列だけ先に入力規則で「未架電」などを入れておいても、その行は飛ばされず、正しい順で追記されます。
- **A～E 列をロックしている場合**
  - フォームは A～E と F（空欄）だけに書き込みます。F列はスタッフが編集する想定なので、上書きしません。
- **運用例**
  - F列に 未架電 / 架電済 / 折返待ち / 完了 など。データの入力規則でリストを指定しておくと、セルをクリックして選ぶだけになります。

### トラブルシューティング（Apps Script）

- **403 Forbidden**  
  - デプロイ時の「アクセスできるユーザー」が **「全員」** になっているか確認。  
  - もう一度デプロイし直し、**新しい URL** を `.env.local` に設定し直す。
- **スクリプトがスプレッドシートに追記しない**  
  - Apps Script は、**そのスクリプトを開いたときと同じスプレッドシート**（getActiveSpreadsheet）に追記します。スプレッドシートの「拡張機能」→「Apps Script」から開いたプロジェクトであれば、そのスプレッドシートが対象です。
