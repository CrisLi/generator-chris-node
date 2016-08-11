const express = require('express');
const compression = require('compression');
const path = require('path');
const dist = path.resolve(__dirname, 'dist');

module.exports = (app) => {

  app.use(compression());
  app.use('/static', express.static(path.resolve(dist, 'static')));
  app.use('*', function(req, res) {
    res.sendFile(path.resolve(dist, 'index.html'));
  });

};