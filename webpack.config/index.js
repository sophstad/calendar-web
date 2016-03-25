process.env.NODE_ENV === 'production' ?
  module.exports = require('./webpack.config.prod')
: module.exports = require('./webpack.config.dev')
