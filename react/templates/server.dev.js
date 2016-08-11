const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack/webpack.config');
const compiler = webpack(config);

module.exports = (app) => {

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: { colors: true }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use('/public', express.static(path.join(__dirname, '..', 'public')));

  app.use('*', (req, res, next) => {

    const filename = path.join(compiler.outputPath, 'index.html');

    compiler.outputFileSystem.readFile(filename, (err, data) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(data);
      res.end();
    });
  });

};