/* eslint-disable @typescript-eslint/no-var-requires */
const Dotenv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.devServer = {
        port: 8088
      };
      config.plugins.push(new Dotenv({}));
    } else {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env': {
            apiKey: JSON.stringify(process.env.apiKey),
            authDomain: JSON.stringify(process.env.authDomain),
            databaseURL: JSON.stringify(process.env.databaseURL),
            projectId: JSON.stringify(process.env.projectId),
            storageBucket: JSON.stringify(process.env.storageBucket),
            messagingSenderId: JSON.stringify(process.env.messagingSenderId),
            appId: JSON.stringify(process.env.appId)
          }
        })
      );
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
