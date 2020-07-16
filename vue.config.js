// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.devServer = {
        port: 8088
      };
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', path.resolve(__dirname, 'src'))
      .set('@img', path.resolve(__dirname, 'src/assets/img'));

    config.resolve.extensions.add('*').add('.js').add('.vue').add('.json');

    config.performance.hints(false).maxEntrypointSize(512000).maxAssetSize(512000);

    if (process.env.NODE_ENV === 'development') {
      config.devtool('inline-source-map');
    }
  },
  transpileDependencies: ['vuetify']
};
