var stylus = require('stylus')
var autoprefixer = require('autoprefixer')

module.exports = {
  devMode: false, // TODO
  extensions: ['.styl'],
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  prepend: [
    autoprefixer(),
  ],
  preprocessCss: function (css, filename) {
    return stylus(css)
      .set('filename', filename)
      .render();
  },
}
