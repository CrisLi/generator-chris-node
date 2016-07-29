const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { extract } = ExtractTextPlugin;
const src = path.resolve(__dirname, '..', 'src');

module.exports = {
  devtool: 'source-map', // https://github.com/webpack/docs/wiki/build-performance#sourcemaps
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.resolve(src, 'app.js')
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'bundle.js',
    publicPath: '/public/'
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
        loader: extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        loader: extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.gif$/,
        loader: 'url?mimetype=image/png'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("styles.css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};