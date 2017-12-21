const theme = require('./theme');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['core-js/fn/map', 'core-js/fn/set', 'raf/polyfill', 'axios', 'moment', 'react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/static/pc/dist/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: "css-loader"
      })
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract([{
        loader: "css-loader"
      }, {
        loader: "less-loader",
        options: {
          modifyVars: theme
        }
      }])
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {}
        }
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    }),
    new ExtractTextPlugin('[name].css')
  ],
  devtool: 'source-map'
};
