const path = require('path');
module.exports = {
  entry: './app/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  }
}
