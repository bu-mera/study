---
date: "2020-10-29"
title: "【解説】第1回 React Native -環境を整えよう-"
tags: ["React Native"]
active: 1
---

# 環境構築

これは問題ないかな

# 環境変数（react-native-config）

## 導入
```
$ yarn add react-native-config
```

iOSは`pod install`する。
```
cd ios/
pod install
```

## 環境毎の設定ファイルの追加
### 本番
```js:title=.env
ENV=prod
```

### 開発
```js:title=.env.dev
ENV=dev
```

## OS毎の設定
### iOS

## Configurationの追加
`PROJECT > [ PROJECT_NAME ] > Configurations`の+ボタンをクリックして「Duplicate "Release" Configurations」を選択し、Nameをつける。(Stagingとかとか)

## 環境毎の設定
### アプリ名
アプリ名をプレフィックスをつけて区別する。

`TARGETS > [ PROJECT_NAME ] > Build Settings`のタブで`All`と`Combined`が選択されている状態にする。+ボタンから「Add User-Defined Setting」を選択し、`PROJECT_NAME_PREFIX`という名前で作成。任意の環境毎で区別できるように値を設定する。

`Packaging`の`Product Name`で値の先頭に`${PRODUCT_NAME_PREFIX}`を入力する。

`TARGETS > [ PROJECT_NAME ] > Info`の`Custome iOS Target Properties`で「Bundle display name」の値を`${PRODUCT_NAME}`と設定する。
_※ 「Bundle display name」がない場合は追加してください_

### バンドルID
バンドルIDをサフィックスをつけて区別する。

アプリ名同様、`BUNDLE_ID_SUFFIX`という名前で作成し、環境毎で区別できるように値を設定する。

`Packaging`の`Product Bundle Identifier`で値の末尾に`${BUNDLE_ID_SUFFIX}`を入力する。

### Android

build.gradleに以下を追記
```js:title=android/app/build.gradle
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
```

## 環境毎に切り替え
### iOS

```
$ ENVFILE=.env.dev npx react-native run-ios
```

### Android

```
$ ENVFILE=.env.dev npx react-native run-android
```

build.gradleに以下を追記
```js:title=android/app/build.gradle
project.ext.envConfigFiles = [
  debug: ".env.dev",
  staging: ".env.stg",
  release: ".env"
]
```
```
$ npx react-native run-android --variant=staging
```

# [iOS]実機ビルド

## Xcodeの起動

`ios/${ PROJECT_NAME }.xcworkspace`でXcodeを起動させる。


## Team設定
`TARGETS > [ PROJECT_NAME ] > Signing&Capabilities > Signing > Team`

自分のアカウント名に変更

## Nodeのバイナリのパスを変更
### パスの確認
```
$ which node
```

`TARGETS > [ PROJECT_NAME ] > Build Phases > Bundel React Native code and image`

```
export NODE_BINARY=node
```

`node`部分を確認したパスに変更する。

## ビルド
Deviceを自分の端末に選択して実行

## プロファイルとデバイス管理
`設定 > 一般 > プロファイルとデバイス管理`

# [Android]実機ビルド
_[※ 公式ドキュメント通り](https://reactnative.dev/docs/running-on-device)_

## USB経由のデバッグを有効にする

端末の開発者向けオプションから「USBデバッグ」を有効にしてください。

## USB経由でデバイスを接続

デバイスの疎通確認
```
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

## ビルド
```
$ npx react-native run-android
```

<!-- 一旦なしでいいかな -->
<!--
## ビルドバリアントの設定

### ビルドバリアント（Build Variant）とは

2つの要素の組み合わせから構成される。

- ビルドタイプ（BuildType）
- プロダクトフレーバー（Product Flavor）

||debug|release|
|---|---|---|
|dev||devDebug|devRelease|
|prod|prodDebug|prodRelease|
-->
