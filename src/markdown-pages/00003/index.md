---
date: "2020-10-29"
title: "第2回 React Native -デザイン-"
tags: ["React Native"]
active: 1
---

# React Nativeでのデザインの考え方

React NativeのUI構築において、基本となるのがFlexboxです。
すでに、CSSでも使っていると思いますが、同様の仕組みがReact Nativeにもあります。
公式でも推奨とされているので、Flexboxを使っていきましょう。

## Flexboxの基本

CSSでは、`display: flex;`と定義していたかと思いますが、React Nativeでは`flex: 1`と定義します。

CSSと同様の仕組みが用意されているので`flex-direction`や`justify-content`、`align-items`などのプロパティがあるが、大きな違いとして`キャメルケース`で記載する必要があります。後ほどStyleSheetの記載方法で詳しくやろうと思います。


### flexDirection
ここら辺は問題ないでしょう

### justifyContent
ここら辺は問題ないでしょう

### alignItems
ここら辺は問題ないでしょう

## StyleSheetの書き方
説明説明説明説明説明とか

```jsx
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
```

説明説明説明説明説明とか

## 実際にUIを構築していこう

### 演習1:横並びにするためにStyleSheetを作ってください。
```jsx:title=基本構造は以下とする
<View>
  <View>1</View>
  <View>2</View>
  <View>3</View>
</View>
```

### 演習2:
### 演習3:
### 演習4:
### 演習5:
### 演習6:
### 演習7:
### 演習8:下の画像のようなレイアウトを構築してください。
### 演習9:下の画像のようなレイアウトを構築してください。
### 演習10:下の画像のようなレイアウトを構築してください。

## 以下参考リンク

## 主要のコンポーネント・API

### StyleSheet
[Style定義](https://reactnative.dev/docs/style)

### View
[ドキュメント](https://reactnative.dev/docs/view)  
[Flexboxレイアウト](https://reactnative.dev/docs/flexbox)

### Text
[ドキュメント](https://reactnative.dev/docs/text)


### Image
[ドキュメント](https://reactnative.dev/docs/image)  
[画像データ周り](https://reactnative.dev/docs/images)

### TextInput
[ドキュメント](https://reactnative.dev/docs/textinput)

### ScrollView
[ドキュメント](https://reactnative.dev/docs/scrollview)


## その他

### FlatList
リストデータ用のコンポーネント  
画面で表示される部分のみレンダリングするので、多量のリストデータを表示するときに向いている  
[ドキュメント](https://reactnative.dev/docs/flatlist)  

### KeyboardAvoidingView
テキストフォームにフォーカスしたとき、フォームがキーボードで隠れてしまわないように調整してくれるコンポーネント  
[ドキュメント](https://reactnative.dev/docs/keyboardavoidingview)  

### Linking
[ドキュメント](https://reactnative.dev/docs/linking)  

### StatusBar
画面上部のステータスバーの制御  
[ドキュメント](https://reactnative.dev/docs/statusbar)
