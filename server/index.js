// Modify included modules for require()
require('app-module-path').addPath(require('path').resolve(__dirname, '../src'))

// transform all imports with Babel
require('babel-register')

// transform stylus imports with css-modules
var hook = require('css-modules-require-hook/preset')

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

// hijack console.error to throw
console.error = error => {
  throw new Error(error)
}

require('./server')
