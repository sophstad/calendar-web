// Modify included modules for require()
require('app-module-path').addPath(require('path').resolve(__dirname, 'src'))

// transform all imports with Babel
require('babel-register')

// transform stylus imports with css-modules
const stylus = require('stylus')
const autoprefixer = require('autoprefixer')
require('css-modules-require-hook')({
  devMode: false, // TODO
  extensions: ['.styl'],
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  prepend: [
    autoprefixer()
  ],
  preprocessCss: function (css, filename) {
    return stylus(css)
      .set('filename', filename)
      .render();
  }
})

// include the environment polyfill
require('babel-polyfill')

// return empty objects for CSS imports
require.extensions['.css'] = () => null

// return empty strings for image imports
const emptyString = module => {
  module.exports = ''
}
require.extensions['.svg'] = emptyString
require.extensions['.png'] = emptyString
require.extensions['.gif'] = emptyString
require.extensions['.jpg'] = emptyString
require.extensions['.jpeg'] = emptyString
