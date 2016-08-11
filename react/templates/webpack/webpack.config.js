const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { extract } = ExtractTextPlugin;
const src = path.resolve(__dirname, '..', 'src');
const html = path.resolve(__dirname, '..', 'html');

module.exports = {
  devtool: 'source-map', // https://github.com/webpack/docs/wiki/build-performance#sourcemaps
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.resolve(src, 'app.js')
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
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
        loader: extract('style-loader', 'css-loader')
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
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(html, 'index.html')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('static/css/[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};