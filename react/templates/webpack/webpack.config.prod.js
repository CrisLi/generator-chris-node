const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { entry, html } = require('./path.config');
const config = require('./webpack.config');

module.exports = {
  devtool: 'source-map',
  entry,
  output: config['output'],
  module: config['module'],
  resolve: config['resolve'],
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(html, 'index.html')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('static/css/[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};