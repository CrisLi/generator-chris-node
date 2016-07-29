const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');
const port = process.env['PORT'] || 3000;
const isProduction = process.env['NODE_ENV'] === 'production';

const app = express();
const proxy = httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: parseInt(port) + 1
  }
});

proxy.on('error', function(err, req, res) {
  res.status(500).json({ message: err.message });
});

app.all("/api/**", function(req, res) {
  return proxy.web(req, res);
});

if (isProduction) {
  const compression = require('compression');
  app.use(compression());
  app.use('/public', express.static(path.join(__dirname, 'dist')));
} else {
  const webpack = require('webpack');
  const config = require('./webpack/webpack.config');
  const compiler = webpack(config);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true, 
    publicPath: config.output.publicPath,
    stats: { colors: true }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use('/public', express.static(path.join(__dirname, 'public')));
}

app.use('/**', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, function(error) {
  if (error) {
    throw error;
  } else {
    console.info("Listening on port %s.", port);
  }
});
