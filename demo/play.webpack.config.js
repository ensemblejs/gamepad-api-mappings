var path = require('path');

module.exports = {
  entry: './play.js',
  output: {
    filename: 'play.bundled.js',
    path: path.resolve(__dirname, './')
  }
};
