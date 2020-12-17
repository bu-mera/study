---
date: "2020-12-17"
title: "第9回 React Native -永続化-"
tags: ["React Native"]
active: 1
---

# 永続化

アプリではデータの永続化が必要不可欠です。

* オフラインでも動くようにしたい
* ログイン情報を保持したい

永続化用のライブラリはいくつもあります。

<!-- ## AsyncStorageとRealm -->





## [Realm](https://github.com/realm/realm-js)

ネイティブチームでも扱っているモバイルアプリケーション向けデータベースです。

### メリット

* 導入・使い方が楽
* 高速なデータベースアクセス
* [日本語ドキュメント](https://realm.io/jp/docs/javascript/latest#%E3%82%A4%E3%83%B3%E3%83%88%E3%83%AD%E3%83%80%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3)もある


### 導入

```
$ yarn add realm
$ npx pod-install ios
```



### 使い方

```js
import Realm from 'realm';

// データモデルの定義
const CarSchema = {
  name: 'Car',
  properties: {
    make:  'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  }
};
const PersonSchema = {
  name: 'Person',
  properties: {
    name:     'string',
    birthday: 'date',
    cars:     {type: 'list', objectType: 'Car'},
    picture:  {type: 'data', optional: true}, // optional property
  }
};

…

// Initialize a Realm with Car and Person models
Realm.open({schema: [CarSchema, PersonSchema]})
  .then(realm => {
    // Create Realm objects and write to local storage
    realm.write(() => {
      const myCar = realm.create('Car', {
        make: 'Honda',
        model: 'Civic',
        miles: 1000,
      });
      myCar.miles += 20; // Update a property value
    });

    // Query Realm for all cars with a high mileage
    const cars = realm.objects('Car').filtered('miles > 1000');

    // Will return a Results object with our 1 car
    // cars.length => 1

    // Add another car
    realm.write(() => {
      const myCar = realm.create('Car', {
        make: 'Ford',
        model: 'Focus',
        miles: 2000,
      });
    });

    // Query results are updated in realtime
    // cars.length => 2
  })
  .catch(error => {
    console.log(error);
  });
```

[サンプル](https://github.com/realm/realm-js/tree/master/examples/ReactExample)

### データモデルの定義
スキーマの情報とはモデルオブジェクトの名前、およびプロパティの名前や型などを示す一連の属性です。

型は基本的な型に加えて、objectTypeやリスト型が指定できます。またoptional（NULL可）やdefault（デフォルト値）についてもここで指定します。

```js
const CarSchema = {
  // スキーマ名と被らないnameを定義
  name: 'Car',
  properties: {
    make:  'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  }
};
```

### 基本的な型

|realm上での型|対応しているjsの型|
|-|-|
|bool|Boolean|
|int<br>float<br>double|Number|
|string|String|
|data|ArrayBuffer|
|date|Date|

### データの定義方法
```js
const CarSchema = {
  name: 'Car',
  properties: {
    // 下記のtypeプロパティの定義はどちらも同じ意味です
    make:   {type: 'string'},
    model: 'string',
  }
}
```

### デフォルト値

```js
const CarSchema = {
  name: 'Car',
  properties: {
    make:  {type: 'string'},
    model: {type: 'string'},
    drive: {type: 'string', default: 'fwd'},
    miles: {type: 'int',    default: 0}
  }
};

realm.write(() => {
  // `miles`プロパティは何も指定していないのでデフォルト値の`0`が設定されます。
  // また`drive`プロパティはここで指定しているので、デフォルト値は使用されず指定した値で上書きされます。
  realm.create('Car', {make: 'Honda', model: 'Accord', drive: 'awd'});
});

```


### プライマリーキー
`string`型および`int`型のプロパティについては`primaryKey`属性を用いてプライマリキーとして指定できます。

```js
const PersonSchema = {
  name: 'Person',
  primaryKey: 'id',
  properties: {
    id:   'int',    // プライマリキー
    name: 'string'
  }
};
```


### 書き込み

Realmへの書き込み（オブジェクトの追加、変更、削除）は、`write`メソッドを用います。

#### オブジェクトの作成
オブジェクトの生成には`create`メソッドを使用します。
```js
try {
  realm.write(() => {
    realm.create('Car', {make: 'Honda', model: 'Accord', drive: 'awd'});
  });
} catch (e) {
  console.log("Error on creation");
}
```

子のプロパティも含めて一度に作成することもできます。

```js
realm.write(() => {
  realm.create('Person', {
    name: 'Joe',
    car: {make: 'Honda', model: 'Accord', drive: 'awd'},
  });
});
```

<!-- #### オブジェクトの変更

```js
realm.write(() => {
  car.miles = 1100;
});

``` -->

`primaryKey`を使用している場合、オブジェクトがすでに存在する場合は更新、存在しない場合は新しく追加というように、追加または更新を一度に行うことができます。

```js
realm.write(() => {
  // Bookオブジェクトを生成して保存します
  realm.create('Book', {primaryId: 1, title: 'Recipes', price: 35});

  // 上で保存したBookオブジェクトのPriceプロパティをプライマリキーを指定して更新します
  // この場合、第3引数をtrueにする
  realm.create('Book', {primaryId: 1, price: 55}, true);
});
```

#### オブジェクトの削除

`delete`メソッドに削除したいオブジェクト等を渡すことで削除することができます。

```js
realm.write(() => {
  // Bookオブジェクトを作成し、保存します
  let book = realm.create('Book', {primaryId: 1, title: 'Recipes', price: 35});

  // Bookオブジェクトを削除します
  realm.delete(book);

  // また、１度に複数のオブジェクトを削除できます
  let allBooks = realm.objects('Book');
  realm.delete(allBooks); // すべてのBookオブジェクトを削除します
});
```

### クエリによるデータの取得
Realmのクエリは、どれか１つのオブジェクト型を指定して保存されているオブジェクトをRealmから取得します。

<!-- 検索条件を指定して結果をフィルタしたり、並べ替えることもできます。すべてのクエリと検索結果のプロパティアクセスは自動的に遅延されます。実際のデータはオブジェクトとプロパティにアクセスしたときにのみ取得されます。このことにより、大量のデータでも効率よく扱うことができます。 -->

`object`メソッドは[`Results`](https://realm.io/docs/javascript/6.0.0/api/Realm.Results.html)オブジェクトを返します。

`Results`は検索結果を表します。


```js
let dogs = realm.objects('Dog'); // Realmに保存されているすべてのDogオブジェクトを取得します
```

#### フィルタリング

`filtered`メソッドに[クエリ文字列](https://realm.io/docs/javascript/6.0.0/api/tutorial-query-language.html)で検索条件を渡すことで、フィルタリングすることができます。


```js
let dogs = realm.objects('Dog'); // Realmに保存されているすべてのDogオブジェクトを取得します
let whiteDogs = dogs.filtered('color = "white" AND name BEGINSWITH "B"');
```

#### ソート

```js
let hondas = realm.objects('Car').filtered('make = "Honda"');

// ホンダ製（make = "Honda"）かつ、走行距離（miles）の昇順
let sortedHondas = hondas.sorted('miles');
```



