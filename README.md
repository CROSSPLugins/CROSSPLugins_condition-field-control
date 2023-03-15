<!--
これはREADMEのテンプレートです。
必要に応じて書き換えてください。
-->

# CROSSPLugins {プラグイン名}

## プロジェクト作成

1. package.json書き換え  
  以下の項目をプラグイン用に書き換えます。
   |プロパティ名|値|
   |-----------|--|
   |name|プラグイン名（全て小文字）|
   |config.plugin.name|プラグイン名（形式：CROSSPLugins_{プラグイン名}）|

2. .envファイルの作成
  「.env.sample」ファイルの名前を「.env」に変更します。

3. .envファイルの編集  
   以下の値を開発環境に合わせて書き換えます。
   |項目名|値|
   |------|--|
   |KINTONE_URL|プラグインアップロード先のcybozu.comのURL。|
   |KINTONE_USER|kintoneログインID（kintoneシステム管理権限あり）|
   |KINTONE_PW|kintoneログインIDのパスワード|

4. ライブラリのインストール  
   以下のコマンドを実行します。

   ```bash
   npm install
   ```

## ビルド・アップロード方法

### 初回実行

1. 初めてプラグインをビルドする場合(plugin/.ppk/.private.ppkファイルが存在しない場合)は以下のコマンドを実行します。

   ```bash
   npm run plugin:create
   ```

   実行完了するとファイルが作成されます。
   |パス|説明|
   |----|-----|
   |dist/{プラグイン名}.zip|ビルドされたプラグインzipファイル|
   |plugin/.ppk/.private.ppk|プラグインアップロード用のppkファイル|

2. 以下のコマンドを実行し、kintoneへプラグインをアップロードします。

   ```bash
   npm run plugin:upload
   ```

### 2回目以降

- ビルドとkintoneへプラグインのアップロードをプログラムの変更検知に合わせて行う場合は以下のコマンドを実行します。

  ```bash
  npm start
  ```

- ビルドのみ行いたい場合は以下のコマンドを実行します。  
  
  ```bash
  npm run dev #1度のみビルドする
  ```

  ```bash
  npm run dev:w #プログラムの変更を検知しビルドする
  ```

### 製品版ビルド

製品版でビルドする場合は以下のコマンドを実行します。

```bash
npm run prod
```

## ブランチ運用

|ブランチ名|役割|
|---------|----|
|master|リリース用ブランチ。このブランチでソースの変更は行わない。|
|develop|共通開発用ブランチ。リリース前のテストを行うブランチ。|
|developを切ったブランチ|開発用ブランチ。機能追加/修正などを行う場合に利用する。ブランチ名は任意。|

## コミットメッセージ

コミットメッセージはPrefixを付けてメッセージを記述する。  
・例：Prefix: コミットメッセージ

|Prefix|説明|
|------|-----|
|feat|新機能の追加|
|add|ファイル等の追加|
|delete|ファイル等の削除|
|rename|ファイル名等の変更|
|move|ファイル等の移動|
|fix|バグの修正|
|style|機能に影響が無い変更（スペース、フォーマット、欠落の修正、セミコロンなど）|
|docs|ドキュメント変更|
|perf|パフォーマンスを向上させるコードの変更|
|test|不足しているテストの追加や既存のテストの修正|
|chore|ビルドプロセスやドキュメント生成などの補助ツールやライブラリの変更|

## プラグイン設定オブジェクト

プラグイン設定オブジェクトの構成。

|プロパティ名|設定値|
|------|-----|
|licensekey|ライセンスキー文字列|
|任意の名前|各プラグインで必要な設定を追加する|