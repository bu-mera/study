---
date: "2020-11-12"
title: "第4回 React Native -画面遷移-"
tags: ["React Native"]
active: 1
---

# 画面遷移（基礎編）

画面遷移には`react-navigation`を使用します。

## ナビゲーションの種類

### スタックナビゲーション
元の画面の上に新しい画面が積み重なり、「戻る」という動作で新しい画面が取り除かれて元の画面に戻る形式

### タブナビゲーション
タブを使って画面を切り替える形式

## 導入
```
yarn add @react-navigation/native @react-navigation/stack
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

```
cd ios
pod install
```
or
```
npx pod-install ios
```

<!-- TODO:CocoaPodsやGradleの軽い説明を挟む -->

## 画面遷移の準備

App.js
```js
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      {/* Rest of your app code */}
    </NavigationContainer>
  );
}
```

## スタックナビゲーションの実装

例として、`HomeScreen`と`DetailsScreen`を作成し、`HomeScreen`から`DetailsScreen`へ遷移できるようにします。

App.js
```js
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate("Details") }
      />
    </View>
  )
}

const DetailsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details</Text>
    </View>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### iOS  
<img src="./001.png" width="250" alt="HomeScreen">
<img src="./002.png" width="250" alt="DetailsScreen">


### Android  
<img src="./003.png" width="250" alt="HomeScreen">
<img src="./004.png" width="250" alt="DetailsScreen">