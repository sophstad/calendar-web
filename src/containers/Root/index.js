/* Global styles */
import 'assets/css/normalize.css'
import 'assets/css/skeleton.css'
import 'assets/css/custom.css'

module.exports = process.env.NODE_ENV === 'production' ?
  require('./Root.prod')
: require('./Root.dev')
