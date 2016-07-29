const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const src = path.resolve(__dirname, '..', 'src');
const config = require('./webpack.config');

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(src, 'app.js')
  ],
  output: config['output'],
  module: config['module'],
  resolve: config['resolve'],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("styles.css"),
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