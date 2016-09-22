const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { extract } = ExtractTextPlugin;
const { entry, src, dist, html } = require('./path.config');

module.exports = {
  devtool: 'source-map', // https://github.com/webpack/docs/wiki/build-performance#sourcemaps
  entry: [
    'webpack-hot-middleware/client?reload=true',
    entry
  ],
  output: {
    path: dist,
    filename: 'static/js/bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: src
      },
      {
        test: /\.jsx$/,
        loaders: ['babel'],
        include: src
      },
      {
        test: /\.css$/,
        loader: extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(html, 'index.html')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('static/css/[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};