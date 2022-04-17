# vue-practice

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## （参考）vueプロジェクトの環境構築

## 手順
### vue-cliをインストール
```
npm install -g @vue/cli
```

### vueプロジェクトの作成
```
vue create vue-practice
```
→manually選択肢、項目毎に選択した
- yarn or npm: yarn
- router: history mode
- CSS pre-processor: dart-sass
- ESLint: Airbnb
- lint feature: Lint on save と Lint and fix on commit どっちも
- UnitTest: Jest
- config: In dedicated config files

サーバー起動
```
yarn serve
```
→Vueのサンプルページが起動する

### vuetifyのインストール
```
vue add vuetify
```
→default(recommend)でインストール

エラー発生
```
/Users/odagaki/dev/private/vue-practice/src/App.vue
  47:24  error  Missing file extension "vue" for "./components/HelloWorld"  import/extensions
```

おそらく、webpackの拡張子解決に.vueが含まれていないことが原因かと思われる

以下のどちらかの方法で解決

#### 1. import文を修正（今回はこちら）
src/App.vue
```vue
<script>
- import HelloWorld from './components/HelloWorld';
+ import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
```

#### 2. webpackの設定を変更（コミット時、eslintに引っかかる）
vue-cli4からwebpack4に対応していて、webpack.config.jsが存在しない。
vue.config.jsに記載する。

vue.config.js
```js
module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
+ configureWebpack: {
+   resolve: {
+     extensions: ['*', '.js', '.vue', '.json']
+   }
+ },
};

```
**2の方法だとeslint(Airbnb)に引っかかるので今回は1を採用**

サーバー起動
```
yarn serve
```
→Vuetifyのサンプルページが起動する

### importを絶対パスに変更
src/App.js
```vue
<script>
- import HelloWorld from './components/HelloWorld.vue';
+ import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'App',
```

### vuetify + vue-routerの設定
- ルーティング  
router/index.js
```js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Top from '@/components/pages/Top.vue';
import Home from '@/components/pages/Home.vue';
import About from '@/components/pages/About.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
```
- App.vueの設定  
src/App.vue
```vue
<template>
  <v-app>  ← ⭐️#idをつけるvuetyfyのcomponent
    <v-content>
      <router-view /> ← ⭐️vue-routerでcomponentが差し込まれる場所
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
```
- トップページのcomponent  
今回routingで'/'のパスをTopコンポーネントにした。  
components/pages/Top.vue
```vue
<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('@/assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <div>
        <span v-for="link in links" :key="link.pass">
          <router-link :to=link.pass>{{link.title}}</router-link>
        </span>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Top',

  data: () => ({
    links: [
      { pass: 'home', title: 'HOME' },
      { pass: 'about', title: 'ABOUT' },
    ],
  }),
};
</script>
```

これで、同様にHome.vue、About.vueも作成し、router-linkで遷移できるようになる。