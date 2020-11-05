---
date: "2020-10-29"
title: "第2回 React Native -FlexboxとStyleSheet-"
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

## Styleの適用方法
`StyleSheet.create`を使って定義します。

```js
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
```

定義したstyleを下記のようにしてコンポーネントに割り当てます。
```js
<View style={styles.container}></View>
```

また、配列を用いることで、複数のstyleを合成して割り当てることもできます。  
同一の項目がある場合は、配列の後ろの要素の方が優先されます。

```js
const styles = StyleSheet.create({
  style1: {
    marginTop: 20,
    backgroundColor: 'red'
  },
  style2: {
    marginBottom: 30,
    backgroundColor: 'blue'
  }
})
```

```js
<View style={[styles.style1, styles.style2]}></View>
```
上記の例の場合、下記のstyleが割り当てられます。
```js
{
  marginTop: 20,
  marginBottom: 30,
  backgroundColor: 'blue'
}
```

## 実際にUIを構築していこう

以下演習では各演習用のJSファイル（例えば`lesson1.js`）を作成してください。

各演習用のサンプルコード
```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Lesson1 = () => {
  return (
    <View style={styles.body}>
      <View style={styles.item}>
        <Text>1</Text>
      </View>
      <View style={styles.item}>
        <Text>2</Text>
      </View>
      <View style={styles.item}>
        <Text>3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  item: {
    height: 30,
    width: 30,
    backgroundColor: '#bec6cc',
  }
});

export default Lesson1;
```

作成したJSファイルを`App.js`にインポートして、反映してください。

```js
import Lesson1 from './lesson1';

const App = () => {
  return (
    <Lesson1 />
  );
};
```

### 演習1:横並びにするためにStyleSheetを作ってください。
```js
<View>
  <View>
    <Text>1</Text>
  </View>
  <View>
    <Text>2</Text>
  </View>
  <View>
    <Text>3</Text>
  </View>
</View>
```

### 演習2:逆順に表示するためにStyleSheetを作ってください。（JSXは演習1と同様）

### 演習3:等間隔で余白を開けて、縦並びするためにStyleSheetを作ってください。（JSXは演習1と同様）

### 演習4:画面中央に要素を配置するためにStyleSheetを作ってください。
```js
<View>
  <View>
    <Text>center</Text>
  </View>
</View>
```
### 演習5:下の画像のようなレイアウトを構築してください。上から高さが1:2:3となっています。（JSXは演習1と同様）


<img src="./image00003-01.png" width="150" alt="演習5のレイアウト">

### 演習6:下の画像のようなレイアウトを構築してください。機能の実装はしなくて良いです。

<img src="./image00003-02.jpg" width="150" alt="演習6のレイアウト">

## 追加

### Text
```js
import { Text } from 'react-native'
```
テキストの表示に使用します。

```js
<Text>
  text
</Text>
```

ネストさせて、一部のテキストのみへのstyleの適用や上書きすることも可能です。

```js
<Text style={{ fontWeight: 'bold', color: 'blue' }}>
  text
  <Text style={{ color: 'red' }}>
    nestedText
  </Text>
</Text>
```


### ScrollView
```js
import { ScrollView } from 'react-native'
```

コンポーネントをScrollViewでラップすることで、スクロールできるようになります。

```js
<ScrollView>
  <Text>
    長文
  </Text>
</ScrollView>
```



## 追加演習

以下演習ではダンダダン案件で使用されたUIの実装をしていただきます。  
サムネイル画像・アイコンは実装せず、`View`で背景色もしくはボーダーを設定してください。 

### 追加演習1:下の画像のようなレイアウトを作成してください。

<img src="./image00003-03.png" width="250" alt="追加演習1のレイアウト">

### 追加演習2:下の画像のようなレイアウトを作成してください。

<img src="./image00003-04.png" width="250" alt="追加演習2のレイアウト">

### 追加演習3:下の画像のようなレイアウトを作成してください。

<img src="./image00003-05.png" width="250" alt="追加演習3のレイアウト">

### 追加演習4:下の画像のようなレイアウトを作成してください。加えて、スクロールできるようにしてください。

<img src="./image00003-06.png" width="250" alt="追加演習4のレイアウト">

## 以下関連リンク

<!-- ## 主要のコンポーネント・API -->

### StyleSheet
[ドキュメント](https://reactnative.dev/docs/stylesheet)  
[Style定義](https://reactnative.dev/docs/style)

### View
[ドキュメント](https://reactnative.dev/docs/view)  
[Flexboxレイアウト](https://reactnative.dev/docs/flexbox)

### Text
[ドキュメント](https://reactnative.dev/docs/text)

### ScrollView
[ドキュメント](https://reactnative.dev/docs/scrollview)

<!--
### Image
[ドキュメント](https://reactnative.dev/docs/image)  
[画像データ周り](https://reactnative.dev/docs/images)

### TextInput
[ドキュメント](https://reactnative.dev/docs/textinput) -->

<!--
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
[ドキュメント](https://reactnative.dev/docs/statusbar) -->
