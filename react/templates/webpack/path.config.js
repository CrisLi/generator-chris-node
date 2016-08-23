const path = require('path');
const src = path.resolve(__dirname, '..', 'client');
const html = path.resolve(__dirname, '..', 'html');
const dist = path.resolve(__dirname, '..', 'dist');
const entry = path.resolve(src, 'app.js');

module.exports = {
  src,
  html,
  dist,
  entry
};
