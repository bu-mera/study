---
date: "2020-12-24"
title: "第10回 React Native -アニメーション-"
tags: ["React Native"]
active: 1
---

# アニメーション

## Animated

`react-native` で用意されているAPI `Animated` を使用して、アニメーションの実装をすることができます。

例として、下記画面のボタンのscaleを変化させるアニメーションを実装します。

```js
<SafeAreaView style={{ flex: 1 }}>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Pressable onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonLabel}>Press</Text>
      </View>
    </Pressable>
  </View>
</SafeAreaView>
```

### 導入

```js
import React, { useRef } from 'react';
import { Animated } from 'react-native';
```

### 定義

アニメーション用に変化させる`scaleValue`を定義します。
```js
const scaleValue = useRef(new Animated.Value(1)).current
```

`new Animated.Value()`の括弧内で初期値（数値）を定義します。

### アニメーション部分の記述

```js
Animated.timing(scaleValue, {
  toValue: 0.9,
  duration: 100,
  useNativeDriver: true
}).start();

```

[`useNativeDriver`](https://reactnative.dev/blog/2017/02/14/using-native-driver-for-animated)は、アニメーションをよりスムーズに実行するためのフラグになります。

今回はボタンを押したタイミングでアニメーションさせるとし、下記のように記述します。

```js
const onPress = () => {
  Animated.timing(scaleValue, {
    toValue: 0.9,
    duration: 100,
    useNativeDriver: true
  }).start();
}
```

### styleへの適用

最後に、`scaleValue`をstyleに適用します。
`Animated.Value`で定義した値を使用する場合、適用するコンポーネントの頭に`Animated.`を付ける必要があります。
```js
<SafeAreaView style={{ flex: 1 }}>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Pressable onPress={onPress}>
      <Animated.View style={[ styles.buttonContainer, { transform: [{ scale: scaleValue }]} ]}>
        <Text style={styles.buttonLabel}>Press</Text>
      </Animated.View>
    </Pressable>
  </View>
</SafeAreaView>
```

`Animated.`を付けることができるコンポーネントは限られています。
```
Animated.Image
Animated.ScrollView
Animated.Text
Animated.View
Animated.FlatList
Animated.SectionList
```

上記以外にアニメーションを適用したい場合は、`Animated.createAnimatedComponent`を使用して、新たにコンポーネントを定義する必要があります。

```js
// Animated.〜 を使えないコンポーネント
import { Rect } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect)
```

```js
<AnimatedRect />
```

### より複雑なアニメーション作成
先ほどまでは単調なアニメーションの作成でした。
次はより複雑なアニメーションを作成します。

```js
const frameValue = useRef(new Animated.Value(0)).current;
```

`interpolate()`を使って、フレームごとに値を定義します。

```js
const interPolateScale = frameValue.interpolate({
  inputRange: [0, 50, 100, 150],
  outputRange: [1, 0.8, 0.9, 1],
});
```

`interPolateScale`をstyleに適用します。
```js
const onPress = () => {
  Animated.timing(frameValue, {
    toValue: 150,
    duration: 100,
    useNativeDriver: true
  }).start();
}
```

```js
<SafeAreaView style={{ flex: 1 }}>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Pressable onPress={onPress}>
      <Animated.View style={[ styles.buttonContainer, { transform: [{ scale: interPolateScale }]} ]}>
        <Text style={styles.buttonLabel}>Press</Text>
      </Animated.View>
    </Pressable>
  </View>
</SafeAreaView>
```

## Lottie

### 実装

[`lottie-react-native`](https://github.com/lottie-react-native/lottie-react-native) を使用します。

```js
import LottieView from 'lottie-react-native';
```

```js
<LottieView
  source={ require('assets/loading.json') }
  style={{
    width: 100,
    height: 100,
  }}
  autoPlay
  loop
  resizeMode='cover'
  renderMode='HARDWARE'
  enableMergePathsAndroidForKitKatAndAbove={true}
/>
```

### lottieの注意点

ダンダダン案件時、一部Androidにおいて、ファイルサイズの大きいlottieであればあるほどアニメーションが重くなる事象が見受けられました。  
そのときの解決策として、lottieの代わりに動画（mp4）を使用しました。

動画の実装には`react-native-video`を使用しました。

```js
import Video from 'react-native-video'
```

```js
<Video
  muted={ true }
  repeat={ false }
  rate={ 1.0 }
  resizeMode="cover"
  source={ require('assets/splash.mp4') }
/>
```

