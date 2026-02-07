# Xサーバー：スタイル・画像が崩れる場合の対処（WordPress と .htaccess）

LP を `public_html/anella-work-b` に置いたのに、**スタイルが効かない・画像が表示されない** 場合は、**WordPress の .htaccess** が `/anella-work-b/` 以下の CSS・画像リクエストを WordPress に送ってしまっていることが原因です。

---

## まず確認：どこの .htaccess を触るか

**a-melo.com の「トップ」が表示されている WordPress** の **index.php が入っているフォルダ** と **同じ場所** にある .htaccess を編集する必要があります。

- 多くの場合: **`public_html/.htaccess`**
- Xサーバーで a-melo.com を「 addon ドメイン」にしている場合: ドメインの「公開フォルダ」が別指定になっていることがあります。その場合は、**その公開フォルダ直下の .htaccess** を編集してください。  
  （サーバーパネル「ドメイン設定」で、a-melo.com の「公開フォルダ」を確認できます。）

---

## 方法1: RewriteCond を 1 行追加する（いまのやり方）

### 場所

- **Xサーバー上で編集するファイル:**  
  `public_html/.htaccess`  
  （a-melo.com のドキュメントルートにある、WordPress が使っている .htaccess）

### 編集内容

**「# BEGIN WordPress」から「# END WordPress」のブロックの中** にある、

```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
```

の **直前** に、次の **1 行** を追加します。

```apache
RewriteCond %{REQUEST_URI} !^/anella-work-b(/|$)
```

### 編集後のイメージ

WordPress の .htaccess はだいたい次のような形になっています。  
**↑ の 1 行を、既存の RewriteCond の上（2 行の RewriteCond の前）に足してください。**

```apache
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_URI} !^/anella-work-b(/|$)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
```

追加する行は **この 1 行だけ** です。

```apache
RewriteCond %{REQUEST_URI} !^/anella-work-b(/|$)
```

- これで「URL が `/anella-work-b` または `/anella-work-b/...` で始まる場合は、`/index.php` に回さない」となり、CSS・画像がそのまま配信されます。
- 編集したら **上書き保存** してください。

---

## 方法2: 先頭に「anella-work-b は通過」ルールを足す（方法1で変わらないとき）

**「# BEGIN WordPress」より上**、.htaccess の **いちばん上** に、次のブロックをそのまま追加します。

```apache
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule ^anella-work-b - [L]
</IfModule>
```

つまり、.htaccess の **1 行目から** こうなっているイメージです。

```apache
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule ^anella-work-b - [L]
</IfModule>

# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
...（以下、もともとの WordPress の内容）
```

- これで「URL が anella-work-b で始まる場合は、ここで処理を打ち切ってそのままファイルを返す」ようになります。
- 方法1 と **両方** 入っていても問題ありません。先頭のルールが先に効きます。

---

## 2. anella-work-b フォルダ用の .htaccess（任意）

`anella-work-b` の **中** に、次の内容で **.htaccess** を 1 つ作っておくと安心です。

- このフォルダではリライトをオフにする  
- ディレクトリのデフォルトページを `index.html` にする  

**ファイルの場所:**  
`public_html/anella-work-b/.htaccess`

**中身（そのままコピーして使ってください）:**

```apache
# LP 静的配信用（WordPress のリライトをこのフォルダでは使わない）
RewriteEngine Off
DirectoryIndex index.html
```

- なければ **新規作成**、すでに .htaccess がある場合は **先頭にこの 2 行を追加** して保存してください。

---

## 3. 確認

1. **CSS が本当に届いているか試す**  
   ブラウザで次の URL を **そのまま** 開いてください。  
   `https://a-melo.com/anella-work-b/_next/static/chunks/c4fff43d3e4e90ea.css`
   - **CSS の文字列**（`body{` や `font-family` など）が表示される → 静的ファイルは読めている。LP 側のパスやキャッシュを疑う。
   - **WordPress の HTML**（メニューや「ページが見つかりません」など）が表示される → まだ WordPress に渡っている。**編集した .htaccess が、a-melo.com で実際に使われているか** を確認する（別フォルダの .htaccess を編集していないか）。

2. 上で CSS が表示されるようになったら、**https://a-melo.com/anella-work-b/** を開き直し（スーパーリロード: Ctrl+Shift+R または Cmd+Shift+R）、スタイルと画像を確認する。

3. まだ崩れる場合は、ブラウザで **F12 → Network** を開き、赤くなっているリクエストの **URL** をコピーして、その URL をアドレスバーで直接開く。  
   - HTML が返ってくる → そのパスも WordPress に渡っている。方法2 の「先頭にルール追加」を試す。

---

## まとめ

| やること | ファイル | 内容 |
|----------|----------|------|
| 方法1 | ドキュメントルートの `.htaccess` | WordPress の RewriteCond の前に `RewriteCond %{REQUEST_URI} !^/anella-work-b(/|$)` を 1 行追加 |
| 方法2（方法1で効かないとき） | 同じ .htaccess の **先頭** | `RewriteRule ^anella-work-b - [L]` のブロックを # BEGIN WordPress より上に追加 |
| 推奨 | `anella-work-b/.htaccess` | `RewriteEngine Off` と `DirectoryIndex index.html` を記載 |

**重要:** 編集する .htaccess は、**a-melo.com の WordPress の index.php があるフォルダと同じ場所**のものです。Xサーバーで「公開フォルダ」を別にしている場合は、そのフォルダ直下の .htaccess を編集してください。
