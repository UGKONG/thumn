const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
  name: 'myRules',
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'index.js'
  },
  module: {
    rules: [
      { test: /\.(png|jpg)$/, use: ['file-loader']},
      { test: /\.vue$/, use: ['vue-loader']},
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
      { test: /\.html$/, use: ['html-loader']},
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}