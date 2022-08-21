# nosql-handson

## Get Sterted

1. firebase でサービスアカウントを作成

2. サービスアカウントキーを含む秘密鍵（json ファイル）の生成とインストール（FYI：[SDK の初期化](ttps://firebase.google.com/docs/admin/setup#initialize-sdk)）

3. 現在のシェルセッションの環境変数として、json ファイルを保存したパスを設定

   ```sh
   export GOOGLE_APPLICATION_CREDENTIALS="~/your/file/path/file-name.json"
   ```

4. 起動

   ```sh
   yarn dev
   ```
