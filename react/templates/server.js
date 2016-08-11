const express = require('express');
const httpProxy = require('http-proxy');
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
  require('./server.pro')(app);
} else {
  require('./server.dev')(app);
}

app.listen(port, function(error) {
  if (error) {
    throw error;
  } else {
    console.info("Listening on port %s.", port);
  }
});
