/* global __DEV__ */

/* Global styles */
import 'assets/css/normalize.css'
import 'assets/css/skeleton.css'
import 'assets/css/custom.css'

module.exports = __DEV__ ?
  require('./Root.dev')
: require('./Root.prod')
