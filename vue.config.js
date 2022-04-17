module.exports = {
  devServer: {
    // ======= vagrant内でdevServerを起動するための設定 =======
    // host: '192.168.33.57', // vagrantのip
    // port: 825, // 80など被らなければ何でも可能
    // disableHostCheck: true, // これがないと重たすぎて起動しない
    // watchOptions: {
    //   poll: 1000, // 明示的にポーリングを指定しないとhot reloadが走らない
    // },
    // ======= vagrant内でdevServerを起動するための設定 =======
    proxy: {
      '/api': {
        target: 'http://[::1]:8080'
      },
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
  css: {
    loaderOptions: {
      css: {
        url: false,
      },
      scss: {
        prependData: '@import "@/common/config/scss/var.scss";',
      },
    },
  },
  pages: {
    index: {
      entry: 'src/main.js',
      title: '遊戯王カード オリジナルパック | gacha24',
    },
  },
  chainWebpack: (config) => {
    config.plugins.delete('pwa');
    config.plugins.delete('workbox');
  },
  configureWebpack: {
  },
};
