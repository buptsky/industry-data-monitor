const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    inline: true,
    hot: true,
    proxy: {
      '*.do': {
        bypass: function (req, res, proxyOptions) {
          console.log(req.url);
          if (req.url.indexOf('.do') !== -1) {
            req.method = 'GET';
            return '/mock' + req.url.replace('.do', '.json');
          }
        }
      }
    }
  }
});