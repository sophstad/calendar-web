/* global __DEV__ */

/* Global styles */
import 'normalize.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'assets/css/skeleton.css'
import 'assets/css/custom.css'

module.exports = __DEV__ ?
  require('./Root.dev')
: require('./Root.prod')
