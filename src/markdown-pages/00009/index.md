---
date: "2020-12-10"
title: "第8回 React Native -Firebase・プッシュ通知-"
tags: ["React Native"]
active: 1
---

# プッシュ通知

FirebaseのFirebase Cloud Messaging（FCM）を使用します。


## 導入

実装には [REACT NATIVE FIREBASE（v6）](https://rnfirebase.io/) の [Cloud Messaging](https://rnfirebase.io/messaging/usage) を使用します。
<!-- ただ、ローカル通知に関してはv6ではサポート外なので、ローカル通知の実装には別途対応が必要です。 -->


```
$ yarn add @react-native-firebase/app @react-native-firebase/messaging
$ npx pod-install ios
```


## Firebaseプロジェクトの準備

## アプリの登録

AndroidとiOSそれぞれで登録します。

登録後、Androidでは`google-services.json`、
iOSでは`GoogleService-Info.plist`をダウンロードします。


## Android
[参考サイト](https://gibachansblog.hatenablog.jp/entry/2020/08/14/051052)

### firebaseの導入

`/android/app`に`google-services.json`を配置します。

`/android/build.gradle`
```
buildscript {
    ...
    dependencies {
        ...
        classpath 'com.google.gms:google-services:4.3.3' // これを追加
    }
}
```

`/android/app/build.gradle`
```
apply plugin: 'com.google.gms.google-services' // これを追加
```


### [通知チャネル](https://qiita.com/myzkyy/items/4c286c3d096c5aaa2b3c)
Android 8.0（API レベル 26）以降、通知はすべてチャネルに割り当てる必要があります。  
[公式ドキュメント](https://developer.android.com/training/notify-user/channels?hl=ja)

`android/app/src/〜/MainActivity.java`
```java
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;

public class MainActivity extends ReactActivity {

  private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      String id = "notification";
      CharSequence name = "お知らせ";
      String description = "新しいメッセージの受信などをお知らせするよ";
      int importance = NotificationManager.IMPORTANCE_HIGH;
      NotificationChannel channel = new NotificationChannel(id, name, importance);
      channel.setDescription(description);
      NotificationManager notificationManager = getSystemService(NotificationManager.class);
      notificationManager.createNotificationChannel(channel);
    }
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    ...
    createNotificationChannel();
  }

```

`firebase.json`
```
{
  "react-native": {
    ...
    "messaging_android_notification_channel_id": "notification"
  }
}
```


## iOS

[参考サイト](https://gibachansblog.hatenablog.jp/entry/2020/08/15/095114)

### APNs証明書の登録


### firebaseの導入

`AppDelegate.m`
```
#import <Firebase.h>
…

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  …
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
```


### プッシュ通知の受信を許可

```js
const App = () => {
  ...
  // 通知の許可をリクエストする
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('通知が許可されました');
    }
  }

  useEffect(() => {
    // 最初に通知の許可をリクエストする
    requestUserPermission();

    ...
  }, []);

  ...
};
```



## JS

### トークンの取得

```js
const token = await messaging().getToken()
```

### 通知時のハンドリング

`index.js`
```js
...
import messaging from '@react-native-firebase/messaging'; // これを追加する

// バックグラウンドで通知を受信
messaging().setBackgroundMessageHandler(async remoteMessage => {
  `[${remoteMessage.notification?.title}]を受信しました`;
});

AppRegistry.registerComponent(appName, () => App);
```

`App.js`
```js
...
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    // フォアグラウンドで通知を受信
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      `[${remoteMessage.notification?.title}]を受信しました`;
    });

    return unsubscribe;
  }, []);

  …
}
```


## アプリの状態

|||
|-|-|
|Foreground|アプリが前面にあり動作している状態|
|Background|ホーム画面や他のアプリが前面にあり、アプリが背面で動作している状態|
|Quit|タスクキルなどでアプリが死んでいる状態|

## [フォアグラウンドでのプッシュ通知表示](https://qiita.com/iwashi1t/items/517cda73dba715025b6c)


`react-native-push-notification` を使用します。



<!-- 
```js
PushNotification.configure({
  onNotification: notification => {
    // プッシュ通知をタップしたときに呼ばれる
    // URLを開くなどの処理
    notification.finish(PushNotificationIOS.FetchResult.NoData);
    PushNotificationIOS.setApplicationIconBadgeNumber(0);
  },
});
```
 -->

```js
const showNotification = remoteMessage => {
  PushNotification.localNotification({
      title: message.notification.title,
      message: message.notification.body,
  });
}
```


## [Android]通知アイコンの設定

```js
const showNotification = remoteMessage => {
  PushNotification.localNotification({
      largeIcon: 'largeIconName',
      smallIcon: 'smallIconName',
      title: message.notification.title,
      message: message.notification.body,
  });
}
```

